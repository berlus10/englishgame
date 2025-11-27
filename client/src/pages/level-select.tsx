import { Link } from "wouter";
import { motion } from "framer-motion";
import { Lock, Unlock, Star } from "lucide-react";
import background from "@assets/generated_images/abstract_modern_3d_geometric_background_for_a_game.png";
import { useState } from "react";

export default function LevelSelect() {
  // In a real app, this would come from a global store or context
  const [unlockedLevels] = useState(["easy"]); 

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black text-white">
       <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.2,
        }}
      />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center p-4">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-4xl md:text-5xl font-bold mb-12 text-center"
        >
          Select Difficulty
        </motion.h2>

        <div className="flex flex-col gap-6 w-full max-w-md">
          {/* Easy Level */}
          <Link href="/game?level=easy">
            <motion.div
              whileHover={{ scale: 1.02, x: 10 }}
              whileTap={{ scale: 0.98 }}
              className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-emerald-900/50 to-emerald-800/20 border border-emerald-500/30 p-6 cursor-pointer backdrop-blur-sm"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-emerald-500/20 text-emerald-400 group-hover:bg-emerald-500/30 transition-colors">
                    <Unlock className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-bold text-emerald-100">Easy</h3>
                    <p className="text-sm text-emerald-200/60">Start your journey</p>
                  </div>
                </div>
                <div className="text-emerald-500/50">
                  <Star className="w-6 h-6" />
                </div>
              </div>
            </motion.div>
          </Link>

          {/* Medium Level */}
          <div className="relative">
            <motion.div
              className="rounded-xl bg-white/5 border border-white/10 p-6 backdrop-blur-sm opacity-70"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-white/10 text-white/30">
                    <Lock className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-bold text-white/50">Medium</h3>
                    <p className="text-sm text-white/30">Score 3+ on Easy to unlock</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Difficult Level */}
          <div className="relative">
            <motion.div
              className="rounded-xl bg-white/5 border border-white/10 p-6 backdrop-blur-sm opacity-50"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-white/10 text-white/30">
                    <Lock className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-bold text-white/50">Difficult</h3>
                    <p className="text-sm text-white/30">Complete Medium to unlock</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="mt-12">
           <Link href="/mode-select" className="text-white/50 hover:text-white text-sm uppercase tracking-widest transition-colors">
              Back to Modes
           </Link>
        </div>
      </div>
    </div>
  );
}
