import { Link } from "wouter";
import { motion } from "framer-motion";
import { Lock, Unlock, Star, ArrowLeft } from "lucide-react";
import background from "@assets/generated_images/premium_dark_abstract_background_with_subtle_gradients_and_mesh_texture.png";
import { useAtom } from "jotai";
import { unlockedLevelsAtom } from "@/lib/store";

export default function LevelSelect() {
  const [unlockedLevels] = useAtom(unlockedLevelsAtom);

  const isUnlocked = (level: string) => unlockedLevels.includes(level);

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
      
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/50 to-black" />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center p-4">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-4xl md:text-5xl font-bold mb-12 text-center"
        >
          Select Difficulty
        </motion.h2>

        <div className="flex flex-col gap-6 w-full max-w-md mb-12">
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
          {isUnlocked("medium") ? (
            <Link href="/game?level=medium">
               <motion.div
                whileHover={{ scale: 1.02, x: 10 }}
                whileTap={{ scale: 0.98 }}
                className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-amber-900/50 to-amber-800/20 border border-amber-500/30 p-6 cursor-pointer backdrop-blur-sm"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-amber-500/20 text-amber-400 group-hover:bg-amber-500/30 transition-colors">
                      <Unlock className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-display text-2xl font-bold text-amber-100">Medium</h3>
                      <p className="text-sm text-amber-200/60">The challenge grows</p>
                    </div>
                  </div>
                  <div className="text-amber-500/50 flex gap-1">
                    <Star className="w-5 h-5" />
                    <Star className="w-5 h-5" />
                  </div>
                </div>
              </motion.div>
            </Link>
          ) : (
            <div className="relative">
              <motion.div
                className="rounded-xl bg-white/5 border border-white/10 p-6 backdrop-blur-sm opacity-70 cursor-not-allowed"
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
          )}

          {/* Difficult Level */}
          {isUnlocked("difficult") ? (
             <Link href="/game?level=difficult">
              <motion.div
               whileHover={{ scale: 1.02, x: 10 }}
               whileTap={{ scale: 0.98 }}
               className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-red-900/50 to-red-800/20 border border-red-500/30 p-6 cursor-pointer backdrop-blur-sm"
             >
               <div className="flex items-center justify-between">
                 <div className="flex items-center gap-4">
                   <div className="p-3 rounded-full bg-red-500/20 text-red-400 group-hover:bg-red-500/30 transition-colors">
                     <Unlock className="w-6 h-6" />
                   </div>
                   <div>
                     <h3 className="font-display text-2xl font-bold text-red-100">Difficult</h3>
                     <p className="text-sm text-red-200/60">The ultimate test</p>
                   </div>
                 </div>
                 <div className="text-red-500/50 flex gap-1">
                   <Star className="w-5 h-5" />
                   <Star className="w-5 h-5" />
                   <Star className="w-5 h-5" />
                 </div>
               </div>
             </motion.div>
           </Link>
          ) : (
            <div className="relative">
              <motion.div
                className="rounded-xl bg-white/5 border border-white/10 p-6 backdrop-blur-sm opacity-50 cursor-not-allowed"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-white/10 text-white/30">
                      <Lock className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-display text-2xl font-bold text-white/50">Difficult</h3>
                      <p className="text-sm text-white/30">Score 4+ on Medium to unlock</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </div>

        <Link href="/mode-select">
          <button className="group flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 transition-all">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-display tracking-wider">Back to Modes</span>
          </button>
        </Link>
      </div>
    </div>
  );
}
