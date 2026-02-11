
import Header from './components/layout/Header';
import Hero from './components/home/Hero';
import Destinations from './components/home/Destinations';
import Footer from './components/layout/Footer';
import Chatbot from './components/ui/Chatbot';

function App() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white selection:bg-gold-500/30">
      <Header />
      <main>
        <Hero />
        <Destinations />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}

export default App;
