# AuraSense - Speech Emotion Recognition with Visual Interface

A complete speech emotion recognition system that combines a modern React frontend with a powerful Python backend for real-time emotion detection from audio files.

## 🚀 Features

- **Beautiful Modern UI**: React + TypeScript frontend with Tailwind CSS and Framer Motion animations
- **Real-time Emotion Detection**: Python ML backend using librosa and scikit-learn
- **Drag & Drop Interface**: Easy file upload with audio preview
- **Live Recording**: Record audio directly in the browser
- **Confidence Scores**: Get detailed confidence levels for predictions
- **Emoji & Visual Feedback**: Emotional responses with emojis and visual auras
- **Responsive Design**: Works on desktop and mobile devices

## 📁 Project Structure

```
aura-sense-visuals-main/
├── src/                          # React Frontend
│   ├── components/              # UI Components
│   ├── pages/                   # Page Components
│   │   └── Analyze.tsx         # Main analysis page
│   └── config/                  # Configuration
│       └── api.ts              # API configuration
├── Speech_Emotion_Detection-main/ # Python Backend
│   ├── app/
│   │   └── app.py              # Flask API server
│   ├── models/                 # ML models and training
│   └── requirements.txt        # Python dependencies
├── start.bat                   # Windows startup script
├── start.sh                    # Unix/Linux startup script
└── package.json               # Node.js dependencies
```

## 🛠️ Setup & Installation

### Prerequisites

- **Python 3.7+** with pip
- **Node.js 16+** with npm
- **Audio libraries**: The system will install librosa and other audio processing libraries

### Quick Start

#### Windows:
```bash
# Run the automated setup script
start.bat
```

#### Linux/macOS:
```bash
# Make script executable and run
chmod +x start.sh
./start.sh
```

#### Manual Setup:

1. **Install Backend Dependencies**:
```bash
cd Speech_Emotion_Detection-main
pip install -r requirements.txt
```

2. **Install Frontend Dependencies**:
```bash
npm install
```

3. **Start Backend Server**:
```bash
cd Speech_Emotion_Detection-main
python app/app.py
```

4. **Start Frontend Development Server**:
```bash
npm run dev
```

## 🎯 Usage

1. **Access the Application**: Open http://localhost:5173 in your browser
2. **Upload Audio**: Drag and drop an audio file or click to browse
3. **Record Live**: Use the microphone button to record audio directly
4. **Analyze**: Click "Analyze Emotion" to process the audio
5. **View Results**: See the detected emotion with confidence score and visual feedback

### Supported Audio Formats
- MP3, WAV, M4A
- Maximum file size: 10MB
- Optimal duration: 2-5 seconds

## 🧠 Machine Learning Model

The backend uses:
- **Feature Extraction**: MFCC, Zero Crossing Rate, Chroma, RMS, Mel Spectrogram
- **Model**: Multi-Layer Perceptron (MLP) Classifier
- **Training Data**: RAVDESS dataset (optional - can be trained on custom data)
- **Emotions Detected**: Happy, Sad, Angry, Fearful, Neutral, Calm, Disgust, Surprised

## 🎨 Frontend Features

- **Modern React**: TypeScript, Vite, and modern React patterns
- **UI Components**: Shadcn/ui components with Radix UI primitives
- **Animations**: Framer Motion for smooth transitions
- **Responsive**: Tailwind CSS for responsive design
- **Dark Theme**: Built-in dark mode support

## 🔧 API Endpoints

### POST /predict
Upload an audio file for emotion prediction.

**Request**: 
- Method: POST
- Content-Type: multipart/form-data
- Body: Audio file

**Response**:
```json
{
  "emotion": "happy",
  "confidence": 87.5,
  "emoji": "😊",
  "color": "emotions-happy",
  "aura": "aura-happy"
}
```

## 🚨 Troubleshooting

### Common Issues:

1. **Backend not starting**: 
   - Check if Python dependencies are installed: `pip install -r Speech_Emotion_Detection-main/requirements.txt`
   - Verify Python version: `python --version` (should be 3.7+)

2. **Frontend not connecting to backend**:
   - Ensure backend is running on http://localhost:5000
   - Check browser console for CORS errors

3. **Audio processing errors**:
   - Verify audio file format is supported
   - Check file size (max 10MB)

4. **Model not found**:
   - Train the model first: `cd Speech_Emotion_Detection-main && python models/train_models.py`

### Development Mode:

For development, you can modify the API URL in `src/config/api.ts`:
```typescript
export const API_CONFIG = {
  BASE_URL: 'http://localhost:5000', // Change this for different environments
  ENDPOINTS: {
    PREDICT: '/predict'
  }
};
```

## 📦 Building for Production

1. **Build Frontend**:
```bash
npm run build
```

2. **Deploy Backend**: 
   - Use Gunicorn or similar WSGI server
   - Set up proper CORS for your domain
   - Configure environment variables

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test both frontend and backend
5. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.

---

**Enjoy analyzing emotions with AuraSense! 🎭✨**
