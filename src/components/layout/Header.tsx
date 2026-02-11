import { useState, useEffect } from 'react';
import { Hourglass, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
  onBook: () => void;
}

export default function Header({ onBook }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/80 backdrop-blur-md py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-gold-500">
          <Hourglass className="h-8 w-8 animate-pulse" />
          <span className="text-xl font-bold tracking-wider text-white">TimeTravel<span className="text-gold-500">Agency</span></span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#destinations" className="text-gray-300 hover:text-gold-500 transition-colors cursor-pointer">Destinations</a>
          <a href="#quiz" className="text-gray-300 hover:text-gold-500 transition-colors cursor-pointer">Conseils</a>
          <a href="#contact" className="text-gray-300 hover:text-gold-500 transition-colors cursor-pointer">Contact</a>
          <button 
            onClick={onBook}
            className="px-6 py-2 bg-gold-500 hover:bg-gold-600 text-black font-bold rounded-full transition-all transform hover:scale-105 cursor-pointer"
          >
            Réserver
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white cursor-pointer"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-lg border-t border-white/10 overflow-hidden"
          >
            <div className="flex flex-col gap-4 p-6">
              <a href="#destinations" className="text-lg text-gray-300 hover:text-gold-500 cursor-pointer" onClick={() => setIsMobileMenuOpen(false)}>Destinations</a>
              <a href="#quiz" className="text-lg text-gray-300 hover:text-gold-500 cursor-pointer" onClick={() => setIsMobileMenuOpen(false)}>Conseils</a>
              <a href="#contact" className="text-lg text-gray-300 hover:text-gold-500 cursor-pointer" onClick={() => setIsMobileMenuOpen(false)}>Contact</a>
              <button 
                onClick={() => { setIsMobileMenuOpen(false); onBook(); }}
                className="w-full py-4 bg-gold-500 text-black font-bold rounded-xl mt-2 cursor-pointer"
              >
                Réserver mon voyage
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
