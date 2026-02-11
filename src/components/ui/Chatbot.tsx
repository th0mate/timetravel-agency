import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mistral } from '@mistralai/mistralai';
import ReactMarkdown from 'react-markdown';

const apiKey = import.meta.env.VITE_MISTRAL_API_KEY || '';
const client = apiKey ? new Mistral({ apiKey }) : null;

type Message = {
  id: number;
  text: string;
  sender: 'user' | 'bot';
};

const SYSTEM_PROMPT = `
Tu es l'assistant virtuel de TimeTravel Agency, une agence de voyage temporel de luxe.
Ton nom est Chronos.
Ton rôle : conseiller les clients sur les meilleures destinations temporelles.

Ton ton :
- Professionnel mais chaleureux.
- Passionné d'histoire.
- Toujours enthousiaste sans être trop familier.
- Expertise en voyage temporel (fictif mais crédible).

Tes connaissances sur les destinations :
1. Paris 1889 (Belle Époque, Tour Eiffel, Exposition Universelle). Prix: 2499€.
2. Crétacé (-65M d'années, dinosaures, nature préhistorique). Prix: 3999€.
3. Florence 1504 (Renaissance, art, Michel-Ange, Léonard de Vinci). Prix: 2899€.

Instructions importantes :
- Si on te demande le prix, invente des détails sur les services inclus (assurance paradoxe, tenue d'époque).
- Tu peux suggérer une destination selon les intérêts du client (art -> Florence, aventure -> Crétacé, technologie -> Paris).
- Reste concis dans tes réponses (max 3-4 phrases).
`;

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Bonjour ! Je suis Chronos, votre guide temporel. Quelle époque souhaitez-vous explorer ?",
      sender: 'bot'
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
      id: Date.now(),
      text: input,
      sender: 'user'
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      let botResponseText = "";

      if (client) {
        const response = await client.chat.complete({
          model: "mistral-tiny",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...messages.map(m => ({ 
              role: m.sender === 'user' ? "user" as const : "assistant" as const, 
              content: m.text 
            })),
            { role: "user", content: input }
          ],
        });
        botResponseText = response.choices?.[0]?.message?.content?.toString() || "Désolé, j'ai eu un petit problème de condensateur de flux.";
      } else {
        // Fallback si pas de clé API
        botResponseText = "Le système de communication temporel est hors ligne (Clé API manquante). Mais sachez que Paris 1889 est magnifique en cette saison !";
      }

      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: botResponseText,
        sender: 'bot'
      }]);
    } catch (error) {
      console.error("Erreur Chatbot:", error);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: "Une perturbation temporelle m'empêche de répondre. Réessayez dans un instant.",
        sender: 'bot'
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="mb-4 w-[calc(100vw-2rem)] sm:w-80 md:w-96 bg-neutral-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[70vh] md:max-h-[500px]"
          >
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
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[300px] bg-neutral-950/50">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    msg.sender === 'user' ? 'bg-gold-500 text-black' : 'bg-neutral-800 text-gray-200 border border-white/5'
                  }`}>
                    {msg.sender === 'bot' ? (
                      <div className="prose prose-invert prose-sm max-w-none">
                        <ReactMarkdown>
                          {msg.text}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      msg.text
                    )}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start italic text-xs text-gray-500 animate-pulse">Chronos réfléchit...</div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 bg-neutral-900 border-t border-white/10">
              <div className="flex gap-2 relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Posez votre question..."
                  className="w-full bg-neutral-800 text-white rounded-full py-2 px-4 focus:outline-none focus:ring-1 focus:ring-gold-500/50 text-sm"
                />
                <button onClick={handleSend} disabled={!input.trim()} className="p-2 bg-gold-500 text-black rounded-full hover:bg-gold-600 disabled:opacity-50 cursor-pointer">
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
        className="w-14 h-14 bg-gold-500 text-black rounded-full shadow-lg flex items-center justify-center cursor-pointer"
      >
        <MessageCircle />
      </motion.button>
    </div>
  );
}
