import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useSearch } from "wouter";
import { EASY_QUESTIONS, MEDIUM_QUESTIONS, DIFFICULT_QUESTIONS, ALL_QUESTIONS, COLORS, Question } from "@/lib/game-data";
import { cn } from "@/lib/utils";
import { Timer, ArrowRight, RotateCcw, Trophy, ArrowLeft, Check } from "lucide-react";
import background from "@assets/generated_images/premium_dark_abstract_background_with_subtle_gradients_and_mesh_texture.png";
import { useAtom } from "jotai";
import { unlockedLevelsAtom } from "@/lib/store";
import confetti from "canvas-confetti";

const TIMER_DURATION = 60;

export default function Game() {
  const search = useSearch();
  const params = new URLSearchParams(search);
  const level = params.get("level") || params.get("mode") || "easy"; // Support both param styles
  
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIMER_DURATION);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [gameStatus, setGameStatus] = useState<'playing' | 'finished'>('playing');
  
  const [, setUnlockedLevels] = useAtom(unlockedLevelsAtom);

  // Initialize Questions based on Level
  useEffect(() => {
    let qs: Question[] = [];
    if (level === "random") {
      qs = [...ALL_QUESTIONS].sort(() => Math.random() - 0.5);
    } else if (level === "medium") {
      qs = MEDIUM_QUESTIONS;
    } else if (level === "difficult") {
      qs = DIFFICULT_QUESTIONS;
    } else {
      qs = EASY_QUESTIONS;
    }
    setQuestions(qs);
    handleRestart();
  }, [level]);

  const currentQuestion = questions[currentQuestionIndex];

  // Timer Logic
  useEffect(() => {
    if (gameStatus === 'finished' || isAnswered || !currentQuestion) return;

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
  }, [gameStatus, isAnswered, currentQuestion]);

  const handleTimeUp = () => {
    setIsAnswered(true);
    setIsCorrect(false);
  };

  const handleColorSelect = (colorName: string) => {
    if (isAnswered || !currentQuestion) return;

    // Toggle logic for double selection
    if (currentQuestion.type === "double") {
      let newSelection = [...selectedColors];
      if (newSelection.includes(colorName)) {
        newSelection = newSelection.filter(c => c !== colorName);
      } else {
        if (newSelection.length < 2) {
          newSelection.push(colorName);
        }
      }
      setSelectedColors(newSelection);

      // Auto-submit if 2 selected
      if (newSelection.length === 2) {
        checkAnswer(newSelection);
      }
    } else {
      // Single selection logic
      setSelectedColors([colorName]);
      checkAnswer([colorName]);
    }
  };

  const checkAnswer = (selections: string[]) => {
    if (!currentQuestion) return;

    let isRight = false;

    if (currentQuestion.type === "double") {
      // Check if the pair exists in validPairs
      // Normalize sorting to compare sets
      if (currentQuestion.validPairs) {
        const sortedSelection = [...selections].sort().join(",");
        isRight = currentQuestion.validPairs.some(pair => 
          [...pair].sort().join(",") === sortedSelection
        );
      }
    } else {
      // Single check
      isRight = currentQuestion.correctColors.includes(selections[0]);
    }

    setIsCorrect(isRight);
    setIsAnswered(true);
    
    if (isRight) {
      setScore((prev) => prev + currentQuestion.points);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setIsAnswered(false);
      setIsCorrect(false);
      setSelectedColors([]);
      setTimeLeft(TIMER_DURATION);
    } else {
      finishGame();
    }
  };

  const finishGame = () => {
    setGameStatus('finished');
    
    // Unlock Logic
    if (level === "easy" && score + (isCorrect ? currentQuestion.points : 0) >= 3) {
      setUnlockedLevels(prev => Array.from(new Set([...prev, "medium"])));
      triggerConfetti();
    } else if (level === "medium" && score + (isCorrect ? currentQuestion.points : 0) >= 4) {
      setUnlockedLevels(prev => Array.from(new Set([...prev, "difficult"])));
      triggerConfetti();
    } else if (level === "difficult" && score + (isCorrect ? currentQuestion.points : 0) >= 9) {
      triggerConfetti();
    }
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#10B981', '#3B82F6', '#F59E0B', '#EF4444']
    });
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setTimeLeft(TIMER_DURATION);
    setIsAnswered(false);
    setIsCorrect(false);
    setSelectedColors([]);
    setGameStatus('playing');
  };

  if (!currentQuestion) return <div className="bg-black h-screen w-full text-white flex items-center justify-center">Loading...</div>;

  if (gameStatus === 'finished') {
    let passed = false;
    let message = "Level Failed";
    let subMessage = "";
    let nextLink = "";
    let nextLabel = "Continue";

    if (level === "easy") {
      passed = score >= 3;
      message = passed ? "Level Complete!" : "Try Again";
      subMessage = passed ? "Medium Level Unlocked!" : "You need at least 3 points.";
      nextLink = "/level-select";
    } else if (level === "medium") {
      passed = score >= 4;
      message = passed ? "Level Complete!" : "Try Again";
      subMessage = passed ? "Difficult Level Unlocked!" : "You need at least 4 points.";
      nextLink = "/level-select";
    } else if (level === "difficult") {
      passed = score >= 9;
      message = passed ? "Congratulations Champion!" : "Try Again";
      subMessage = passed ? "You are a color master." : "You need at least 9 points.";
      nextLink = "/";
      nextLabel = "Restart Game";
    } else {
      // Random mode
      passed = true;
      message = "Game Over";
      subMessage = `Final Score: ${score}`;
      nextLink = "/mode-select";
      nextLabel = "Back to Modes";
    }

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
          className="relative z-10 max-w-lg w-full bg-black/80 border border-white/10 rounded-2xl p-8 backdrop-blur-md text-center shadow-2xl"
        >
          {passed && level === "difficult" && (
            <div className="flex justify-center mb-6">
               <motion.div
                 animate={{ rotateY: 360 }}
                 transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
               >
                 <Trophy className="w-24 h-24 text-yellow-400 drop-shadow-[0_0_30px_rgba(250,204,21,0.6)]" />
               </motion.div>
            </div>
          )}

          <h2 className="font-display text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">{message}</h2>
          <p className="text-xl mb-2 font-bold text-primary">Score: {score}</p>
          <p className="text-white/60 mb-8">{subMessage}</p>
          
          {passed ? (
            <div className="space-y-4">
              <Link href={nextLink}>
                 <button className="w-full py-4 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white rounded-xl font-bold uppercase tracking-wider transition-all transform hover:scale-105 shadow-lg shadow-emerald-900/20">
                   {nextLabel}
                 </button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              <button 
                onClick={handleRestart}
                className="w-full py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-5 h-5" /> Try Again
              </button>
              <Link href="/level-select">
                <button className="w-full py-4 text-white/50 hover:text-white transition-colors text-sm uppercase tracking-wider">
                  Exit Level
                </button>
              </Link>
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
          <Link href={level === "random" ? "/mode-select" : "/level-select"} className="text-xs text-white/40 uppercase tracking-widest hover:text-white transition-colors mb-4 flex items-center gap-1">
            <ArrowLeft className="w-3 h-3" /> Exit
          </Link>
          <h2 className="font-display text-xl font-bold text-white mb-1 capitalize">{level} Level</h2>
          <p className="text-sm text-white/50">Question {currentQuestionIndex + 1} / {questions.length}</p>
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
           <div className="flex items-center gap-2 mb-4">
              <span className="px-2 py-1 bg-white/10 rounded text-xs uppercase tracking-wider text-white/50 border border-white/5">
                 {currentQuestion.points} Points
              </span>
              {currentQuestion.type === "double" && (
                 <span className="px-2 py-1 bg-primary/20 rounded text-xs uppercase tracking-wider text-primary border border-primary/20">
                    Select 2 Colors
                 </span>
              )}
           </div>

          <h1 className="text-2xl md:text-4xl font-bold leading-tight text-white drop-shadow-md">
            {currentQuestion.text.split("______").map((part, i, arr) => (
              <span key={i}>
                {part}
                {i < arr.length - 1 && (
                  <span className={cn(
                    "inline-block border-b-4 mx-2 align-bottom relative top-1 transition-colors duration-300",
                     selectedColors[i] ? "w-auto border-primary text-primary px-2" : "w-32 border-white/30"
                  )}>
                    {selectedColors[i] ? (
                      <span className="text-2xl">{selectedColors[i]}</span>
                    ) : ""}
                  </span>
                )}
              </span>
            ))}
             {/* Handle single hole but already filled visually above? No, simpler approach below for text rendering */}
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
          "grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2 md:gap-4 flex-1 overflow-y-auto pb-24 content-start",
          isAnswered && "pointer-events-none opacity-50 blur-[1px] transition-all duration-500"
        )}>
          {COLORS.map((color) => {
            const isSelected = selectedColors.includes(color.name);
            return (
              <motion.button
                key={color.name}
                whileHover={{ scale: 1.1, zIndex: 10 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleColorSelect(color.name)}
                className={cn(
                  "aspect-square rounded-lg shadow-lg relative group border transition-all duration-200",
                  isSelected ? "border-4 border-white ring-2 ring-primary z-10 scale-105" : "border-white/10"
                )}
                style={{ backgroundColor: color.hex }}
              >
                <span className="sr-only">{color.name}</span>
                
                {/* Checkmark indicator for selection */}
                {isSelected && (
                  <div className="absolute inset-0 flex items-center justify-center">
                     <Check className={cn("w-8 h-8 drop-shadow-md", 
                       ["White", "Yellow", "Beige", "Silver", "Light Blue", "Pink", "Neon Green", "Mint Green", "Sand", "Light Purple"].includes(color.name) ? "text-black" : "text-white"
                     )} />
                  </div>
                )}

                {/* Tooltip on hover */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-black/90 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20 pointer-events-none border border-white/20 hidden md:block">
                  {color.name}
                </div>
              </motion.button>
            );
          })}
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
                      <span className="font-bold text-primary">Correct:</span> {
                        currentQuestion.type === "double" && currentQuestion.validPairs 
                          ? "See explanation for valid pairs." 
                          : currentQuestion.correctColors.join(", ")
                      }
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
