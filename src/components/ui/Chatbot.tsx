import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type Message = {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Bonjour ! Je suis Chronos, votre guide temporel. Quelle époque souhaitez-vous découvrir aujourd'hui ?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulation of AI response (Placeholder for actual API integration)
    setTimeout(() => {
      let botResponseText = "Intéressant ! Dites-m'en plus.";
      const lowerInput = userMessage.text.toLowerCase();

      if (lowerInput.includes('paris') || lowerInput.includes('1889')) {
        botResponseText = "Ah, Paris en 1889 ! L'Exposition Universelle est magnifique. Vous pourrez monter dans la toute nouvelle Tour Eiffel. Souhaitez-vous voir les disponibilités ?";
      } else if (lowerInput.includes('dino') || lowerInput.includes('cretace')) {
        botResponseText = "Le Crétacé est une destination pour les aventuriers. Attention aux T-Rex ! Nous avons des capsules de sécurité renforcées. Cela vous tente ?";
      } else if (lowerInput.includes('florence') || lowerInput.includes('art')) {
        botResponseText = "Florence en 1504 est le berceau de la beauté. Vous pourriez croiser Michel-Ange finissant son David. Une époque inspirante.";
      } else if (lowerInput.includes('prix') || lowerInput.includes('tarif')) {
        botResponseText = "Nos voyages commencent à partir de 2499€. Le prix inclut le transport temporel, l'hébergement d'époque et l'assurance paradoxe.";
      } else if (lowerInput.includes('bonjour') || lowerInput.includes('salut')) {
        botResponseText = "Salutations voyageur ! Prêt à traverser les âges ?";
      }

      const botMessage: Message = {
        id: messages.length + 2,
        text: botResponseText,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="mb-4 w-80 md:w-96 bg-neutral-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[500px]"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-neutral-800 to-neutral-900 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gold-500 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-black" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">Chronos AI</h3>
                  <p className="text-xs text-gold-500">Guide Temporel</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[300px] bg-neutral-950/50">
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                      msg.sender === 'user' 
                        ? 'bg-gold-500 text-black rounded-tr-none' 
                        : 'bg-neutral-800 text-gray-200 rounded-tl-none border border-white/5'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-neutral-800 p-3 rounded-2xl rounded-tl-none border border-white/5 flex gap-1">
                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                    <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-neutral-900 border-t border-white/10">
              <div className="flex items-center gap-2 relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Posez une question..."
                  className="w-full bg-neutral-800 text-white placeholder-gray-500 rounded-full py-3 px-4 focus:outline-none focus:ring-1 focus:ring-gold-500/50 border border-transparent focus:border-gold-500/30 text-sm"
                />
                <button 
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="absolute right-2 p-2 bg-gold-500 text-black rounded-full hover:bg-gold-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-gold-500 hover:bg-gold-600 text-black rounded-full shadow-lg shadow-gold-500/20 flex items-center justify-center transition-all"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </motion.button>
    </div>
  );
}
