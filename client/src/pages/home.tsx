import { Link } from "wouter";
import { motion } from "framer-motion";
import background from "@assets/fond_site_1764295615694.png";
import { useState, useEffect } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const fullText = "Dear Designer, this game aims to teach you how to choose colors for your designs taking into account the context of the field of activity, ready ...";

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setText((prev) => prev + fullText.charAt(index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 50);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black text-white">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.8,
        }}
      />
      
      {/* Overlay Gradient */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/30 via-black/50 to-black/90" />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center p-4 text-center">
        {/* 3D Reveal Logo */}
        <motion.div
          initial={{ opacity: 0, rotateX: 90, y: -100 }}
          animate={{ opacity: 1, rotateX: 0, y: 0 }}
          transition={{ 
            duration: 1.5, 
            type: "spring", 
            bounce: 0.4 
          }}
          className="perspective-1000 mb-8"
        >
          <h1 className="font-display text-6xl md:text-9xl font-black uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] transform-style-3d text-glow">
            Brand it!
          </h1>
        </motion.div>

        {/* Typewriter Text */}
        <div className="h-24 max-w-2xl mx-auto mb-12">
          <p className="font-mono text-lg md:text-xl text-white/80 leading-relaxed">
            {text}
            <span className="animate-pulse">|</span>
          </p>
        </div>

        {/* Pulse 3D Button */}
        <Link href="/mode-select">
          <motion.button
            initial={{ scale: 1 }}
            animate={{ 
              scale: [1, 1.05, 1],
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
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-16 py-8 bg-primary rounded-full font-display text-2xl md:text-3xl font-bold uppercase tracking-widest border-2 border-white/20 text-white shadow-[0_0_30px_rgba(124,58,237,0.5)] overflow-hidden cursor-pointer"
          >
            <span className="relative z-10 drop-shadow-md">Play Game</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
          </motion.button>
        </Link>
      </div>
    </div>
  );
}
