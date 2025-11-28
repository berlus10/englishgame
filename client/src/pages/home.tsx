import { Link } from "wouter";
import { motion } from "framer-motion";
import background from "@assets/fond_site_1764298250228.png";

export default function Home() {
  const scrollingText = "Dear Designers, this game aims to teach you how to choose colors for your designs taking into account the context of the field of activity, ready ?";

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black text-white">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: "scale(1.1)", 
        }}
      />
      
      {/* Overlay Gradient */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/10 via-black/40 to-black/80" />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-end pb-32 md:justify-center md:pb-0 p-4 text-center">
        
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
            className="group relative px-16 py-6 bg-primary rounded-full font-display text-2xl font-bold uppercase tracking-widest border-2 border-white/20 text-white shadow-[0_0_30px_rgba(124,58,237,0.5)] overflow-hidden cursor-pointer mb-12"
          >
            <span className="relative z-10 drop-shadow-md">Play Game</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
          </motion.button>
        </Link>

        {/* Marquee / Scrolling Text Band */}
        <div className="w-full max-w-lg mx-auto h-10 bg-black/40 backdrop-blur-md border-y border-white/10 overflow-hidden flex items-center relative">
           <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-black/50 to-transparent z-10"></div>
           <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-black/50 to-transparent z-10"></div>
           
           <motion.div 
             className="whitespace-nowrap flex gap-8 items-center"
             animate={{ x: ["100%", "-100%"] }}
             transition={{ 
               repeat: Infinity, 
               ease: "linear", 
               duration: 15 // Adjust speed here
             }}
           >
             <span className="font-mono text-sm md:text-base text-white/90 tracking-wider uppercase">{scrollingText}</span>
           </motion.div>
        </div>

      </div>
    </div>
  );
}
