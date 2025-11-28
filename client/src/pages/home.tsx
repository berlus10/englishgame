import { Link } from "wouter";
import { motion } from "framer-motion";
import background from "@assets/fond_site_1764298250228.png";
import { useState, useEffect } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const fullText = "Dear Designers, this game aims to teach you how to choose colors for your designs taking into account the context of the field of activity, ready ?";

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setText((prev) => prev + fullText.charAt(index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 40); // Slightly faster for a "game" feel
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
          transform: "scale(1.1)", // Zoom in a bit as requested
        }}
      />
      
      {/* Overlay Gradient - Reduced opacity to let the image text shine through if needed, but still readable */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/10 via-black/40 to-black/80" />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-end pb-24 md:justify-center md:pb-0 p-4 text-center">
        
        {/* Text Container with Pro Game Effect */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="max-w-3xl mx-auto mb-16 bg-black/30 backdrop-blur-sm p-6 rounded-xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
        >
          <p className="font-display text-xl md:text-2xl font-medium leading-relaxed tracking-wide text-white/90 drop-shadow-md">
            {text}
            <motion.span 
              animate={{ opacity: [0, 1, 0] }} 
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="inline-block w-[3px] h-[1.2em] bg-primary ml-1 align-middle"
            />
          </p>
        </motion.div>

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
            className="group relative px-16 py-6 bg-primary rounded-full font-display text-2xl font-bold uppercase tracking-widest border-2 border-white/20 text-white shadow-[0_0_30px_rgba(124,58,237,0.5)] overflow-hidden cursor-pointer"
          >
            <span className="relative z-10 drop-shadow-md">Play Game</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
          </motion.button>
        </Link>
      </div>
    </div>
  );
}
