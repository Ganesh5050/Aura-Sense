import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, Download, Play, Trash2, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

type HistoryItem = {
  id: string;
  date: string;
  time: string;
  fileName: string;
  emotion: string;
  confidence: number;
  emoji: string;
  duration: string;
  aura: string;
};

const History = () => {
  const [filter, setFilter] = useState("all");

  // Mock history data
  const historyData: HistoryItem[] = [
    {
      id: "1",
      date: "2024-01-15",
      time: "14:30",
      fileName: "presentation_recording.wav",
      emotion: "confident",
      confidence: 89,
      emoji: "😤",
      duration: "2:45",
      aura: "aura-happy",
    },
    {
      id: "2",
      date: "2024-01-15",
      time: "12:15",
      fileName: "interview_call.mp3",
      emotion: "nervous",
      confidence: 76,
      emoji: "😰",
      duration: "15:30",
      aura: "aura-fearful",
    },
    {
      id: "3",
      date: "2024-01-14",
      time: "09:45",
      fileName: "team_meeting.wav",
      emotion: "happy",
      confidence: 94,
      emoji: "😊",
      duration: "8:20",
      aura: "aura-happy",
    },
    {
      id: "4",
      date: "2024-01-14",
      time: "16:20",
      fileName: "customer_feedback.mp3",
      emotion: "frustrated",
      confidence: 82,
      emoji: "😤",
      duration: "4:15",
      aura: "aura-angry",
    },
    {
      id: "5",
      date: "2024-01-13",
      time: "11:00",
      fileName: "podcast_recording.wav",
      emotion: "excited",
      confidence: 91,
      emoji: "🤩",
      duration: "22:30",
      aura: "aura-happy",
    },
    {
      id: "6",
      date: "2024-01-12",
      time: "15:30",
      fileName: "voice_memo.m4a",
      emotion: "sad",
      confidence: 73,
      emoji: "😢",
      duration: "1:45",
      aura: "aura-sad",
    },
  ];

  const emotions = ["all", "happy", "sad", "angry", "fearful", "neutral"];

  const filteredHistory = filter === "all" 
    ? historyData 
    : historyData.filter(item => 
        item.emotion.toLowerCase().includes(filter.toLowerCase())
      );

  const groupedHistory = filteredHistory.reduce((groups, item) => {
    const date = item.date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(item);
    return groups;
  }, {} as Record<string, HistoryItem[]>);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }
  };

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
            Analysis History
          </h1>
          <p className="text-xl text-foreground/60">
            Track your emotional patterns and insights over time
          </p>
        </motion.div>

        {/* Filter Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass-card p-6 mb-8"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-4">
              <Filter className="w-5 h-5 text-primary" />
              <span className="font-medium">Filter by emotion:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {emotions.map((emotion) => (
                <Button
                  key={emotion}
                  onClick={() => setFilter(emotion)}
                  variant={filter === emotion ? "default" : "outline"}
                  className={`capitalize ${
                    filter === emotion ? "btn-gradient" : ""
                  }`}
                  size="sm"
                >
                  {emotion}
                </Button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* History Timeline */}
        <div className="space-y-8">
          {Object.entries(groupedHistory).map(([date, items], groupIndex) => (
            <motion.div
              key={date}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: groupIndex * 0.1 }}
            >
              <div className="flex items-center mb-6">
                <Clock className="w-5 h-5 text-primary mr-3" />
                <h3 className="text-2xl font-semibold text-primary">
                  {formatDate(date)}
                </h3>
                <div className="flex-1 h-px bg-glass-border ml-6" />
              </div>

              <div className="space-y-4">
                {items.map((item, itemIndex) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.6, 
                      delay: (groupIndex * 0.1) + (itemIndex * 0.05) 
                    }}
                    className="glass-card p-6 hover:glow-primary group cursor-pointer"
                    whileHover={{ y: -2, scale: 1.01 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-6">
                        <motion.div
                          className={`w-16 h-16 glass-card rounded-full flex items-center justify-center text-2xl ${item.aura}`}
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          {item.emoji}
                        </motion.div>

                        <div>
                          <h4 className="text-lg font-semibold mb-1">
                            {item.fileName}
                          </h4>
                          <div className="flex items-center space-x-4 text-sm text-foreground/60">
                            <span>{item.time}</span>
                            <span>•</span>
                            <span>{item.duration}</span>
                            <span>•</span>
                            <span className="capitalize font-medium text-primary">
                              {item.emotion}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-6">
                        <div className="text-right">
                          <div className="text-lg font-bold text-primary">
                            {item.confidence}%
                          </div>
                          <div className="text-xs text-foreground/60">
                            Confidence
                          </div>
                        </div>

                        <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            size="sm"
                            variant="outline"
                            className="hover:glow-primary"
                          >
                            <Play className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="hover:glow-primary"
                          >
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="hover:text-red-500 hover:border-red-500"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Confidence Bar */}
                    <div className="mt-4">
                      <div className="w-full bg-glass-border rounded-full h-2 overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-primary rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${item.confidence}%` }}
                          transition={{ 
                            duration: 1, 
                            delay: (groupIndex * 0.2) + (itemIndex * 0.1) 
                          }}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {filteredHistory.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass-card p-12 text-center"
          >
            <div className="text-6xl mb-6">🔍</div>
            <h3 className="text-2xl font-semibold mb-4 text-primary">
              No results found
            </h3>
            <p className="text-foreground/60 mb-8">
              No analysis history matches your current filter.
            </p>
            <Button 
              onClick={() => setFilter("all")} 
              className="btn-gradient"
            >
              Show All Results
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default History;