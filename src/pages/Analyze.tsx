import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Mic, Play, Pause, RotateCcw, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Typewriter from "@/components/Typewriter";
import { getApiUrl, API_CONFIG } from "@/config/api";

type EmotionResult = {
  emotion: string;
  confidence: number;
  emoji: string;
  color: string;
  aura: string;
};

const Analyze = () => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<EmotionResult | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const emotions = [
    { name: "happy", emoji: "😊", color: "emotions-happy", aura: "aura-happy" },
    { name: "sad", emoji: "😢", color: "emotions-sad", aura: "aura-sad" },
    { name: "angry", emoji: "😡", color: "emotions-angry", aura: "aura-angry" },
    { name: "fearful", emoji: "😨", color: "emotions-fearful", aura: "aura-fearful" },
    { name: "neutral", emoji: "😐", color: "emotions-neutral", aura: "aura-neutral" },
  ];

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files[0] && files[0].type.startsWith("audio/")) {
      setSelectedFile(files[0]);
      setAudioUrl(URL.createObjectURL(files[0]));
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setAudioUrl(URL.createObjectURL(file));
    }
  };

  const startAnalysis = async () => {
    if (!selectedFile) return;
    
    setIsAnalyzing(true);
    
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      
      const response = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.PREDICT), {
        method: 'POST',
        body: formData,
      });
      
      const data = await response.json();
      
          if (data.error) {
            console.error('API Error:', data.error);
            // Show user-friendly error message
            alert(`Analysis failed: ${data.error}. Please try a different audio file or check the file format.`);
            setIsAnalyzing(false);
            return;
          } else {
        setResult({
          emotion: data.emotion,
          confidence: data.confidence,
          emoji: data.emoji,
          color: data.color,
          aura: data.aura,
        });
      }
        } catch (error) {
          console.error('Network Error:', error);
          // Show user-friendly error message
          alert('Unable to connect to the analysis server. Please check your internet connection and try again.');
          setIsAnalyzing(false);
          return;
        }
    
    setIsAnalyzing(false);
  };

  const resetAnalysis = () => {
    setSelectedFile(null);
    setResult(null);
    setAudioUrl(null);
    setIsAnalyzing(false);
    setRecordingTime(0);
    setAudioChunks([]);
    
    // Stop any ongoing recording
    if (isRecording) {
      stopRecording();
    }
  };

  const startRecording = async () => {
    try {
      // Check if microphone is available
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        alert('Microphone not supported in this browser. Please use Chrome, Firefox, or Edge.');
        return;
      }

      // Request microphone permission first
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100
        } 
      });
      
      // Check for supported MediaRecorder formats
      let mimeType = 'audio/webm';
      if (MediaRecorder.isTypeSupported('audio/webm;codecs=opus')) {
        mimeType = 'audio/webm;codecs=opus';
      } else if (MediaRecorder.isTypeSupported('audio/webm')) {
        mimeType = 'audio/webm';
      } else if (MediaRecorder.isTypeSupported('audio/mp4')) {
        mimeType = 'audio/mp4';
      }
      
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: mimeType
      });
      
      const audioChunks: Blob[] = [];
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.push(event.data);
        }
      };
      
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: mimeType });
        const audioUrl = URL.createObjectURL(audioBlob);
        const audioFile = new File([audioBlob], `recording.${mimeType.split('/')[1].split(';')[0]}`, { type: mimeType });
        
        setSelectedFile(audioFile);
        setAudioUrl(audioUrl);
        setAudioChunks([]);
        
        // Stop all tracks
        stream.getTracks().forEach(track => track.stop());
      };
      
      mediaRecorder.start();
      setMediaRecorder(mediaRecorder);
      setIsRecording(true);
      setAudioChunks([]);
      setRecordingTime(0);
      
    } catch (error) {
      console.error('Error accessing microphone:', error);
      
      // Provide more specific error messages
      if (error.name === 'NotAllowedError') {
        alert('Microphone access denied. Please allow microphone permissions and try again.');
      } else if (error.name === 'NotFoundError') {
        alert('No microphone found. Please connect a microphone and try again.');
      } else if (error.name === 'NotSupportedError') {
        alert('Microphone not supported in this browser. Please use Chrome, Firefox, or Edge.');
      } else {
        alert('Unable to access microphone. Please check permissions and try again.');
      }
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      setIsRecording(false);
      setRecordingTime(0);
      
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
        recordingIntervalRef.current = null;
      }
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };


  // Timer effect
  useEffect(() => {
    if (isRecording) {
      console.log('Starting timer effect');
      const interval = setInterval(() => {
        setRecordingTime(prev => {
          const newTime = prev + 1;
          console.log('Timer effect tick:', newTime);
          if (newTime >= 30) {
            stopRecording();
            return 30;
          }
          return newTime;
        });
      }, 1000);
      
      recordingIntervalRef.current = interval;
      
      return () => {
        console.log('Clearing timer interval');
        clearInterval(interval);
      };
    } else {
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
        recordingIntervalRef.current = null;
      }
    }
  }, [isRecording]);

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
      }
      if (mediaRecorder && isRecording) {
        mediaRecorder.stop();
      }
    };
  }, [mediaRecorder, isRecording]);

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-4 text-gradient">
            <Typewriter 
              text="Analyze Speech Emotions" 
              speed={80} 
              delay={500}
              className="text-gradient"
            />
          </h1>
          <div className="text-xl text-foreground/60">
            <Typewriter 
              text="Upload an audio file or record live to detect emotional patterns" 
              speed={40} 
              delay={2000}
            />
          </div>
        </motion.div>

        {!result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass-card p-8 mb-8"
          >
            <div className="grid md:grid-cols-2 gap-8">
              {/* File Upload */}
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-primary">
                  Upload Audio File
                </h3>
                <motion.div
                  className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer ${
                    isDragOver
                      ? "border-primary bg-primary/10 scale-105"
                      : "border-glass-border hover:border-primary/50"
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Upload className="w-12 h-12 text-primary mx-auto mb-4" />
                  <p className="text-lg font-medium mb-2">
                    Drop your audio file here
                  </p>
                  <p className="text-sm text-foreground/60">
                    Supports MP3, WAV, M4A files up to 10MB
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="audio/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </motion.div>
              </div>

              {/* Live Recording */}
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-primary">
                  Record Live Audio
                </h3>
                <div className="glass-card p-8 text-center">
                  <motion.button
                    onClick={toggleRecording}
                    className={`w-20 h-20 rounded-full mb-4 mx-auto flex items-center justify-center ${
                      isRecording
                        ? "bg-red-500 animate-pulse-glow"
                        : "btn-gradient"
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Mic className="w-8 h-8 text-white" />
                  </motion.button>
                  
                  <p className="text-lg font-medium mb-2">
                    {isRecording ? (
                      <span className="flex items-center justify-center gap-2">
                        <motion.div
                          className="w-3 h-3 bg-red-500 rounded-full"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 0.5, repeat: Infinity }}
                        />
                        Recording...
                      </span>
                    ) : (
                      "Start Recording"
                    )}
                  </p>
                  
                  <p className="text-sm text-foreground/60 mb-4">
                    Click to start/stop recording (Max 30 seconds)
                  </p>

                  {/* Recording Timer */}
                  {isRecording && (
                    <motion.div
                      className="mt-4 mb-4"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      <div className="text-3xl font-bold text-red-500 mb-2">
                        {formatTime(recordingTime)}
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                        <motion.div
                          className="bg-gradient-to-r from-red-500 to-red-600 h-3 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${(recordingTime / 30) * 100}%` }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                      <p className={`text-sm font-medium ${
                        recordingTime >= 25 ? 'text-red-500 animate-pulse' : 'text-red-400'
                      }`}>
                        {30 - recordingTime} seconds remaining
                        {recordingTime >= 25 && (
                          <span className="ml-2 text-red-600 font-bold">
                            ⚠️ Almost done!
                          </span>
                        )}
                      </p>
                    </motion.div>
                  )}

                  {/* Audio Visualizer */}
                  {isRecording && (
                    <motion.div
                      className="mt-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <div className="flex justify-center space-x-1">
                        {[...Array(7)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="w-1 bg-primary rounded-full"
                            animate={{
                              height: [10, Math.random() * 30 + 10, 10],
                            }}
                            transition={{
                              duration: 0.3,
                              repeat: Infinity,
                              delay: i * 0.1,
                            }}
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>

            {selectedFile && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 text-center"
              >
                <div className="glass-card p-6 mb-6">
                  <p className="text-lg font-medium mb-2">
                    Selected: {selectedFile.name}
                  </p>
                  {audioUrl && (
                    <audio controls className="w-full max-w-md mx-auto">
                      <source src={audioUrl} type={selectedFile.type} />
                    </audio>
                  )}
                </div>
                <Button
                  onClick={startAnalysis}
                  disabled={isAnalyzing}
                  className="btn-gradient text-lg px-8 py-4"
                >
                  {isAnalyzing ? "Analyzing..." : "Analyze Emotion"}
                </Button>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Loading State */}
        <AnimatePresence>
          {isAnalyzing && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="glass-card p-12 text-center"
            >
              <motion.div
                className="w-32 h-32 mx-auto mb-8 glass-card rounded-full flex items-center justify-center"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              >
                <div className="w-16 h-16 bg-gradient-primary rounded-full animate-pulse" />
              </motion.div>
              <h3 className="text-2xl font-semibold mb-4 text-primary">
                Analyzing Speech Patterns...
              </h3>
              <p className="text-foreground/60 mb-8">
                AI is processing emotional markers in your audio
              </p>
              <Progress value={66} className="w-full max-w-md mx-auto" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="glass-card p-12 text-center"
            >
              <motion.div
                className={`w-32 h-32 mx-auto mb-8 glass-card rounded-full flex items-center justify-center text-6xl ${result.aura}`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                {result.emoji}
              </motion.div>

              <h3 className="text-4xl font-bold mb-4 capitalize text-primary">
                {result.emotion}
              </h3>

              <div className="max-w-md mx-auto mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-lg font-medium">Confidence</span>
                  <span className="text-lg font-bold text-primary">
                    {result.confidence}%
                  </span>
                </div>
                <motion.div
                  className="w-full bg-glass-border rounded-full h-4 overflow-hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <motion.div
                    className="h-full bg-gradient-primary rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${result.confidence}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </motion.div>
              </div>

              <div className="flex justify-center space-x-4">
                <Button
                  onClick={resetAnalysis}
                  variant="outline"
                  className="px-6 py-3"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Analyze Another
                </Button>
                <Button className="btn-accent px-6 py-3">
                  <Download className="w-4 h-4 mr-2" />
                  Save Result
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Analyze;