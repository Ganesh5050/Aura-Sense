import { motion } from "framer-motion";
import { Brain, Zap, Target, Shield, Users, Award } from "lucide-react";
import Typewriter from "@/components/Typewriter";

const About = () => {
  const features = [
    {
      icon: Brain,
      title: "Advanced AI Technology",
      description: "Our neural networks are trained on millions of speech samples to detect subtle emotional patterns with unprecedented accuracy.",
      delay: 0.1,
    },
    {
      icon: Zap,
      title: "Real-Time Processing",
      description: "Lightning-fast analysis that processes audio in real-time, providing instant emotional insights without delays.",
      delay: 0.2,
    },
    {
      icon: Target,
      title: "Precision Analytics",
      description: "95% accuracy rate in emotion detection with detailed confidence scores and comprehensive emotional breakdowns.",
      delay: 0.3,
    },
    {
      icon: Shield,
      title: "Privacy First",
      description: "Your audio data is processed securely with end-to-end encryption. We never store or share your personal recordings.",
      delay: 0.4,
    },
  ];

  const team = [
    {
      name: "Dr. Sarah Chen",
      role: "AI Research Lead",
      description: "Former Google AI researcher specializing in natural language processing and emotional intelligence.",
      delay: 0.1,
    },
    {
      name: "Marcus Rodriguez",
      role: "Chief Technology Officer",
      description: "Full-stack engineer with 10+ years in audio processing and machine learning infrastructure.",
      delay: 0.2,
    },
    {
      name: "Dr. Aisha Patel",
      role: "Psychology Consultant",
      description: "Clinical psychologist and emotion recognition expert ensuring our models reflect real human behavior.",
      delay: 0.3,
    },
    {
      name: "James Liu",
      role: "Product Designer",
      description: "UX/UI specialist focused on creating intuitive interfaces for complex AI-powered applications.",
      delay: 0.4,
    },
  ];

  const stats = [
    { number: "1M+", label: "Audio Samples Processed" },
    { number: "95%", label: "Accuracy Rate" },
    { number: "50ms", label: "Average Response Time" },
    { number: "12", label: "Supported Languages" },
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gradient">
            <Typewriter 
              text="About AuraSense" 
              speed={100} 
              delay={500}
              className="text-gradient"
            />
          </h1>
          <div className="text-xl text-foreground/60 max-w-3xl mx-auto leading-relaxed">
            <Typewriter 
              text="We're pioneering the future of human-computer interaction through advanced emotion recognition technology. Our mission is to help machines understand the full spectrum of human communication." 
              speed={30} 
              delay={2000}
            />
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="glass-card p-6 text-center"
              whileHover={{ y: -5, scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                {stat.number}
              </div>
              <div className="text-sm text-foreground/60">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Technology Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6 text-gradient">
              Cutting-Edge Technology
            </h2>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
              Built with the latest advances in AI, machine learning, and signal processing 
              to deliver unparalleled emotion recognition capabilities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="glass-card p-8 hover:glow-primary group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: feature.delay }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-start space-x-6">
                  <motion.div
                    className="p-4 glass-card group-hover:glow-accent flex-shrink-0"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <feature.icon className="w-8 h-8 text-primary" />
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-primary">
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
        </motion.div>

        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-card p-12 mb-20 text-center"
        >
          <motion.div
            className="w-20 h-20 mx-auto mb-8 glass-card rounded-full flex items-center justify-center glow-primary"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Target className="w-10 h-10 text-primary" />
          </motion.div>
          <h2 className="text-4xl font-bold mb-6 text-gradient">Our Mission</h2>
          <p className="text-lg text-foreground/70 max-w-3xl mx-auto leading-relaxed">
            To bridge the gap between human emotion and artificial intelligence. We believe 
            that understanding emotions is crucial for creating more empathetic, responsive, 
            and helpful AI systems that can truly understand and support human needs.
          </p>
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6 text-gradient">
              Meet Our Team
            </h2>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
              A diverse group of researchers, engineers, and designers united by 
              our passion for advancing human-AI interaction.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                className="glass-card p-8 hover:glow-primary group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: member.delay }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-start space-x-6">
                  <motion.div
                    className="w-16 h-16 glass-card rounded-full flex items-center justify-center flex-shrink-0 group-hover:glow-accent"
                    whileHover={{ scale: 1.1 }}
                  >
                    <Users className="w-8 h-8 text-primary" />
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-semibold mb-1 text-primary">
                      {member.name}
                    </h3>
                    <p className="text-sm font-medium text-accent mb-3">
                      {member.role}
                    </p>
                    <p className="text-foreground/70 leading-relaxed">
                      {member.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Awards Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-card p-12 text-center"
        >
          <motion.div
            className="w-16 h-16 mx-auto mb-6 glass-card rounded-full flex items-center justify-center glow-accent"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Award className="w-8 h-8 text-accent" />
          </motion.div>
          <h2 className="text-3xl font-bold mb-6 text-gradient">Recognition</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="p-4">
              <h3 className="font-semibold text-primary mb-2">AI Innovation Award 2024</h3>
              <p className="text-sm text-foreground/60">Best Emotion Recognition Technology</p>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-primary mb-2">TechCrunch Disrupt</h3>
              <p className="text-sm text-foreground/60">Startup Battlefield Finalist</p>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-primary mb-2">MIT Technology Review</h3>
              <p className="text-sm text-foreground/60">35 Innovators Under 35</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;