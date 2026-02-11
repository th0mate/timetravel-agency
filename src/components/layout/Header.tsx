import { useState, useEffect } from 'react';
import { Hourglass, Menu, X } from 'lucide-react';

export default function Header() {
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
          <a href="#destinations" className="text-gray-300 hover:text-gold-500 transition-colors">Destinations</a>
          <a href="#about" className="text-gray-300 hover:text-gold-500 transition-colors">L'Agence</a>
          <a href="#contact" className="text-gray-300 hover:text-gold-500 transition-colors">Contact</a>
          <button className="px-6 py-2 bg-gold-500 hover:bg-gold-600 text-black font-bold rounded-full transition-all transform hover:scale-105">
            Réserver
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-lg border-t border-white/10 p-4 flex flex-col gap-4">
          <a href="#destinations" className="text-gray-300 hover:text-gold-500" onClick={() => setIsMobileMenuOpen(false)}>Destinations</a>
          <a href="#about" className="text-gray-300 hover:text-gold-500" onClick={() => setIsMobileMenuOpen(false)}>L'Agence</a>
          <a href="#contact" className="text-gray-300 hover:text-gold-500" onClick={() => setIsMobileMenuOpen(false)}>Contact</a>
          <button className="w-full py-3 bg-gold-500 text-black font-bold rounded-lg">
            Réserver
          </button>
        </div>
      )}
    </header>
  );
}
