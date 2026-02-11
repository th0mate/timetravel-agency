
import { Facebook, Twitter, Instagram, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">TimeTravel<span className="text-gold-500">Agency</span></h3>
            <p className="text-gray-400">
              Redéfinissez le voyage. Explorez l'histoire, vivez l'impossible.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Liens Rapides</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-gold-500 transition-colors">Accueil</a></li>
              <li><a href="#destinations" className="hover:text-gold-500 transition-colors">Destinations</a></li>
              <li><a href="#" className="hover:text-gold-500 transition-colors">A Propos</a></li>
              <li><a href="#" className="hover:text-gold-500 transition-colors">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Mentions Légales</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-gold-500 transition-colors">CGV</a></li>
              <li><a href="#" className="hover:text-gold-500 transition-colors">Politique de Confidentialité</a></li>
              <li><a href="#" className="hover:text-gold-500 transition-colors">Assurance Temporelle</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Suivez-nous</h4>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-gold-500 transition-colors"><Facebook /></a>
              <a href="#" className="text-gray-400 hover:text-gold-500 transition-colors"><Twitter /></a>
              <a href="#" className="text-gray-400 hover:text-gold-500 transition-colors"><Instagram /></a>
              <a href="#" className="text-gray-400 hover:text-gold-500 transition-colors"><Mail /></a>
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
