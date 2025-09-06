// src/App.tsx
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

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

// Service (✅ Correction : 'services', pas 'service')
import { authService } from './service/authService'; // ✅

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

            {/* Routes protégées */}
            <Route
              path="/account"
              element={authService.isAuthenticated() ? <Account /> : <Navigate to="/login" />}
            />
            <Route
              path="/booking"
              element={authService.isAuthenticated() ? <Booking /> : <Navigate to="/login" />}
            />

            {/* Redirection par défaut */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;