import { motion } from 'framer-motion';
import { MapPin, Calendar } from 'lucide-react';

// Import des images locales
import parisImg from '../../assets/images/paris169.png';
import cretaceImg from '../../assets/images/cretace169.png';
import florenceImg from '../../assets/images/florence169.png';

const destinations = [
	{
		id: 1,
		title: 'Paris 1889',
		description:
			"Vivez l'effervescence de l'Exposition Universelle et l'inauguration de la Tour Eiffel.",
		image: parisImg,
		date: '1889',
		location: 'Paris, France',
		price: '2499€',
	},
	{
		id: 2,
		title: 'Crétacé',
		description:
			"Une aventure sauvage au milieu des géants de la préhistoire. Frissons garantis.",
		image: cretaceImg,
		date: '-66M',
		location: 'Pangée',
		price: '3999€',
	},
	{
		id: 3,
		title: 'Florence 1504',
		description:
			"Rencontrez Michel-Ange et Léonard de Vinci au cœur de la Renaissance italienne.",
		image: florenceImg,
		date: '1504',
		location: 'Florence, Italie',
		price: '2899€',
	},
];

export default function Destinations() {
	return (
		<section id="destinations" className="py-20 bg-neutral-950">
			<div className="container mx-auto px-4">
				<div className="text-center mb-16">
					<h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
						Destinations à la Une
					</h2>
					<p className="text-gray-400 max-w-2xl mx-auto">
						Choisissez votre époque et laissez-vous transporter. Nos voyages sont
						conçus pour une immersion totale et sécurisée.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{destinations.map((dest, index) => (
						<motion.div
							key={dest.id}
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: index * 0.2 }}
							className="group relative bg-neutral-900 rounded-2xl overflow-hidden border border-white/10 hover:border-gold-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-gold-500/10"
						>
							<div className="h-64 overflow-hidden">
								<img
									src={dest.image}
									alt={dest.title}
									className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
								/>
							</div>

							<div className="p-6">
								<div className="flex justify-between items-start mb-4">
									<h3 className="text-2xl font-bold text-white group-hover:text-gold-500 transition-colors">
										{dest.title}
									</h3>
									<span className="text-gold-500 font-bold">
										{dest.price}
									</span>
								</div>

								<div className="flex gap-4 text-sm text-gray-500 mb-4">
									<div className="flex items-center gap-1">
										<Calendar className="w-4 h-4" />
										<span>{dest.date}</span>
									</div>
									<div className="flex items-center gap-1">
										<MapPin className="w-4 h-4" />
										<span>{dest.location}</span>
									</div>
								</div>

								<p className="text-gray-400 mb-6 line-clamp-2">
									{dest.description}
								</p>

								<button className="w-full py-3 bg-white/5 hover:bg-gold-500 hover:text-black text-white font-medium rounded-lg transition-all flex justify-center items-center gap-2">
									Voir les détails
								</button>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
