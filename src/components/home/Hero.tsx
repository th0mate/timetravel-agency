import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

// Utiliser une vidéo locale pour le background
const heroVideo = new URL('../../assets/videos/Paris.mp4', import.meta.url).href;

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video / Overlay */}
      <div className="absolute inset-0 z-0">
        <video
          src={heroVideo}
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden
        />

        {/* overlay entre la vidéo et le texte */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-neutral-950 z-10" />
      </div>

      <div className="container mx-auto px-4 z-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block py-1 px-3 rounded-full bg-gold-500/20 text-gold-500 border border-gold-500/30 text-sm font-medium mb-6 backdrop-blur-sm">
            Voyagez à travers l'histoire
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Explorez le Temps, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-500 to-amber-200">
              Redécouvrez le Monde
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            TimeTravel Agency vous offre des expériences immersives inoubliables. 
            Paris 1889, la Renaissance ou l'ère des Dinosaures vous attendent.
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <button className="px-8 py-4 bg-gold-500 hover:bg-gold-600 text-black font-bold rounded-full transition-all flex items-center gap-2 group">
              Réserver votre voyage
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-full backdrop-blur-md transition-all border border-white/10">
              En savoir plus
            </button>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1 h-1 bg-white rounded-full"></div>
        </div>
      </motion.div>
    </section>
  );
}
