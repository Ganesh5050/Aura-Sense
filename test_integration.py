#!/usr/bin/env python3
"""
Test script to verify the integration between frontend and backend
"""

import os
import sys
import subprocess
import time
import requests
import json

def test_backend_health():
    """Test if backend is running and responding"""
    try:
        response = requests.get('http://localhost:5000/', timeout=5)
        print("✅ Backend is running and accessible")
        return True
    except requests.exceptions.RequestException as e:
        print(f"❌ Backend not accessible: {e}")
        return False

def test_predict_endpoint():
    """Test the predict endpoint with a dummy request"""
    try:
        # Create a dummy audio file for testing
        import numpy as np
        import wave
        
        # Generate a simple sine wave as test audio
        sample_rate = 22050
        duration = 2.0
        frequency = 440.0
        
        t = np.linspace(0, duration, int(sample_rate * duration))
        audio_data = np.sin(2 * np.pi * frequency * t)
        
        # Convert to 16-bit integers
        audio_data = (audio_data * 32767).astype(np.int16)
        
        # Write to WAV file
        test_file = 'test_audio.wav'
        with wave.open(test_file, 'w') as wav_file:
            wav_file.setnchannels(1)
            wav_file.setsampwidth(2)
            wav_file.setframerate(sample_rate)
            wav_file.writeframes(audio_data.tobytes())
        
        # Test the API
        with open(test_file, 'rb') as f:
            files = {'file': f}
            response = requests.post('http://localhost:5000/predict', files=files, timeout=10)
        
        # Clean up test file
        os.remove(test_file)
        
        if response.status_code == 200:
            data = response.json()
            print("✅ Predict endpoint working")
            print(f"   Response: {json.dumps(data, indent=2)}")
            return True
        else:
            print(f"❌ Predict endpoint failed: {response.status_code}")
            print(f"   Response: {response.text}")
            return False
            
    except Exception as e:
        print(f"❌ Error testing predict endpoint: {e}")
        return False

def check_frontend_build():
    """Check if frontend can be built"""
    try:
        print("🔄 Testing frontend build...")
        result = subprocess.run(['npm', 'run', 'build'], 
                              capture_output=True, text=True, timeout=60)
        if result.returncode == 0:
            print("✅ Frontend builds successfully")
            return True
        else:
            print(f"❌ Frontend build failed: {result.stderr}")
            return False
    except Exception as e:
        print(f"❌ Error testing frontend build: {e}")
        return False

def main():
    print("🧪 Testing AuraSense Integration")
    print("=" * 40)
    
    # Check if we're in the right directory
    if not os.path.exists('package.json') or not os.path.exists('Speech_Emotion_Detection-main'):
        print("❌ Please run this script from the project root directory")
        sys.exit(1)
    
    print("📁 Project structure looks good")
    
    # Test backend
    print("\n🔍 Testing Backend...")
    backend_ok = test_backend_health()
    
    if backend_ok:
        predict_ok = test_predict_endpoint()
    else:
        print("⚠️  Start the backend first: cd Speech_Emotion_Detection-main && python app/app.py")
        predict_ok = False
    
    # Test frontend
    print("\n🔍 Testing Frontend...")
    frontend_ok = check_frontend_build()
    
    # Summary
    print("\n📊 Test Summary")
    print("=" * 20)
    print(f"Backend Health: {'✅' if backend_ok else '❌'}")
    print(f"API Endpoint:   {'✅' if predict_ok else '❌'}")
    print(f"Frontend Build: {'✅' if frontend_ok else '❌'}")
    
    if backend_ok and predict_ok and frontend_ok:
        print("\n🎉 All tests passed! Integration is working correctly.")
        print("\n🚀 To start the full application:")
        print("   Windows: start.bat")
        print("   Linux/Mac: ./start.sh")
    else:
        print("\n⚠️  Some tests failed. Please check the issues above.")
        
if __name__ == '__main__':
    main()
