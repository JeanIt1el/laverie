// src/App.tsx
import React from 'react';
import { Provider } from 'react-redux'; // ✅ Provider ici
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Pages
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Contact from './components/Contact';
import Login from './components/Login';
import Account from './components/Account';
import Booking from './components/Booking';

// Layout
import Header from './components/Header';
import Footer from './components/Footer';

import { AppInitializer } from './AppInitializer';

// Service
import { authService } from './service/authService';

// Store
import { store } from './redux/Store';
import { setClient } from './redux/Slice/ClientSlice';

function App() {
  const handleAuthClick = () => {
    window.location.href = '/login';
  };

  const handleBookingClick = () => {
    if (authService.isAuthenticated()) {
      window.location.href = '/booking';
    } else {
      window.location.href = '/login';
    }
  };

  return (
    <Provider store={store}>
      <AppInitializer />
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header onAuthClick={handleAuthClick} onBookingClick={handleBookingClick} />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Hero onBooking={handleBookingClick} />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services onBooking={handleBookingClick} />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/account"
                element={authService.isAuthenticated() ? <Account /> : <Navigate to="/login" />}
              />
              <Route
                path="/booking"
                element={authService.isAuthenticated() ? <Booking /> : <Navigate to="/login" />}
              />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

// ✅ Initialise le client depuis localStorage APRÈS que Provider soit actif
// On le fait en dehors du composant, ou via un composant enfant
const initializeApp = () => {
  const client = localStorage.getItem('client');
  if (client) {
    store.dispatch(setClient(JSON.parse(client)));
  }
};

// Appel au chargement
initializeApp();

export default App;