import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const NotFound = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex items-center justify-center px-6 pt-20">
      <div className="container mx-auto max-w-2xl text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="glass-card p-12"
        >
          <motion.div
            className="text-8xl mb-8"
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
          >
            🤖
          </motion.div>
          
          <h1 className="text-6xl font-bold mb-4 text-gradient">404</h1>
          <h2 className="text-2xl font-semibold mb-6 text-primary">
            Page Not Found
          </h2>
          <p className="text-lg text-foreground/60 mb-8 leading-relaxed">
            Oops! The page you're looking for seems to have wandered off into the digital void. 
            Our AI is still learning to navigate all the corners of the internet.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <motion.button
                className="btn-gradient px-8 py-4 text-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Return Home
              </motion.button>
            </Link>
            <Link to="/analyze">
              <motion.button
                className="btn-accent px-8 py-4 text-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Try Analyze
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
