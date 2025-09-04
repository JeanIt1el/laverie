import React from 'react';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4">CleanCare</h3>
            <p className="text-gray-400 mb-6">
              Votre partenaire de confiance pour un linge impeccable. 
              Service de qualité, livraison gratuite.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={24} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Lavage Standard</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Repassage</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Nettoyage à Sec</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Lavage Express</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Traitement Taches</a></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Liens rapides</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">À propos</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Zone de couverture</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Tarifs</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone size={18} className="text-gray-400" />
                <span className="text-gray-400">+225 01 02 03 04 05</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={18} className="text-gray-400" />
                <span className="text-gray-400">contact@cleancare.ci</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin size={18} className="text-gray-400 mt-1" />
                <span className="text-gray-400">
                  123 Boulevard Lagunaire<br />
                  Cocody, Abidjan
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 CleanCare. Tous droits réservés.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Mentions légales
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Politique de confidentialité
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                CGU
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;