#!/bin/bash

echo "Starting AuraSense Emotion Detection System..."
echo

# Check if Python is installed
if ! command -v python &> /dev/null; then
    if ! command -v python3 &> /dev/null; then
        echo "Python is not installed or not in PATH"
        exit 1
    else
        PYTHON_CMD="python3"
    fi
else
    PYTHON_CMD="python"
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Node.js is not installed or not in PATH"
    exit 1
fi

echo "Installing Python dependencies..."
cd Speech_Emotion_Detection-main
pip install -r requirements.txt
if [ $? -ne 0 ]; then
    echo "Failed to install Python dependencies"
    exit 1
fi

echo
echo "Installing Node.js dependencies..."
cd ..
npm install
if [ $? -ne 0 ]; then
    echo "Failed to install Node.js dependencies"
    exit 1
fi

echo
echo "Starting services..."
echo "Backend will start on http://localhost:5000"
echo "Frontend will start on http://localhost:5173"
echo

# Start Flask backend in background
cd Speech_Emotion_Detection-main
$PYTHON_CMD app/app.py &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 3

# Start React frontend
cd ..
npm run dev &
FRONTEND_PID=$!

echo
echo "Services started successfully!"
echo "Backend: http://localhost:5000 (PID: $BACKEND_PID)"
echo "Frontend: http://localhost:5173 (PID: $FRONTEND_PID)"
echo
echo "Press Ctrl+C to stop both services"

# Wait for user to stop
trap "kill $BACKEND_PID $FRONTEND_PID; exit" INT
wait
