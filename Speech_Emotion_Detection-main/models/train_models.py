import os
import pandas as pd
import numpy as np
import librosa
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.neural_network import MLPClassifier
import joblib

# --- Feature Extraction ---
def extract_features(file_path):
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

# --- Main Training Script ---
print("Starting simple model training...")

# Load the dataset manifest
data_df = pd.read_csv('data/sample_data.csv')

# Extract features
print("Extracting features for all audio files...")
X, Y = [], []
for path, emotion in zip(data_df.filepath, data_df.emotion):
    features = extract_features(path)
    if features is not None:
        X.append(features)
        Y.append(emotion)

print(f"Extracted features for {len(Y)} audio samples.")

# Prepare data for modeling
X = np.array(X)
Y = np.array(Y)

# Encode the labels
encoder = LabelEncoder()
Y = encoder.fit_transform(Y)

# Split the data
x_train, x_test, y_train, y_test = train_test_split(X, Y, random_state=0, shuffle=True)
print(f"Training set size: {x_train.shape[0]}")
print(f"Test set size: {x_test.shape[0]}")

# Scale the features
scaler = StandardScaler()
x_train = scaler.fit_transform(x_train)
x_test = scaler.transform(x_test)

# --- Build and Train the MLP Model ---
print("Building and training the MLP model...")
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

model.fit(x_train, y_train)

# --- Evaluate the Model ---
accuracy = model.score(x_test, y_test)
print(f"Model Accuracy: {accuracy*100:.2f}%")

# --- Save the Model and Preprocessors ---
print("Saving the simple model and preprocessors...")
joblib.dump(model, 'models/saved_model.pkl')
joblib.dump(scaler, 'models/scaler.pkl')
joblib.dump(encoder, 'models/label_encoder.pkl')

print("Simple model training complete. The new MLP model is now active.")