from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import numpy as np
import librosa
import joblib
import os
import subprocess
import tempfile
import random

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Create uploads directory if it doesn't exist
if not os.path.exists('uploads'):
    os.makedirs('uploads')

# Load the trained model, scaler, and encoder
try:
    model = joblib.load('models/saved_model.pkl')
    scaler = joblib.load('models/scaler.pkl')
    encoder = joblib.load('models/label_encoder.pkl')
    MODEL_AVAILABLE = True
    print("Models loaded successfully!")
except FileNotFoundError:
    print("Warning: Trained models not found. Running in demo mode.")
    print("To train models, run: python models/train_models.py")
    model = None
    scaler = None
    encoder = None
    MODEL_AVAILABLE = False

# Emotion to emoji and color mapping
EMOTION_CONFIG = {
    'happy': {'emoji': '😊', 'color': 'emotions-happy', 'aura': 'aura-happy'},
    'sad': {'emoji': '😢', 'color': 'emotions-sad', 'aura': 'aura-sad'},
    'angry': {'emoji': '😡', 'color': 'emotions-angry', 'aura': 'aura-angry'},
    'fearful': {'emoji': '😨', 'color': 'emotions-fearful', 'aura': 'aura-fearful'},
    'neutral': {'emoji': '😐', 'color': 'emotions-neutral', 'aura': 'aura-neutral'},
    'calm': {'emoji': '😌', 'color': 'emotions-calm', 'aura': 'aura-calm'},
    'disgust': {'emoji': '🤢', 'color': 'emotions-disgust', 'aura': 'aura-disgust'},
    'surprised': {'emoji': '😮', 'color': 'emotions-surprised', 'aura': 'aura-surprised'}
}

# Function to convert WebM to WAV using ffmpeg
def convert_webm_to_wav(webm_path, wav_path):
    try:
        # Use ffmpeg to convert WebM to WAV
        ffmpeg_path = r"C:\Users\panig\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-8.0-full_build\bin\ffmpeg.exe"
        cmd = [
            ffmpeg_path, '-i', webm_path, 
            '-acodec', 'pcm_s16le', 
            '-ar', '22050', 
            '-ac', '1', 
            '-y', wav_path
        ]
        subprocess.run(cmd, check=True, capture_output=True)
        return True
    except subprocess.CalledProcessError as e:
        print(f"FFmpeg conversion failed: {e}")
        return False
    except FileNotFoundError:
        print("FFmpeg not found. Please install ffmpeg.")
        return False

# Function to extract features from an audio file
def extract_features(file_path):
    try:
        data, sample_rate = librosa.load(file_path, duration=2.5, offset=0.6, sr=None)
        
        result = np.array([])
        # ZCR
        zcr = np.mean(librosa.feature.zero_crossing_rate(y=data).T, axis=0)
        result = np.hstack((result, zcr))
        # Chroma_stft
        stft = np.abs(librosa.stft(data))
        chroma_stft = np.mean(librosa.feature.chroma_stft(S=stft, sr=sample_rate).T, axis=0)
        result = np.hstack((result, chroma_stft))
        # MFCC
        mfcc = np.mean(librosa.feature.mfcc(y=data, sr=sample_rate).T, axis=0)
        result = np.hstack((result, mfcc))
        # RMS Value
        rms = np.mean(librosa.feature.rms(y=data).T, axis=0)
        result = np.hstack((result, rms))
        # MelSpectogram
        mel = np.mean(librosa.feature.melspectrogram(y=data, sr=sample_rate).T, axis=0)
        result = np.hstack((result, mel))
        
        return result
    except Exception as e:
        print(f"Error processing {file_path}: {e}")
        return None

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/health')
def health():
    return jsonify({
        'status': 'healthy',
        'model_available': MODEL_AVAILABLE,
        'message': 'AuraSense Backend is running' + (' (Demo Mode)' if not MODEL_AVAILABLE else ' (Full Mode)')
    })

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})
    
    file = request.files['file']
    
    if file.filename == '':
        return jsonify({'error': 'No selected file'})

    temp_upload_path = None
    try:
        temp_upload_path = os.path.join('uploads', "temp_" + file.filename)
        file.save(temp_upload_path)

        # Check if file needs conversion (WebM to WAV)
        process_path = temp_upload_path
        if file.filename.lower().endswith('.webm'):
            wav_path = temp_upload_path.replace('.webm', '.wav')
            if convert_webm_to_wav(temp_upload_path, wav_path):
                process_path = wav_path
            else:
                return jsonify({'error': 'Failed to convert WebM file. Please try uploading a WAV or MP3 file.'})

        # Extract features
        features = extract_features(process_path)
        
        if features is not None:
            if MODEL_AVAILABLE:
                # Scale features and reshape for the model
                features = scaler.transform(features.reshape(1, -1))
                
                # Predict using the MLP model and get probabilities
                prediction = model.predict(features)
                prediction_proba = model.predict_proba(features)
                
                # Get the emotion label and confidence
                emotion = encoder.inverse_transform(prediction)[0]
                confidence = float(np.max(prediction_proba) * 100)  # Convert to percentage
            else:
                # Demo mode - return random emotion with realistic confidence
                import random
                emotions_list = list(EMOTION_CONFIG.keys())
                emotion = random.choice(emotions_list)
                confidence = round(random.uniform(70, 95), 1)
                print(f"Demo mode: Returning {emotion} with {confidence}% confidence")
            
            # Get emotion configuration
            emotion_config = EMOTION_CONFIG.get(emotion.lower(), {
                'emoji': '🤷',
                'color': 'emotions-neutral',
                'aura': 'aura-neutral'
            })
            
            return jsonify({
                'emotion': emotion,
                'confidence': confidence,
                'emoji': emotion_config['emoji'],
                'color': emotion_config['color'],
                'aura': emotion_config['aura'],
                'demo_mode': not MODEL_AVAILABLE
            })
        else:
            return jsonify({'error': 'Feature extraction failed.'})

    except Exception as e:
        print(f"Error during prediction: {e}")
        return jsonify({'error': 'Failed to process audio file.'})
    finally:
        if temp_upload_path and os.path.exists(temp_upload_path):
            os.remove(temp_upload_path)

if __name__ == '__main__':
    app.run(debug=True)