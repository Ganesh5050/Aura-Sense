import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, MapPin, Phone, MessageCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    toast({
      title: "Message Sent! ✨",
      description: "Thank you for reaching out. We'll get back to you soon!",
    });

    setFormData({ name: "", email: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      content: "hello@aurasense.ai",
      description: "Get in touch for support or inquiries",
      delay: 0.1,
    },
    {
      icon: Phone,
      title: "Call Us",
      content: "+1 (555) 123-4567",
      description: "Mon-Fri, 9AM-6PM EST",
      delay: 0.2,
    },
    {
      icon: MapPin,
      title: "Visit Us",
      content: "San Francisco, CA",
      description: "Silicon Valley Tech Hub",
      delay: 0.3,
    },
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
            Get In Touch
          </h1>
          <p className="text-xl text-foreground/60 max-w-2xl mx-auto">
            Have questions about AuraSense? Want to collaborate or need support? 
            We'd love to hear from you and help you unlock the power of emotion recognition.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass-card p-8"
          >
            <div className="flex items-center space-x-3 mb-8">
              <motion.div
                className="p-3 glass-card glow-primary"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <MessageCircle className="w-6 h-6 text-primary" />
              </motion.div>
              <h2 className="text-3xl font-bold text-primary">Send a Message</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <label className="block text-sm font-medium mb-2 text-foreground/80">
                    Your Name
                  </label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className="input-glass"
                    required
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <label className="block text-sm font-medium mb-2 text-foreground/80">
                    Email Address
                  </label>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your.email@example.com"
                    className="input-glass"
                    required
                  />
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <label className="block text-sm font-medium mb-2 text-foreground/80">
                  Subject
                </label>
                <Input
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="What's this about?"
                  className="input-glass"
                  required
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <label className="block text-sm font-medium mb-2 text-foreground/80">
                  Message
                </label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us more about your inquiry..."
                  rows={6}
                  className="input-glass resize-none"
                  required
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-gradient text-lg py-6 group"
                >
                  {isSubmitting ? (
                    <motion.div
                      className="flex items-center space-x-2"
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <Sparkles className="w-5 h-5" />
                      <span>Sending...</span>
                    </motion.div>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
                      Send Message
                    </>
                  )}
                </Button>
              </motion.div>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            <div className="glass-card p-8">
              <h3 className="text-2xl font-bold mb-6 text-primary">
                Connect With Us
              </h3>
              <p className="text-foreground/70 mb-8 leading-relaxed">
                Choose the best way to reach out. We're here to help you harness 
                the power of emotion recognition technology for your projects and ideas.
              </p>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start space-x-4 p-4 glass-card hover:glow-primary group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 + info.delay }}
                    whileHover={{ x: 5 }}
                  >
                    <motion.div
                      className="p-3 glass-card group-hover:glow-accent"
                      whileHover={{ scale: 1.1, rotate: 10 }}
                    >
                      <info.icon className="w-6 h-6 text-primary" />
                    </motion.div>
                    <div>
                      <h4 className="font-semibold text-primary mb-1">
                        {info.title}
                      </h4>
                      <p className="text-lg font-medium mb-1">{info.content}</p>
                      <p className="text-sm text-foreground/60">
                        {info.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Floating Bubbles Background */}
            <div className="relative glass-card p-8 overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-4 text-primary">
                  Why Choose AuraSense?
                </h3>
                <ul className="space-y-3 text-foreground/70">
                  <motion.li
                    className="flex items-center space-x-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                  >
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                    <span>Industry-leading 95% accuracy</span>
                  </motion.li>
                  <motion.li
                    className="flex items-center space-x-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.9 }}
                  >
                    <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                    <span>Real-time processing capabilities</span>
                  </motion.li>
                  <motion.li
                    className="flex items-center space-x-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 1.0 }}
                  >
                    <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
                    <span>Privacy-first approach</span>
                  </motion.li>
                  <motion.li
                    className="flex items-center space-x-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 1.1 }}
                  >
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                    <span>Expert support team</span>
                  </motion.li>
                </ul>
              </div>

              {/* Floating Bubbles */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute rounded-full opacity-20"
                    style={{
                      background: `linear-gradient(135deg, 
                        hsl(${270 + i * 30} 70% 60%), 
                        hsl(${190 + i * 20} 80% 60%))`,
                      width: `${20 + i * 10}px`,
                      height: `${20 + i * 10}px`,
                      left: `${10 + i * 12}%`,
                      top: `${5 + i * 15}%`,
                    }}
                    animate={{
                      y: [-10, 10, -10],
                      x: [-5, 5, -5],
                      scale: [0.8, 1.2, 0.8],
                      opacity: [0.1, 0.3, 0.1],
                    }}
                    transition={{
                      duration: 4 + i * 0.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;