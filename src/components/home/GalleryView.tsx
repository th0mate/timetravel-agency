import { motion } from 'framer-motion';
import { ArrowLeft, Image as ImageIcon, Search } from 'lucide-react';

import cretace11 from '../../assets/images/cretace11.png';
import cretace169 from '../../assets/images/cretace169.png';
import cretace916 from '../../assets/images/cretace916.png';
import florence11 from '../../assets/images/florence11.png';
import florence169 from '../../assets/images/florence169.png';
import florence916 from '../../assets/images/florence916.png';
import paris11 from '../../assets/images/paris11.png';
import paris169 from '../../assets/images/paris169.png';
import paris916 from '../../assets/images/paris916.png';
import parisblur169 from '../../assets/images/parisblur169.png';
import ttAgency from '../../assets/images/timetravelagency.png';

const galleryItems = [
  { src: paris169, title: "Paris 1889", category: "Belle Époque", size: "wide" },
  { src: cretace916, title: "T-Rex en vue", category: "Crétacé", size: "tall" },
  { src: florence11, title: "Atelier de Vinci", category: "Renaissance", size: "square" },
  { src: paris11, title: "Rues de Paris", category: "Belle Époque", size: "square" },
  { src: ttAgency, title: "L'Agence", category: "Corporate", size: "wide" },
  { src: cretace169, title: "Plaines du Crétacé", category: "Crétacé", size: "wide" },
  { src: florence169, title: "Dôme de Florence", category: "Renaissance", size: "wide" },
  { src: paris916, title: "Tour Eiffel", category: "Belle Époque", size: "tall" },
  { src: cretace11, title: "Faune Antique", category: "Crétacé", size: "square" },
  { src: parisblur169, title: "Visions du passé", category: "Artistique", size: "wide" },
  { src: florence916, title: "Statue de David", category: "Renaissance", size: "tall" },
];

interface GalleryViewProps {
  onBack: () => void;
}

export default function GalleryView({ onBack }: GalleryViewProps) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-neutral-950 pt-24 pb-20 px-6"
    >
      <div className="container mx-auto">
        {/* Header Galerie */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <button 
              onClick={onBack}
              className="flex items-center gap-2 text-gold-500 hover:text-gold-600 transition-colors mb-4 cursor-pointer group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              Retour à l'accueil
            </button>
            <h1 className="text-4xl md:text-5xl font-bold text-white flex items-center gap-4">
              <ImageIcon className="text-gold-500" />
              Galerie <span className="text-gold-500">Temporelle</span>
            </h1>
          </div>
          
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Rechercher une époque..." 
              className="bg-white/5 border border-white/10 rounded-full py-3 pl-12 pr-6 text-white focus:outline-none focus:border-gold-500/50 w-full md:w-80"
            />
          </div>
        </div>

        {/* Grille de la Galerie */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {galleryItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group break-inside-avoid rounded-2xl overflow-hidden border border-white/10"
            >
              <img 
                src={item.src} 
                alt={item.title} 
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="text-gold-500 text-xs font-bold uppercase tracking-widest mb-1">{item.category}</span>
                <h3 className="text-xl font-bold text-white">{item.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
