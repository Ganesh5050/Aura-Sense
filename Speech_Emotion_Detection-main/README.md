# Speech Emotion Detection

This project is a web-based application that predicts the emotion from a given speech audio file. It uses a machine learning model trained on the RAVDESS dataset to classify emotions into one of eight categories: neutral, calm, happy, sad, angry, fearful, disgust, or surprised.

## Features

-   **Simple Web Interface**: Upload an audio file and see the predicted emotion.
-   **Eight Emotions**: Classifies speech into neutral, calm, happy, sad, angry, fearful, disgust, or surprised.
-   **Visual Feedback**: The predicted emotion is displayed with a corresponding emoji.

## How It Works

1.  **Data Preparation (`main.py`)**: Scans the RAVDESS dataset and creates a `sample_data.csv` file, which maps each audio file to its emotion.
2.  **Model Training (`models/train_models.py`)**: Extracts audio features (MFCC, Chroma, etc.) using `librosa` and trains a Multi-Layer Perceptron (MLP) classifier. It saves the trained model, a feature scaler, and a label encoder.
3.  **Web Application (`app/app.py`)**: A Flask app that serves the UI. When you upload a file, it extracts features, uses the saved model to predict the emotion, and displays the result.

---

## Setup and Usage

Follow these steps to get the project running on your local machine.

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd Speech_Emotion_Detection
```

### 2. Create a Virtual Environment

It is highly recommended to use a virtual environment to manage dependencies.

-   **On Windows:**
    ```bash
    python -m venv venv
    venv\Scripts\activate
    ```
-   **On macOS/Linux:**
    ```bash
    python3 -m venv venv
    source venv/bin/activate
    ```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Download the Dataset

The model is trained on the **Ryerson Audio-Visual Database of Emotional Speech and Song (RAVDESS)**.

-   Download the "Audio_Speech_Actors_01-24.zip" file from [this Zenodo page](https://zenodo.org/record/1188976).
-   Unzip the file. You will have folders named `Actor_01`, `Actor_02`, etc.
-   Place all these `Actor_*` folders inside the `data/RAVDESS/` directory in the project.

Your directory structure should look like this:

```
Speech_Emotion_Detection/
└── data/
    └── RAVDESS/
        ├── Actor_01/
        │   └── *.wav
        ├── Actor_02/
        │   └── *.wav
        └── ...
```

### 5. Prepare the Data Manifest

Run the `main.py` script to scan the audio files and create the `data/sample_data.csv` file. This is required for training the model.

```bash
python main.py
```

### 6. Train the Model

Run the training script to process the audio data and generate the model files (`.pkl`).

```bash
python models/train_models.py
```
This will create `saved_model.pkl`, `scaler.pkl`, and `label_encoder.pkl` in the `models/` directory.

### 7. Run the Application

Start the Flask web server.

```bash
python app/app.py
```

Open your web browser and navigate to **http://127.0.0.1:5000** to use the application.