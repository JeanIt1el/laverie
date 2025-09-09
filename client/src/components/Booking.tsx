// src/components/Booking.tsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Calendar, Clock, MapPin, Check } from 'lucide-react';

// ✅ Bon chemin : dans le dossier redux
import { createReservation } from '../redux/AsyncThunk/ReservationThunk';
import { getAllServices } from '../redux/AsyncThunk/ServiceThunk';
import { getServiceState, getClientState } from '../redux/Store';
import { ServiceType } from '../types';

const Booking = () => {
  const dispatch = useDispatch();
  const { datas: services, action } = useSelector(getServiceState);
  const {  data:client } = useSelector(getClientState);

  const [step, setStep] = useState(1);
  const [selectedServices, setSelectedServices] = useState<number[]>([]);
  const [bookingData, setBookingData] = useState({
    pickupDate: '',
    pickupTime: '',
    address: '',
    phone: '',
    email: '',
    name: '',
    notes: '',
  });

  // 🔁 Charger les services au montage
  useEffect(() => {
    if (services.length === 0 && !action.isLoading) {
      console.log('Chargement des services...');
      dispatch(getAllServices() as any);
    }
  }, [dispatch, services, action.isLoading]);

  // 🔄 Pré-remplir les infos du client
  useEffect(() => {
    if (client) {
      setBookingData((prev) => ({
        ...prev,
        name: `${client.prenom_client} ${client.nom_client}`,
        email: client.email_client,
        phone: client.phone_client,
        address: client.adresse_client,
      }));
    }
    
  }, [client]);
  useEffect(() => {
    console.log('Client dans le store:', client);
  }, [client]);

  const handleServiceToggle = (serviceId: number) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const calculateTotal = () => {
    return services
      .filter((s) => selectedServices.includes(s.id))
      .reduce((total, s) => total + s.prix, 0);
  };

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    if (!client) {
      alert('Vous devez être connecté pour réserver.');
      window.location.href = '/login';
      return;
    }

    if (selectedServices.length === 0) {
      alert('Veuillez sélectionner au moins un service.');
      return;
    }

    const reservationData = {
      client_id: client.id,
      statut_reservation: 'pending',
      montant_total: calculateTotal(),
      created_at: new Date().toISOString().split('T')[0],
      services: selectedServices,
    };

    console.log('Données envoyées:', reservationData); // 🔍 Debug

    dispatch(createReservation(reservationData) as any);
    alert('Réservation créée avec succès !');
    window.location.href = '/account';
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3].map((stepNumber) => (
              <div
                key={stepNumber}
                className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  step >= stepNumber ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}
              >
                {stepNumber}
              </div>
            ))}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* 🔁 Étape 1 : Sélection des services */}
          {action.isLoading && step === 1 ? (
            <p className="text-center text-lg text-gray-600">Chargement des services...</p>
          ) : services.length === 0 && step === 1 ? (
            <p className="text-center text-lg text-red-600">Aucun service disponible.</p>
          ) : step === 1 ? (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Choisissez vos services</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {services.map((service) => (
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
                        <h4 className="font-semibold text-gray-900">{service.denomination}</h4>
                        <p className="text-sm text-gray-600">{service.description}</p>
                        <p className="text-lg font-bold text-blue-600 mt-2">
                          {service.prix.toLocaleString()} F
                        </p>
                      </div>
                      {selectedServices.includes(service.id) && (
                        <Check className="text-blue-500" size={24} />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {/* Étape 2 : Planification */}
          {step === 2 && (
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
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg"
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
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg"
                    >
                      <option value="">Choisir l'heure</option>
                      <option value="08:00">08:00</option>
                      <option value="10:00">10:00</option>
                      <option value="12:00">12:00</option>
                      <option value="14:00">14:00</option>
                      <option value="16:00">16:00</option>
                      <option value="18:00">18:00</option>
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
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg"
                    rows={3}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Étape 3 : Informations */}
          {step === 3 && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Vos informations</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nom complet</label>
                  <input
                    type="text"
                    value={bookingData.name}
                    onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                  <input
                    type="tel"
                    value={bookingData.phone}
                    onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={bookingData.email}
                  onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Notes spéciales (optionnel)</label>
                <textarea
                  value={bookingData.notes}
                  onChange={(e) => setBookingData({ ...bookingData, notes: e.target.value })}
                  placeholder="Instructions particulières, allergies, etc."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  rows={3}
                />
              </div>
            </div>
          )}

          {/* Boutons de navigation */}
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
              onClick={step === 3 ? handleSubmit : nextStep}
              className="px-6 py-3 rounded-lg font-semibold bg-blue-600 text-white hover:bg-blue-700"
            >
              {step === 3 ? 'Confirmer la réservation' : 'Suivant'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Booking;