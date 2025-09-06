import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Check } from 'lucide-react';
import { getServicesFromApi } from '../data/mockData';
import axios from 'axios';
import { apiUrls } from '../utils/api';

const Booking: React.FC = () => {
  const [step, setStep] = useState(1);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [success, setSuccess] = useState(false);

  type Service = {
    id: string;
    name: string;
    description: string;
    price: number;
  };

  const [services, setServices] = useState<Service[]>([]);
  const [bookingData, setBookingData] = useState({
    pickupDate: '',
    pickupTime: '',
    address: '',
    phone: '',
    email: '',
    name: '',
    notes: ''
  });

  useEffect(() => {
    getServicesFromApi().then(setServices);
  }, []);

  const handleServiceToggle = (serviceId: string) => {
    setSelectedServices(prev =>
      prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const nextStep = () => {
    if (step < 4) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const createClient = async () => {
    const nameParts = bookingData.name.trim().split(' ');
    const prenom_client = nameParts.length > 1 ? nameParts.slice(0, -1).join(' ') : nameParts[0];
    const nom_client = nameParts.length > 1 ? nameParts[nameParts.length - 1] : 'Inconnu';

    const clientPayload = {
      nom_client: nom_client.substring(0, 255),
      prenom_client: prenom_client.substring(0, 100),
      email_client: bookingData.email,
      phone_client: bookingData.phone || '00000000',
      adresse_client: bookingData.address || '',
    };

    try {
      console.log('Envoyer client:', clientPayload);
      const res = await axios.post(apiUrls('api/client'), clientPayload, {
        headers: { 'Content-Type': 'application/json' },
      });
      console.log('Réponse API client:', res.data);
      return res.data.id;
    } catch (error: any) {
      if (error.response) {
        console.error('Erreur API:', error.response.status, error.response.data);
        alert(`Erreur création client: ${error.response.data.message || 'Requête invalide'}`);
      } else {
        console.error('Erreur création client:', error.message);
        alert(`Erreur: ${error.message}`);
      }
      throw error;
    }
  };

  const handleConfirm = async () => {
    try {
      const clientId = await createClient();
      const serviceIds = selectedServices.map(id => id);
      const totalAmount = services
        .filter(s => selectedServices.includes(s.id))
        .reduce((total, s) => total + s.price, 0);

      const payload = {
        created_at: bookingData.pickupDate,
        pickup_time: bookingData.pickupTime,
        address: bookingData.address,
        phone: bookingData.phone,
        email: bookingData.email,
        name: bookingData.name,
        notes: bookingData.notes,
        statut_reservation: "en attente",
        montant_total: totalAmount,
        client_id: clientId,
        services: serviceIds,
      };

      console.log('Envoyer réservation:', payload);
      await axios.post(apiUrls("api/reservation"), payload, {
        headers: { 'Content-Type': 'application/json' },
      });
      setSuccess(true);
    } catch (error: any) {
      if (error.response) {
        console.error('Erreur API réservation:', error.response.status, error.response.data);
        alert(`Erreur création réservation: ${error.response.data.message || 'Requête invalide'}`);
      } else {
        console.error('Erreur réservation:', error.message);
        alert(`Erreur : ${error.message}`);
      }
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Choisissez vos services</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {services.map(service => (
                <div
                  key={service.id}
                  className={`p-6 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                    selectedServices.includes(service.id)
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleServiceToggle(service.id)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-900">{service.name}</h4>
                      <p className="text-sm text-gray-600">{service.description}</p>
                      <p className="text-lg font-bold text-blue-600 mt-2">{service.price.toLocaleString()} F</p>
                    </div>
                    {selectedServices.includes(service.id) && <Check className="text-blue-500" size={24} />}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Planifiez votre collecte</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date de collecte</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input
                    type="date"
                    value={bookingData.pickupDate}
                    onChange={(e) => setBookingData({ ...bookingData, pickupDate: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Heure de collecte</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-3 text-gray-400" size={20} />
                  <select
                    value={bookingData.pickupTime}
                    onChange={(e) => setBookingData({ ...bookingData, pickupTime: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Choisir l'heure</option>
                    <option value="08:00">08:00</option>
                    <option value="10:00">10:00</option>
                    <option value="12:00">12:00</option>
                    <option value="14:00">14:00</option>
                    <option value="16:00">16:00</option>
                  </select>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Adresse de collecte</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 text-gray-400" size={20} />
                <textarea
                  value={bookingData.address}
                  onChange={(e) => setBookingData({ ...bookingData, address: e.target.value })}
                  placeholder="Entrez votre adresse complète"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                />
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Vos informations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nom complet</label>
                <input
                  type="text"
                  value={bookingData.name}
                  onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                <input
                  type="tel"
                  value={bookingData.phone}
                  onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={bookingData.email}
                onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Notes spéciales (optionnel)</label>
              <textarea
                value={bookingData.notes}
                onChange={(e) => setBookingData({ ...bookingData, notes: e.target.value })}
                placeholder="Instructions particulières, allergies, etc."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3, 4].map((stepNumber) => (
              <div
                key={stepNumber}
                className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  step >= stepNumber
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {stepNumber}
              </div>
            ))}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 4) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {renderStep()}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={prevStep}
              disabled={step === 1}
              className={`px-6 py-3 rounded-lg font-semibold ${
                step === 1
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
              }`}
            >
              Précédent
            </button>
            <button
              onClick={step === 4 ? handleConfirm : nextStep}
              disabled={step === 4 ? false : step === 4}
              className={`px-6 py-3 rounded-lg font-semibold ${
                step === 4
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {step === 4 ? 'Confirmer et payer' : 'Suivant'}
            </button>
          </div>
        </div>

        {success && (
          <div className="text-green-600 text-center py-8 font-bold mb-4">
            Réservation enregistrée avec succès !
          </div>
        )}
      </div>
    </section>
  );
};

export default Booking;
