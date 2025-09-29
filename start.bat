@echo off
echo Starting AuraSense Emotion Detection System...
echo.

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo Python is not installed or not in PATH
    pause
    exit /b 1
)

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo Node.js is not installed or not in PATH
    pause
    exit /b 1
)

echo Installing Python dependencies...
cd Speech_Emotion_Detection-main
pip install -r requirements.txt
if errorlevel 1 (
    echo Failed to install Python dependencies
    pause
    exit /b 1
)

echo.
echo Installing Node.js dependencies...
cd ..
npm install
if errorlevel 1 (
    echo Failed to install Node.js dependencies
    pause
    exit /b 1
)

echo.
echo Starting services...
echo Backend will start on http://localhost:5000
echo Frontend will start on http://localhost:5173
echo.

REM Start Flask backend in background
start "Flask Backend" cmd /c "cd Speech_Emotion_Detection-main && python app/app.py"

REM Wait a moment for backend to start
timeout /t 3 /nobreak >nul

REM Start React frontend
start "React Frontend" cmd /c "npm run dev"

echo.
echo Services started successfully!
echo Backend: http://localhost:5000
echo Frontend: http://localhost:5173
echo.
pause
