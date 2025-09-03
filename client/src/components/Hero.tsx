import React from 'react';
import { Play, Shield, Clock, Truck, Star } from 'lucide-react';

interface HeroProps {
  onBooking: () => void;
}

const Hero: React.FC<HeroProps> = ({ onBooking }) => {
  return (
    <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-cyan-400 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-blue-400 rounded-full opacity-10 animate-bounce"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="text-yellow-400 fill-current" size={20} />
                ))}
              </div>
              <span className="text-blue-100">4.8/5 - Plus de 1000 clients satisfaits</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              <span className="block">CleanCare</span>
              <span className="block text-cyan-300">Votre linge,</span>
              <span className="block text-cyan-300">notre expertise</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-100 leading-relaxed">
              Service de nettoyage professionnel à domicile à Abidjan. 
              Collecte et livraison gratuites, qualité garantie, délais respectés.
            </p>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-lg font-semibold mb-3">🎉 Offre de lancement :</h3>
              <p className="text-blue-100">
                <strong>-20% sur votre première commande</strong> avec le code <span className="bg-cyan-500 px-2 py-1 rounded font-mono">WELCOME20</span>
              </p>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onBooking}
                className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
              >
                <span>Réserver Maintenant</span>
                <span className="text-2xl">🚀</span>
              </button>
              <button className="flex items-center justify-center space-x-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300">
                <Play size={20} />
                <span>Voir Notre Vidéo</span>
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                  <Shield className="text-cyan-300" size={24} />
                </div>
                <div>
                  <p className="font-semibold">Garantie Qualité</p>
                  <p className="text-blue-200 text-sm">100% satisfait ou remboursé</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                  <Clock className="text-cyan-300" size={24} />
                </div>
                <div>
                  <p className="font-semibold">Délais Respectés</p>
                  <p className="text-blue-200 text-sm">Livraison dans les temps</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                  <Truck className="text-cyan-300" size={24} />
                </div>
                <div>
                  <p className="font-semibold">Livraison Gratuite</p>
                  <p className="text-blue-200 text-sm">Dans toute notre zone</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Image */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl transform rotate-3"></div>
            <img
              src="https://images.pexels.com/photos/5591581/pexels-photo-5591581.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Service de nettoyage professionnel CleanCare"
              className="relative rounded-2xl shadow-2xl w-full h-96 object-cover"
            />
            
            {/* Floating testimonial */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-lg p-4 shadow-xl max-w-xs">
              <div className="flex items-center space-x-2 mb-2">
                <img
                  src="https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=100"
                  alt="Client satisfait"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-gray-900 text-sm">Marie D.</p>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="text-yellow-400 fill-current" size={12} />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 text-sm">"Service exceptionnel ! Je recommande vivement."</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;