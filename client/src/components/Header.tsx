// src/components/Header.tsx
import React, { useState } from 'react';
import { Menu, X, User } from 'lucide-react';
import { authService } from '../service/authService'; // ✅ Importe authService

interface HeaderProps {
  onAuthClick: () => void;
  onBookingClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAuthClick, onBookingClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Détermine si l'utilisateur est connecté
  const isAuthenticated = authService.isAuthenticated();

  // Action quand on clique sur "Mon Compte" ou "Connexion"
  const handleAccountClick = () => {
    if (isAuthenticated) {
      window.location.href = '/account';
    } else {
      onAuthClick();
    }
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-blue-600">Madio</h1>
          </div>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex space-x-8">
            <a href="/" className="text-gray-700 hover:text-blue-600 font-medium">Accueil</a>
            <a href="/about" className="text-gray-700 hover:text-blue-600 font-medium">À propos</a>
            <a href="/services" className="text-gray-700 hover:text-blue-600 font-medium">Services</a>
            <a href="/contact" className="text-gray-700 hover:text-blue-600 font-medium">Contact</a>
            <button
              onClick={onBookingClick}
              className="text-green-600 font-semibold"
            >
              Réserver
            </button>
            <button
              onClick={handleAccountClick}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              <User size={16} />
              <span>{isAuthenticated ? 'Mon Compte' : 'Connexion'}</span>
            </button>
          </nav>

          {/* Bouton menu mobile */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Menu mobile */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="/" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-gray-700">Accueil</a>
              <a href="/about" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-gray-700">À propos</a>
              <a href="/services" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-gray-700">Services</a>
              <a href="/contact" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-gray-700">Contact</a>
              <button
                onClick={() => { onBookingClick(); setIsMenuOpen(false); }}
                className="w-full text-left px-3 py-2 text-green-600"
              >
                Réserver
              </button>
              <button
                onClick={() => { handleAccountClick(); setIsMenuOpen(false); }}
                className="w-full text-left px-3 py-2 mt-2 bg-blue-600 text-white rounded-lg"
              >
                {isAuthenticated ? 'Mon Compte' : 'Connexion'}
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;