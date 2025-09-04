import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Booking from './components/Booking';
import Contact from './components/Contact';
import Account from './components/Account';
import Footer from './components/Footer';

function App() {
  const [activeSection, setActiveSection] = useState('home');

  const handleBooking = () => {
    setActiveSection('booking');
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'home':
        return (
          <>
            <Hero onBooking={handleBooking} />
            <About />
            <Services onBooking={handleBooking} />
          </>
        );
      case 'services':
        return <Services onBooking={handleBooking} />;
      case 'booking':
        return <Booking />;
      case 'contact':
        return <Contact />;
      case 'account':
        return <Account />;
      default:
        return (
          <>
            <Hero onBooking={handleBooking} />
            <About />
            <Services onBooking={handleBooking} />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header activeSection={activeSection} setActiveSection={setActiveSection} />
      <main>
        {renderSection()}
      </main>
      <Footer />
    </div>
  );
}

export default App;