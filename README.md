# 🧠 AuraSense - Speech Emotion Detection

[![CI/CD Pipeline](https://github.com/Ganesh5050/Aura-Sense/actions/workflows/ci.yml/badge.svg)](https://github.com/Ganesh5050/Aura-Sense/actions/workflows/ci.yml)
[![Deploy Status](https://github.com/Ganesh5050/Aura-Sense/actions/workflows/deploy.yml/badge.svg)](https://github.com/Ganesh5050/Aura-Sense/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A modern web application that detects emotions from speech using machine learning. Built with React frontend and Flask backend, featuring real-time audio recording and emotion analysis with confidence scores.

## ✨ Features

- 🎤 **Live Audio Recording** - Record up to 30 seconds of audio
- 📁 **File Upload** - Upload WAV, MP3, WebM audio files
- 🧠 **ML-Powered Analysis** - Multi-layer perceptron classifier
- 😊 **6 Emotion Categories** - Happy, Sad, Angry, Fearful, Neutral, Calm
- 📊 **Confidence Scores** - Real-time confidence percentages
- 🎨 **Beautiful UI** - Modern React interface with animations
- 🔄 **Real-time Processing** - Instant emotion detection
- 📱 **Responsive Design** - Works on desktop and mobile

## 🚀 Quick Start

### Option 1: Use Startup Scripts
```bash
# Windows
.\start.bat

# Linux/Mac
chmod +x start.sh
./start.sh
```

### Option 2: Manual Setup

**1. Clone the repository**
```bash
git clone https://github.com/Ganesh5050/Aura-Sense.git
cd Aura-Sense
```

**2. Install dependencies**
```bash
# Frontend dependencies
npm install

# Backend dependencies
cd Speech_Emotion_Detection-main
pip install -r requirements.txt
```

**3. Start the application**
```bash
# Terminal 1 - Backend
cd Speech_Emotion_Detection-main
python app/app.py

# Terminal 2 - Frontend
npm run dev
```

**4. Access the application**
- Frontend: http://localhost:8080
- Backend API: http://localhost:5000

## 🏗️ Architecture

### Frontend (React + TypeScript)
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS + Shadcn UI
- **Animations**: Framer Motion
- **Audio**: MediaRecorder API
- **Build Tool**: Vite

### Backend (Flask + Python)
- **Framework**: Flask with CORS
- **ML Library**: Scikit-learn
- **Audio Processing**: Librosa
- **Model**: Multi-Layer Perceptron (MLP)
- **Features**: 162 audio features (MFCC, Chroma, ZCR, RMS, Mel)

### Machine Learning Pipeline
1. **Feature Extraction**: 162 features from audio
2. **Preprocessing**: StandardScaler normalization
3. **Model**: MLPClassifier (256-128-64 neurons)
4. **Training**: Synthetic + real audio data
5. **Prediction**: Real-time emotion classification

## 📊 Model Details

### Audio Features (162 total)
- **ZCR (Zero Crossing Rate)**: 1 feature
- **Chroma_stft**: 12 features  
- **MFCC (Mel-Frequency Cepstral Coefficients)**: 20 features
- **RMS (Root Mean Square)**: 1 feature
- **MelSpectrogram**: 128 features

### Model Architecture
```python
MLPClassifier(
    hidden_layer_sizes=(256, 128, 64),
    activation='relu',
    solver='adam',
    alpha=0.0001,
    batch_size=32,
    learning_rate='adaptive',
    max_iter=500
)
```

### Supported Emotions
- 😊 **Happy** - Joyful, cheerful speech
- 😢 **Sad** - Melancholic, sorrowful speech  
- 😡 **Angry** - Aggressive, frustrated speech
- 😨 **Fearful** - Anxious, scared speech
- 😐 **Neutral** - Flat, emotionless speech
- 😌 **Calm** - Peaceful, relaxed speech

## 🛠️ Development

### Project Structure
```
Aura-Sense/
├── src/                          # React frontend
│   ├── components/              # Reusable components
│   ├── pages/                   # Page components
│   ├── hooks/                   # Custom hooks
│   └── lib/                     # Utilities
├── Speech_Emotion_Detection-main/ # Flask backend
│   ├── app/                     # Flask application
│   ├── models/                  # ML models
│   ├── data/                    # Training data
│   └── requirements.txt         # Python dependencies
├── .github/workflows/           # GitHub Actions
└── public/                      # Static assets
```

### Available Scripts
```bash
# Frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint

# Backend
python app/app.py                    # Start Flask server
python create_sample_dataset.py      # Train ML model
python test_integration.py           # Test API integration
```

### Adding Your Own Audio Data
1. Create emotion folders: `data/user_audio/happy/`, `data/user_audio/sad/`, etc.
2. Add audio files (WAV, MP3, M4A, FLAC) to appropriate folders
3. Run `python create_sample_dataset.py` to retrain the model

## 🔧 Configuration

### Environment Variables
```bash
# Backend
FLASK_ENV=development
FLASK_DEBUG=True

# Frontend  
VITE_API_URL=http://localhost:5000
```

### API Endpoints
- `GET /health` - Health check
- `POST /predict` - Emotion prediction
- `GET /` - Frontend application

## 🧪 Testing

### Run Tests
```bash
# Frontend tests
npm test

# Backend tests
cd Speech_Emotion_Detection-main
python -m pytest tests/

# Integration tests
python test_integration.py
```

### Test the API
```bash
curl -X POST http://localhost:5000/predict \
  -F "file=@audio_sample.wav"
```

## 🚀 Deployment

### GitHub Pages (Frontend)
Automatically deployed via GitHub Actions on push to master branch.

### Backend Deployment
The backend can be deployed to:
- Heroku
- Railway
- DigitalOcean
- AWS EC2

### Docker Deployment
```bash
# Build and run with Docker
docker-compose up --build
```

## 📈 Performance

- **Frontend**: < 3s initial load
- **Backend**: < 2s emotion prediction
- **Model Accuracy**: ~85% on test data
- **Supported Formats**: WAV, MP3, WebM, M4A, FLAC

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [RAVDESS Dataset](https://zenodo.org/record/1188976) for emotion data
- [Librosa](https://librosa.org/) for audio processing
- [Scikit-learn](https://scikit-learn.org/) for machine learning
- [React](https://reactjs.org/) and [Flask](https://flask.palletsprojects.com/) communities

## 📞 Contact

**Ganesh5050** - [@Ganesh5050](https://github.com/Ganesh5050)

Project Link: [https://github.com/Ganesh5050/Aura-Sense](https://github.com/Ganesh5050/Aura-Sense)

---

⭐ **Star this repository if you found it helpful!**