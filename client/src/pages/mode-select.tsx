import { Link } from "wouter";
import { motion } from "framer-motion";
import { Card3D } from "@/components/ui/3d-card";
import { User, Users, Shuffle } from "lucide-react";
import background from "@assets/generated_images/abstract_modern_3d_geometric_background_for_a_game.png";

export default function ModeSelect() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black text-white">
       {/* Background Image - Dimmed */}
       <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.3,
        }}
      />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center p-4">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-4xl md:text-6xl font-bold mb-16 text-center text-white drop-shadow-lg"
        >
          Choose Mode
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl px-4">
          {/* Solo Mode */}
          <div className="h-64 md:h-80">
            <Link href="/level-select">
              <Card3D className="bg-gradient-to-br from-blue-900/40 to-blue-600/10 border-blue-500/30">
                <User className="w-16 h-16 mb-6 text-blue-400 drop-shadow-[0_0_15px_rgba(96,165,250,0.5)]" />
                <h3 className="font-display text-3xl font-bold mb-2">Solo</h3>
                <p className="text-blue-200/70 text-center">Master the brand colors alone</p>
              </Card3D>
            </Link>
          </div>

          {/* Team Mode */}
          <div className="h-64 md:h-80">
            <Card3D className="bg-gradient-to-br from-purple-900/40 to-purple-600/10 border-purple-500/30 opacity-80 grayscale-[0.5]">
              <Users className="w-16 h-16 mb-6 text-purple-400 drop-shadow-[0_0_15px_rgba(192,132,252,0.5)]" />
              <h3 className="font-display text-3xl font-bold mb-2">Team</h3>
              <p className="text-purple-200/70 text-center">Collaborate with friends</p>
              <div className="absolute top-4 right-4 px-2 py-1 bg-black/50 rounded text-xs text-white/50 border border-white/10">Coming Soon</div>
            </Card3D>
          </div>

          {/* Random Mode */}
          <div className="h-64 md:h-80">
            <Card3D className="bg-gradient-to-br from-green-900/40 to-green-600/10 border-green-500/30 opacity-80 grayscale-[0.5]">
              <Shuffle className="w-16 h-16 mb-6 text-green-400 drop-shadow-[0_0_15px_rgba(74,222,128,0.5)]" />
              <h3 className="font-display text-3xl font-bold mb-2">Random</h3>
              <p className="text-green-200/70 text-center">Unexpected challenges</p>
              <div className="absolute top-4 right-4 px-2 py-1 bg-black/50 rounded text-xs text-white/50 border border-white/10">Coming Soon</div>
            </Card3D>
          </div>
        </div>
      </div>
    </div>
  );
}
