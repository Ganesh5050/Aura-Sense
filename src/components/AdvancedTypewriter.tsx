import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface AdvancedTypewriterProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  onComplete?: () => void;
  showCursor?: boolean;
  cursorBlinkSpeed?: number;
  effect?: 'typewriter' | 'fade' | 'slide' | 'glitch';
  pauseOnSpace?: boolean;
  pauseOnPunctuation?: boolean;
}

const AdvancedTypewriter = ({ 
  text, 
  speed = 50, 
  delay = 0, 
  className = '', 
  onComplete,
  showCursor = true,
  cursorBlinkSpeed = 500,
  effect = 'typewriter',
  pauseOnSpace = false,
  pauseOnPunctuation = false
}: AdvancedTypewriterProps) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursorState, setShowCursorState] = useState(true);

  const getDelay = (char: string, baseSpeed: number) => {
    let delay = baseSpeed;
    
    if (pauseOnSpace && char === ' ') {
      delay = baseSpeed * 3;
    }
    
    if (pauseOnPunctuation && /[.!?]/.test(char)) {
      delay = baseSpeed * 5;
    }
    
    return delay;
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentIndex < text.length) {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      } else if (onComplete) {
        onComplete();
      }
    }, currentIndex === 0 ? delay : getDelay(text[currentIndex - 1], speed));

    return () => clearTimeout(timer);
  }, [currentIndex, text, speed, delay, onComplete, pauseOnSpace, pauseOnPunctuation]);

  useEffect(() => {
    if (showCursor) {
      const cursorTimer = setInterval(() => {
        setShowCursorState(prev => !prev);
      }, cursorBlinkSpeed);

      return () => clearInterval(cursorTimer);
    }
  }, [showCursor, cursorBlinkSpeed]);

  const renderText = () => {
    switch (effect) {
      case 'fade':
        return (
          <motion.span
            className={className}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {displayText}
          </motion.span>
        );
      
      case 'slide':
        return (
          <motion.span
            className={className}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {displayText}
          </motion.span>
        );
      
      case 'glitch':
        return (
          <motion.span
            className={`${className} font-mono`}
            animate={{
              x: [0, -2, 2, 0],
              color: ['#6366f1', '#ec4899', '#8b5cf6', '#6366f1']
            }}
            transition={{ duration: 0.1, repeat: Infinity }}
          >
            {displayText}
          </motion.span>
        );
      
      default:
        return <span className={className}>{displayText}</span>;
    }
  };

  return (
    <span>
      {renderText()}
      {showCursor && showCursorState && (
        <motion.span
          className="text-primary ml-1"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        >
          |
        </motion.span>
      )}
    </span>
  );
};

export default AdvancedTypewriter;
