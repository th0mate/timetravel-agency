import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: "Le voyage temporel est-il dangereux ?",
    answer: "Grâce à nos stabilisateurs de flux quantique de dernière génération, le risque est quasi-nul. Nos guides veillent à ce que vous ne marchiez sur aucun insecte préhistorique pour éviter tout effet papillon."
  },
  {
    question: "Puis-je ramener des souvenirs ?",
    answer: "Uniquement des souvenirs immatériels et des photos (via nos appareils photo temporels certifiés). Tout objet physique provenant du passé est strictement interdit par la Convention Temporelle de 2042."
  },
  {
    question: "Que se passe-t-il si je croise mon double du passé ?",
    answer: "C'est une situation de niveau 5. Nos protocoles prévoient une évacuation immédiate. Mais rassurez-vous, nos itinéraires sont calculés pour éviter toute collision avec votre propre ligne de vie."
  },
  {
    question: "Quelles monnaies sont acceptées ?",
    answer: "Nous acceptons les Euros, Bitcoins et Crédits Galactiques. Sur place, nous vous fournirons une bourse de monnaie d'époque (Sesterces, Florins, etc.) pour vos dépenses locales."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 bg-neutral-950">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-500 text-sm font-medium mb-4">
            <HelpCircle className="w-4 h-4" />
            <span>Des questions ?</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Questions Fréquentes</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="border border-white/10 rounded-2xl overflow-hidden bg-neutral-900/50 backdrop-blur-sm"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full p-6 text-left flex items-center justify-between group cursor-pointer"
              >
                <span className="text-lg font-semibold text-white group-hover:text-gold-500 transition-colors">
                  {faq.question}
                </span>
                <ChevronDown 
                  className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180 text-gold-500' : ''
                  }`} 
                />
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-6 text-gray-400 leading-relaxed border-t border-white/5 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
