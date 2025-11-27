import { Link } from "wouter";
import { motion } from "framer-motion";
import background from "@assets/generated_images/abstract_modern_3d_geometric_background_for_a_game.png";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black text-white">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.6,
        }}
      />
      
      {/* Overlay Gradient */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-black/50 to-black" />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center p-4">
        {/* 3D Reveal Logo */}
        <motion.div
          initial={{ opacity: 0, rotateX: 90, y: -100 }}
          animate={{ opacity: 1, rotateX: 0, y: 0 }}
          transition={{ 
            duration: 1.5, 
            type: "spring", 
            bounce: 0.4 
          }}
          className="perspective-1000 mb-16"
        >
          <h1 className="font-display text-6xl md:text-9xl font-black uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] transform-style-3d text-glow">
            Brand it!
          </h1>
        </motion.div>

        {/* Pulse 3D Button */}
        <Link href="/mode-select">
          <motion.button
            initial={{ scale: 1 }}
            animate={{ 
              scale: [1, 1.1, 1],
              boxShadow: [
                "0 0 0 0 rgba(124, 58, 237, 0.7)",
                "0 0 0 20px rgba(124, 58, 237, 0)",
                "0 0 0 0 rgba(124, 58, 237, 0)"
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-12 py-6 bg-primary rounded-full font-display text-2xl font-bold uppercase tracking-widest border-2 border-white/20 text-white shadow-[0_0_30px_rgba(124,58,237,0.5)] overflow-hidden"
          >
            <span className="relative z-10 drop-shadow-md">Play Game</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
          </motion.button>
        </Link>
      </div>
    </div>
  );
}
