import { useState, useEffect } from 'react';
import Header from './components/layout/Header';
import Hero from './components/home/Hero';
import Destinations from './components/home/Destinations';
import RecommendationQuiz from './components/home/RecommendationQuiz';
import FAQ from './components/home/FAQ';
import GalleryView from './components/home/GalleryView';
import Footer from './components/layout/Footer';
import Chatbot from './components/ui/Chatbot';
import BookingForm from './components/ui/BookingForm';
import { AnimatePresence } from 'framer-motion';

function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedDest, setSelectedDest] = useState<string | undefined>();
  const [currentView, setCurrentView] = useState<'home' | 'gallery'>('home');
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    let keys = '';
    const handleKeyDown = (e: KeyboardEvent) => {
      keys += e.key.toLowerCase();
      if (keys.endsWith('chronos')) {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 1500);
        keys = '';
      }
      if (keys.length > 20) keys = keys.slice(-10);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const openBooking = (title?: string) => {
    setSelectedDest(title);
    setIsBookingOpen(true);
  };

  return (
    <div className={`min-h-screen bg-neutral-950 text-white selection:bg-gold-500/30 transition-all duration-300 ${isGlitching ? 'invert hue-rotate-180 scale-[1.02] blur-[1px]' : ''}`}>
      {isGlitching && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-red-500/20 pointer-events-none">
          <h1 className="text-4xl md:text-6xl font-black text-white italic animate-ping text-center">ANOMALIE<br/>DÉTECTÉE</h1>
        </div>
      )}
      <Header 
        onBook={() => openBooking()} 
        onGalleryClick={() => setCurrentView('gallery')}
        onHomeClick={() => setCurrentView('home')}
      />
      
      <main>
        <AnimatePresence mode="wait">
          {currentView === 'home' ? (
            <div key="home">
              <Hero onBook={() => openBooking('Votre destination de rêve')} />
              <Destinations onBook={openBooking} />
              <RecommendationQuiz />
              <FAQ />
            </div>
          ) : (
            <GalleryView key="gallery" onBack={() => setCurrentView('home')} />
          )}
        </AnimatePresence>
      </main>

      <Footer />
      <Chatbot />
      
      <BookingForm 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
        destinationTitle={selectedDest}
      />
    </div>
  );
}

export default App;
