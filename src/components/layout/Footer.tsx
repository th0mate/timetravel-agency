
import { Facebook, Twitter, Instagram, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 pt-12 md:pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">TimeTravel<span className="text-gold-500">Agency</span></h3>
            <p className="text-gray-400">
              Redéfinissez le voyage. Explorez l'histoire, vivez l'impossible.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Liens Rapides</h4>
            <ul className="space-y-2 text-gray-400">
              <li><button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="hover:text-gold-500 transition-colors cursor-pointer">Accueil</button></li>
              <li><a href="#destinations" className="hover:text-gold-500 transition-colors cursor-pointer">Destinations</a></li>
              <li><a href="#quiz" className="hover:text-gold-500 transition-colors cursor-pointer">Conseils</a></li>
              <li><a href="#faq" className="hover:text-gold-500 transition-colors cursor-pointer">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Mentions Légales</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-gold-500 transition-colors cursor-pointer">CGV</a></li>
              <li><a href="#" className="hover:text-gold-500 transition-colors cursor-pointer">Politique de Confidentialité</a></li>
              <li><a href="#" className="hover:text-gold-500 transition-colors cursor-pointer">Assurance Temporelle</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Suivez-nous</h4>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-gold-500 transition-colors cursor-pointer"><Facebook /></a>
              <a href="#" className="text-gray-400 hover:text-gold-500 transition-colors cursor-pointer"><Twitter /></a>
              <a href="#" className="text-gray-400 hover:text-gold-500 transition-colors cursor-pointer"><Instagram /></a>
              <a href="#" className="text-gray-400 hover:text-gold-500 transition-colors cursor-pointer"><Mail /></a>
            </div>
          </div>
        </div>
        
        <div className="text-center text-gray-600 text-sm border-t border-white/5 pt-8">
          © 2026 TimeTravel Agency. Tous droits réservés. Voyagez de manière responsable.
        </div>
      </div>
    </footer>
  );
}
