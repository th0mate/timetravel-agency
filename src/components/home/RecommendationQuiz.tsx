import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, RefreshCw, CheckCircle2 } from 'lucide-react';

// Import des images locales
import parisImg from '../../assets/images/paris916.png';
import cretaceImg from '../../assets/images/cretace916.png';
import florenceImg from '../../assets/images/florence916.png';

const questions = [
  {
    id: 1,
    question: "Quel type d'expérience recherchez-vous ?",
    options: [
      { label: "Culturelle et artistique", value: "florence" },
      { label: "Aventure et nature sauvage", value: "cretace" },
      { label: "Élégance et raffinement", value: "paris" }
    ]
  },
  {
    id: 2,
    question: "Quelle est votre période préférée ?",
    options: [
      { label: "Temps anciens et origines", value: "cretace" },
      { label: "Renaissance et classicisme", value: "florence" },
      { label: "Histoire moderne (XIXe siècle)", value: "paris" }
    ]
  },
  {
    id: 3,
    question: "Qu'est-ce que vous préférez ?",
    options: [
      { label: "L'art et l'architecture", value: "florence" },
      { label: "La nature sauvage", value: "cretace" },
      { label: "L'effervescence urbaine", value: "paris" }
    ]
  }
];

const results = {
  paris: {
    title: "Paris 1889",
    description: "Vous êtes fait pour la Belle Époque ! L'Exposition Universelle et l'élégance parisienne n'attendent que vous.",
    image: parisImg
  },
  cretace: {
    title: "Le Crétacé",
    description: "L'explorateur en vous a parlé. Préparez-vous à rencontrer les géants de la Terre dans une nature brute.",
    image: cretaceImg
  },
  florence: {
    title: "Florence 1504",
    description: "Votre âme d'artiste s'épanouira dans la Florence de la Renaissance, aux côtés des plus grands génies.",
    image: florenceImg
  }
};

export default function RecommendationQuiz() {
  const [currentStep, setCurrentStep] = useState(0); // 0: Start, 1-3: Questions, 4: Result
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<keyof typeof results | null>(null);

  const handleAnswer = (value: string) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);
    
    if (currentStep < questions.length) {
      setCurrentStep(currentStep + 1);
    } else {
      calculateResult(newAnswers);
    }
  };

  const calculateResult = (finalAnswers: string[]) => {
    const counts = finalAnswers.reduce((acc, val) => {
      acc[val] = (acc[val] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const winner = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b) as keyof typeof results;
    setResult(winner);
    setCurrentStep(questions.length + 1);
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setAnswers([]);
    setResult(null);
  };

  return (
    <section id="quiz" className="py-20 bg-neutral-900">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto bg-neutral-950 border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
          <AnimatePresence mode="wait">
            {currentStep === 0 && (
              <motion.div 
                key="start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gold-500/20 text-gold-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="w-8 h-8" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Trouvez votre époque idéale</h2>
                <p className="text-gray-400 mb-8">
                  Répondez à 3 questions rapides et notre IA Chronos vous recommandera la destination temporelle parfaite pour vous.
                </p>
                <button 
                  onClick={() => setCurrentStep(1)}
                  className="px-8 py-4 bg-gold-500 hover:bg-gold-600 text-black font-bold rounded-full transition-all flex items-center gap-2 mx-auto cursor-pointer"
                >
                  Commencer le quiz
                  <ArrowRight className="w-5 h-5" />
                </button>
              </motion.div>
            )}

            {currentStep > 0 && currentStep <= questions.length && (
              <motion.div 
                key={`q-${currentStep}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="flex justify-between items-center mb-8">
                  <span className="text-gold-500 font-medium uppercase tracking-wider text-sm">Question {currentStep} / {questions.length}</span>
                  <div className="flex gap-1">
                    {[1, 2, 3].map(i => (
                      <div key={i} className={`h-1 w-8 rounded-full ${i <= currentStep ? 'bg-gold-500' : 'bg-white/10'}`}></div>
                    ))}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-8">{questions[currentStep-1].question}</h3>
                <div className="grid gap-4">
                  {questions[currentStep-1].options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(option.value)}
                      className="w-full p-4 text-left bg-white/5 hover:bg-white/10 border border-white/10 hover:border-gold-500/50 rounded-xl text-white transition-all group flex items-center justify-between cursor-pointer"
                    >
                      {option.label}
                      <CheckCircle2 className="w-5 h-5 opacity-0 group-hover:opacity-100 text-gold-500 transition-opacity" />
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {currentStep > questions.length && result && (
              <motion.div 
                key="result"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <span className="text-gold-500 font-medium uppercase tracking-wider text-sm mb-2 block">Votre destination idéale est...</span>
                <h2 className="text-4xl font-bold text-white mb-6">{results[result].title}</h2>
                <div className="relative h-64 rounded-2xl overflow-hidden mb-6 border border-white/10">
                  <img src={results[result].image} alt={results[result].title} className="w-full h-full object-cover" />
                </div>
                <p className="text-gray-300 text-lg mb-8">
                  {results[result].description}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="px-8 py-3 bg-gold-500 hover:bg-gold-600 text-black font-bold rounded-full transition-all cursor-pointer">
                    Réserver maintenant
                  </button>
                  <button 
                    onClick={resetQuiz}
                    className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-full transition-all flex items-center gap-2 justify-center cursor-pointer"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Recommencer
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
