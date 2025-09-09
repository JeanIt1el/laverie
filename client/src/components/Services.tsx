// src/components/Services.tsx
import React, { useEffect } from 'react';
import { Shirt, Zap, Sparkles, Clock, Home, Droplets } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllServices } from '../redux/AsyncThunk/ServiceThunk';
import { getServiceState, RootStateType } from '../redux/Store'; // ✅ Import correct
import { ServiceType } from '../types';

const iconMap = {
  Shirt,
  Zap,
  Sparkles,
  Clock,
  Home,
  Droplets,
};

interface ServicesProps {
  onBooking: () => void;
}

const Services: React.FC<ServicesProps> = ({ onBooking }) => {
  const dispatch = useDispatch();
  const { datas: services, action } = useSelector(getServiceState); // ✅ useSelector typé

  useEffect(() => {
    dispatch(getAllServices() as any); // ✅ Cast temporaire pour éviter l'erreur de type
  }, [dispatch]);

  if (action.isLoading) {
    return (
      <div className="py-20 text-center">
        <p className="text-xl text-gray-600">Chargement des services...</p>
      </div>
    );
  }

  return (
    <section className="py-20 bg-gray-50" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Nos Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Des prestations de qualité professionnelle pour prendre soin de vos vêtements
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.length === 0 ? (
            <p className="text-gray-500 text-center col-span-3">
              Aucun service disponible pour le moment.
            </p>
          ) : (
            services.map((service: ServiceType) => {
              const IconComponent = iconMap[service.denomination as keyof typeof iconMap] || Sparkles;
              return (
                <div
                  key={service.id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 p-8"
                >
                  <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-6">
                    <IconComponent className="text-blue-600" size={32} />
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {service.denomination}
                  </h3>

                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {service.description || 'Service professionnel de haute qualité.'}
                  </p>

                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-bold text-blue-600">
                      {service.prix.toLocaleString()} F
                    </span>
                    <span className="text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                      24-48h
                    </span>
                  </div>

                  <button
                    onClick={onBooking}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                  >
                    Choisir ce service
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-blue-600 rounded-3xl p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">
              Besoin d'un service personnalisé ?
            </h3>
            <p className="text-xl text-blue-100 mb-8">
              Contactez-nous pour un devis sur mesure adapté à vos besoins spécifiques
            </p>
            <button className="bg-white text-blue-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-colors duration-200">
              Demander un devis
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;