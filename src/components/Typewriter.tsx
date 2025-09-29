import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TypewriterProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  onComplete?: () => void;
  showCursor?: boolean;
  cursorBlinkSpeed?: number;
}

const Typewriter = ({ 
  text, 
  speed = 50, 
  delay = 0, 
  className = '', 
  onComplete,
  showCursor = true,
  cursorBlinkSpeed = 500
}: TypewriterProps) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursorState, setShowCursorState] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentIndex < text.length) {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      } else if (onComplete) {
        onComplete();
      }
    }, currentIndex === 0 ? delay : speed);

    return () => clearTimeout(timer);
  }, [currentIndex, text, speed, delay, onComplete]);

  useEffect(() => {
    if (showCursor) {
      const cursorTimer = setInterval(() => {
        setShowCursorState(prev => !prev);
      }, cursorBlinkSpeed);

      return () => clearInterval(cursorTimer);
    }
  }, [showCursor, cursorBlinkSpeed]);

  return (
    <span className={className}>
      {displayText}
      {showCursor && showCursorState && (
        <span
          className="text-primary animate-pulse"
        >
          |
        </span>
      )}
    </span>
  );
};

export default Typewriter;
