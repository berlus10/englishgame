import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { EASY_QUESTIONS, COLORS, Question } from "@/lib/game-data";
import { cn } from "@/lib/utils";
import { Check, X, Timer, ArrowRight, RotateCcw } from "lucide-react";
import background from "@assets/generated_images/abstract_modern_3d_geometric_background_for_a_game.png";

const TIMER_DURATION = 60;

export default function Game() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIMER_DURATION);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [selectedColorName, setSelectedColorName] = useState<string | null>(null);
  const [gameStatus, setGameStatus] = useState<'playing' | 'finished'>('playing');

  const currentQuestion = EASY_QUESTIONS[currentQuestionIndex];

  useEffect(() => {
    if (gameStatus === 'finished' || isAnswered) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameStatus, isAnswered]);

  const handleTimeUp = () => {
    setIsAnswered(true);
    setIsCorrect(false);
  };

  const handleColorSelect = (colorName: string) => {
    if (isAnswered) return;
    
    setSelectedColorName(colorName);
    const isRight = currentQuestion.correctColors.includes(colorName);
    setIsCorrect(isRight);
    setIsAnswered(true);
    
    if (isRight) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < EASY_QUESTIONS.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setIsAnswered(false);
      setIsCorrect(false);
      setSelectedColorName(null);
      setTimeLeft(TIMER_DURATION);
    } else {
      setGameStatus('finished');
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setTimeLeft(TIMER_DURATION);
    setIsAnswered(false);
    setIsCorrect(false);
    setSelectedColorName(null);
    setGameStatus('playing');
  };

  if (gameStatus === 'finished') {
    const passed = score >= 3;
    return (
      <div className="relative min-h-screen w-full flex items-center justify-center bg-black text-white p-4">
         <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${background})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.2,
          }}
        />
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative z-10 max-w-lg w-full bg-black/80 border border-white/10 rounded-2xl p-8 backdrop-blur-md text-center"
        >
          <h2 className="font-display text-4xl font-bold mb-4">{passed ? "Level Complete!" : "Level Failed"}</h2>
          <p className="text-xl mb-8 text-white/70">You scored {score} out of {EASY_QUESTIONS.length}</p>
          
          {passed ? (
            <div className="space-y-4">
              <p className="text-emerald-400 font-bold text-lg">Medium Level Unlocked!</p>
              <Link href="/level-select">
                 <button className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold uppercase tracking-wider transition-colors">
                   Continue
                 </button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-red-400">You need at least 3 points to proceed.</p>
              <button 
                onClick={handleRestart}
                className="w-full py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-5 h-5" /> Try Again
              </button>
            </div>
          )}
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full bg-black text-white flex flex-col md:flex-row overflow-hidden">
       <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${background})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.15,
          }}
        />

      {/* Sidebar / Topbar stats */}
      <div className="relative z-10 w-full md:w-64 bg-black/50 border-b md:border-b-0 md:border-r border-white/10 p-6 flex flex-row md:flex-col justify-between items-center md:items-start backdrop-blur-md">
        <div>
          <Link href="/level-select" className="text-xs text-white/40 uppercase tracking-widest hover:text-white transition-colors mb-4 block">
            ← Exit
          </Link>
          <h2 className="font-display text-xl font-bold text-white mb-1">Easy Level</h2>
          <p className="text-sm text-white/50">Question {currentQuestionIndex + 1} / {EASY_QUESTIONS.length}</p>
        </div>

        <div className="flex items-center gap-4 md:flex-col md:items-start md:gap-8 md:mt-12 w-full">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary border border-primary/30">
              <span className="font-display font-bold">{score}</span>
            </div>
            <span className="text-sm uppercase tracking-wider text-white/60">Score</span>
          </div>

          <div className="flex items-center gap-3">
             <div className={cn(
               "w-10 h-10 rounded-full flex items-center justify-center border transition-colors",
               timeLeft < 10 ? "bg-red-500/20 text-red-400 border-red-500/30 animate-pulse" : "bg-white/10 text-white border-white/20"
             )}>
                <Timer className="w-5 h-5" />
             </div>
             <span className={cn("font-display font-bold text-xl", timeLeft < 10 ? "text-red-400" : "text-white")}>
               {timeLeft}s
             </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 p-4 md:p-8 flex flex-col max-w-5xl mx-auto w-full">
        {/* Question Card */}
        <motion.div 
          key={currentQuestion.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-2xl md:text-4xl font-bold leading-tight text-white drop-shadow-md">
            {currentQuestion.text.split("______").map((part, i, arr) => (
              <span key={i}>
                {part}
                {i < arr.length - 1 && (
                  <span className="inline-block w-32 border-b-4 border-white/30 mx-2 align-bottom relative top-1" />
                )}
              </span>
            ))}
          </h1>
        </motion.div>

        {/* Feedback Overlay (3D Text) */}
        <AnimatePresence>
          {isAnswered && (
             <div className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none">
                <motion.h2
                  initial={{ scale: 0, rotateX: -90, opacity: 0 }}
                  animate={{ scale: 1, rotateX: 0, opacity: 1 }}
                  exit={{ scale: 1.5, opacity: 0 }}
                  className={cn(
                    "font-display text-8xl md:text-9xl font-black uppercase tracking-widest transform-style-3d drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]",
                    isCorrect ? "text-emerald-500" : "text-red-500"
                  )}
                >
                  {isCorrect ? "RIGHT" : "WRONG"}
                </motion.h2>
             </div>
          )}
        </AnimatePresence>

        {/* Color Grid */}
        <div className={cn(
          "grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-10 gap-3 md:gap-4 flex-1 overflow-y-auto pb-24",
          isAnswered && "pointer-events-none opacity-50 blur-[1px] transition-all duration-500"
        )}>
          {COLORS.map((color) => (
            <motion.button
              key={color.name}
              whileHover={{ scale: 1.1, zIndex: 10 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleColorSelect(color.name)}
              className="aspect-square rounded-lg shadow-lg relative group border border-white/10"
              style={{ backgroundColor: color.hex }}
            >
              <span className="sr-only">{color.name}</span>
              
              {/* Tooltip on hover */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-black/90 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20 pointer-events-none border border-white/20">
                {color.name}
              </div>
            </motion.button>
          ))}
        </div>

        {/* Explanation Panel (Bottom Sheet style) */}
        <AnimatePresence>
          {isAnswered && (
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              className="absolute bottom-0 left-0 right-0 bg-zinc-900/95 border-t border-white/20 p-6 md:p-8 backdrop-blur-xl z-40 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]"
            >
              <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                 <div className="flex-1">
                    <h3 className="font-display text-lg text-white/50 mb-1 uppercase tracking-wider">Answer & Explanation</h3>
                    <p className="text-white text-lg md:text-xl mb-2">
                      <span className="font-bold text-primary">Correct:</span> {currentQuestion.correctColors.join(", ")}
                    </p>
                    <p className="text-white/80 leading-relaxed">
                      {currentQuestion.explanation}
                    </p>
                 </div>
                 
                 <button 
                   onClick={handleNextQuestion}
                   className="px-8 py-4 bg-white text-black hover:bg-white/90 rounded-full font-bold uppercase tracking-wider flex items-center gap-2 transition-colors shadow-lg hover:shadow-white/20"
                 >
                   Next <ArrowRight className="w-5 h-5" />
                 </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
