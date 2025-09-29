import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Upload, Mic, Zap, History, Target, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import Typewriter from "@/components/Typewriter";
import heroImage from "@/assets/hero-bg.jpg";

const Home = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description: "Advanced neural networks decode emotional patterns in speech with 95% accuracy",
      delay: 0.1,
    },
    {
      icon: Zap,
      title: "Real-Time Processing",
      description: "Instant emotion detection with live audio processing and visual feedback",
      delay: 0.2,
    },
    {
      icon: Target,
      title: "Precision Insights",
      description: "Detailed confidence scores and emotional breakdowns for better understanding",
      delay: 0.3,
    },
    {
      icon: History,
      title: "Complete History",
      description: "Track emotional patterns over time with comprehensive analysis logs",
      delay: 0.4,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section with Background Image */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="AI Brain Visualization" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/70 to-background/90" />
        </div>
        <div className="container mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <motion.h1
              className="text-6xl md:text-8xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="text-gradient">AuraSense</span>
            </motion.h1>
            
            <motion.div
              className="text-2xl md:text-3xl mb-4 text-foreground/80"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Typewriter 
                text="Hear Beyond Words" 
                speed={100} 
                delay={1000}
                className="font-semibold"
              />
            </motion.div>
            
            <motion.div
              className="text-lg md:text-xl mb-12 text-foreground/60 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Typewriter 
                text="Experience the future of emotion recognition with our advanced AI that analyzes speech patterns to reveal the true emotional landscape behind every word." 
                speed={30} 
                delay={2500}
                className="leading-relaxed"
              />
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Link to="/analyze">
                <Button className="btn-gradient text-lg px-8 py-6 group">
                  <Upload className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  Upload Audio
                </Button>
              </Link>
              
              <Link to="/analyze">
                <Button className="btn-accent text-lg px-8 py-6 group">
                  <Mic className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  Record Live
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-primary/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [-20, 20, -20],
                opacity: [0, 1, 0],
                scale: [0.5, 1.5, 0.5],
              }}
              transition={{
                duration: 4 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
              Powerful Features
            </h2>
            <p className="text-xl text-foreground/60 max-w-2xl mx-auto">
              Experience cutting-edge emotion recognition technology designed for accuracy, 
              speed, and deep insights into human communication.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="glass-card p-8 hover:glow-primary group cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: feature.delay }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="flex items-start space-x-6">
                  <motion.div
                    className="p-4 glass-card group-hover:glow-accent"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <feature.icon className="w-8 h-8 text-primary" />
                  </motion.div>
                  <div>
                    <h3 className="text-2xl font-semibold mb-3 text-primary">
                      {feature.title}
                    </h3>
                    <p className="text-foreground/70 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto text-center">
          <motion.div
            className="glass-card p-12 max-w-4xl mx-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            whileHover={{ y: -5 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
              Ready to Decode Emotions?
            </h2>
            <p className="text-xl text-foreground/60 mb-8 max-w-2xl mx-auto">
              Start your journey into advanced emotion recognition. Upload your first audio 
              file or record live to experience the power of AuraSense.
            </p>
            <Link to="/analyze">
              <Button className="btn-gradient text-xl px-12 py-6 animate-pulse-glow">
                Get Started Now
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;