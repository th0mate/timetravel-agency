
import { useState } from 'react';
import Header from './components/layout/Header';
import Hero from './components/home/Hero';
import Destinations from './components/home/Destinations';
import RecommendationQuiz from './components/home/RecommendationQuiz';
import FAQ from './components/home/FAQ';
import Footer from './components/layout/Footer';
import Chatbot from './components/ui/Chatbot';
import BookingForm from './components/ui/BookingForm';

function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedDest, setSelectedDest] = useState<string | undefined>();

  const openBooking = (title?: string) => {
    setSelectedDest(title);
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white selection:bg-gold-500/30">
      <Header onBook={() => openBooking()} />
      <main>
        <Hero onBook={() => openBooking('Votre destination de rêve')} />
        <Destinations onBook={openBooking} />
        <RecommendationQuiz />
        <FAQ />
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
