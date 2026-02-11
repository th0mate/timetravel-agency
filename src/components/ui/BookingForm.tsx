import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Users, Shield, Rocket } from 'lucide-react';

interface BookingFormProps {
  isOpen: boolean;
  onClose: () => void;
  destinationTitle?: string;
}

export default function BookingForm({ isOpen, onClose, destinationTitle }: BookingFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 3000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg bg-neutral-900 border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
          >
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white z-10"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="p-8">
              {isSubmitted ? (
                <div className="py-12 text-center">
                  <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Rocket className="w-10 h-10" />
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-4">Voyage réservé !</h2>
                  <p className="text-gray-400">
                    Votre saut temporel pour <strong>{destinationTitle || 'votre destination'}</strong> est confirmé. Surveillez votre boîte mail pour les instructions de briefing.
                  </p>
                </div>
              ) : (
                <>
                  <div className="mb-8">
                    <h2 className="text-3xl font-bold text-white">Réserver un saut</h2>
                    <p className="text-gold-500">Destination : {destinationTitle || 'Sélectionner une époque'}</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">Prénom</label>
                        <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold-500/50" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">Nom</label>
                        <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold-500/50" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">Email de contact</label>
                      <input required type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold-500/50" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2 relative">
                        <label className="text-xs font-medium text-gray-400 uppercase tracking-wider flex items-center gap-2">
                          <Calendar className="w-3 h-3" /> Date de départ
                        </label>
                        <input required type="date" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold-500/50" />
                      </div>
                      <div className="space-y-2 relative">
                        <label className="text-xs font-medium text-gray-400 uppercase tracking-wider flex items-center gap-2">
                          <Users className="w-3 h-3" /> Voyageurs
                        </label>
                        <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold-500/50 appearance-none">
                          <option value="1">1 Personne</option>
                          <option value="2">2 Personnes</option>
                          <option value="4">Groupe (4+)</option>
                        </select>
                      </div>
                    </div>

                    <div className="p-4 bg-gold-500/10 border border-gold-500/20 rounded-xl flex items-start gap-3">
                      <Shield className="w-5 h-5 text-gold-500 shrink-0 mt-0.5" />
                      <p className="text-xs text-gray-400">
                        Inclus : Assurance contre les paradoxes temporels, tenue d'époque authentique et traducteur universel.
                      </p>
                    </div>

                    <button type="submit" className="w-full py-4 bg-gold-500 hover:bg-gold-600 text-black font-bold rounded-xl transition-all shadow-lg shadow-gold-500/20 mt-4">
                      Confirmer la réservation
                    </button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
