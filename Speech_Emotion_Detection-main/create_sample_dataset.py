#!/usr/bin/env python3
"""
Create a sample dataset for training the emotion recognition model.
This script creates synthetic training data and allows you to add your own audio files.
"""

import os
import pandas as pd
import numpy as np
import librosa
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.neural_network import MLPClassifier
import joblib

def extract_features(file_path):
    """Extract audio features from a file."""
    try:
        data, sample_rate = librosa.load(file_path, duration=2.5, offset=0.6)
        
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

def create_synthetic_data():
    """Create synthetic training data for basic model training."""
    print("Creating synthetic training data...")
    
    emotions = ['happy', 'sad', 'angry', 'fearful', 'neutral', 'calm']
    synthetic_data = []
    
    # Create synthetic feature vectors for each emotion
    np.random.seed(42)  # For reproducible results
    
    for emotion in emotions:
        # Create 50 samples per emotion (300 total samples)
        for i in range(50):
            # Generate realistic-looking audio features
            # These are based on typical ranges for real audio features
            
            # ZCR (1 feature)
            zcr = np.random.uniform(0.01, 0.3, 1)
            
            # Chroma (12 features)
            chroma = np.random.uniform(0.0, 1.0, 12)
            
            # MFCC (20 features)  
            mfcc = np.random.uniform(-50, 50, 20)
            
            # RMS (1 feature)
            rms = np.random.uniform(0.001, 0.1, 1)
            
            # Mel spectrogram (128 features)
            mel = np.random.uniform(0.0, 1.0, 128)
            
            # Combine all features
            features = np.concatenate([zcr, chroma, mfcc, rms, mel])
            
            # Add some emotion-specific bias to make it more realistic
            if emotion == 'happy':
                features[1:13] += 0.2  # Boost chroma features
                features[13:33] += 10  # Boost some MFCC
            elif emotion == 'sad':
                features[1:13] -= 0.1  # Lower chroma
                features[13:33] -= 5   # Lower some MFCC
            elif emotion == 'angry':
                features[0] += 0.1     # Higher ZCR
                features[33] += 0.02   # Higher RMS
            elif emotion == 'fearful':
                features[0] += 0.05    # Slightly higher ZCR
                features[34:] += 0.1   # Boost mel features
            
            synthetic_data.append({
                'features': features,
                'emotion': emotion
            })
    
    return synthetic_data

def scan_user_audio_files():
    """Scan for user-provided audio files in data/user_audio/."""
    user_audio_dir = 'data/user_audio'
    user_data = []
    
    if not os.path.exists(user_audio_dir):
        os.makedirs(user_audio_dir)
        print(f"Created directory: {user_audio_dir}")
        print("You can add your own audio files here, organized like:")
        print("  data/user_audio/happy/audio1.wav")
        print("  data/user_audio/sad/audio2.mp3")
        print("  data/user_audio/angry/audio3.wav")
        return user_data
    
    emotions = ['happy', 'sad', 'angry', 'fearful', 'neutral', 'calm', 'disgust', 'surprised']
    
    for emotion in emotions:
        emotion_dir = os.path.join(user_audio_dir, emotion)
        if os.path.exists(emotion_dir):
            for filename in os.listdir(emotion_dir):
                if filename.lower().endswith(('.wav', '.mp3', '.m4a', '.flac')):
                    file_path = os.path.join(emotion_dir, filename)
                    features = extract_features(file_path)
                    if features is not None:
                        user_data.append({
                            'features': features,
                            'emotion': emotion
                        })
                        print(f"Added real audio: {filename} -> {emotion}")
    
    return user_data

def train_model():
    """Train the emotion recognition model."""
    print("Starting model training...")
    
    # Get synthetic data
    synthetic_data = create_synthetic_data()
    print(f"Created {len(synthetic_data)} synthetic samples")
    
    # Get user audio data
    user_data = scan_user_audio_files()
    if user_data:
        print(f"Found {len(user_data)} real audio samples")
    
    # Combine all data
    all_data = synthetic_data + user_data
    
    if not all_data:
        print("No training data available!")
        return False
    
    # Prepare data for training
    X = np.array([item['features'] for item in all_data])
    Y = np.array([item['emotion'] for item in all_data])
    
    print(f"Total training samples: {len(Y)}")
    print(f"Emotions found: {np.unique(Y)}")
    
    # Encode labels
    encoder = LabelEncoder()
    Y_encoded = encoder.fit_transform(Y)
    
    # Split data
    x_train, x_test, y_train, y_test = train_test_split(
        X, Y_encoded, test_size=0.2, random_state=42, shuffle=True, stratify=Y_encoded
    )
    
    print(f"Training set: {len(x_train)} samples")
    print(f"Test set: {len(x_test)} samples")
    
    # Scale features
    scaler = StandardScaler()
    x_train_scaled = scaler.fit_transform(x_train)
    x_test_scaled = scaler.transform(x_test)
    
    # Train model
    print("Training MLP model...")
    model = MLPClassifier(
        hidden_layer_sizes=(256, 128, 64),
        activation='relu',
        solver='adam',
        alpha=0.0001,
        batch_size=32,
        learning_rate='adaptive',
        max_iter=500,
        random_state=42,
        verbose=True
    )
    
    model.fit(x_train_scaled, y_train)
    
    # Evaluate
    train_accuracy = model.score(x_train_scaled, y_train)
    test_accuracy = model.score(x_test_scaled, y_test)
    
    print(f"Training Accuracy: {train_accuracy*100:.2f}%")
    print(f"Test Accuracy: {test_accuracy*100:.2f}%")
    
    # Save models
    os.makedirs('models', exist_ok=True)
    joblib.dump(model, 'models/saved_model.pkl')
    joblib.dump(scaler, 'models/scaler.pkl')
    joblib.dump(encoder, 'models/label_encoder.pkl')
    
    print("✅ Model training completed successfully!")
    print("✅ Models saved to models/ directory")
    
    return True

if __name__ == '__main__':
    success = train_model()
    if success:
        print("\n🎉 Your ML model is ready!")
        print("🚀 Restart the backend server to use the trained model")
        print("📁 To add your own audio files:")
        print("   1. Create folders: data/user_audio/happy/, data/user_audio/sad/, etc.")
        print("   2. Add audio files to appropriate emotion folders")
        print("   3. Run this script again to retrain with your data")
    else:
        print("\n❌ Training failed. Check the errors above.")
