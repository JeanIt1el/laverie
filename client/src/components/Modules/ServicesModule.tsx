import React, { useState } from 'react';
import { Wrench, Plus, Edit, Trash2, Clock, DollarSign, TrendingUp, Package } from 'lucide-react';
import { mockServices } from '../../data/mockData';
import { Service } from '../../types';

interface ServicesModuleProps {
  isDarkMode: boolean;
}

export default function ServicesModule({ isDarkMode }: ServicesModuleProps) {
  const [services, setServices] = useState<Service[]>(mockServices);

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-3 py-1 text-xs font-medium rounded-full";
    return status === 'actif' 
      ? `${baseClasses} ${isDarkMode ? 'bg-emerald-900/50 text-emerald-400' : 'bg-emerald-100 text-emerald-800'}`
      : `${baseClasses} ${isDarkMode ? 'bg-slate-700 text-slate-400' : 'bg-gray-100 text-gray-800'}`;
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Nettoyage Hôtel': 'from-purple-500 to-purple-600',
      'Nettoyage Terrain': 'from-emerald-500 to-teal-600',
      'Nettoyage Bureau': 'from-blue-500 to-indigo-600',
      'Entretien': 'from-orange-500 to-red-600',
    };
    return colors[category as keyof typeof colors] || 'from-gray-500 to-gray-600';
  };

  const formatCurrency = (amount: number) => {
    return `${amount.toLocaleString()} Ar`;
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h${mins > 0 ? ` ${mins}min` : ''}` : `${mins}min`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-2xl font-bold transition-colors ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Gestion des Services
          </h2>
          <p className={`transition-colors ${
            isDarkMode ? 'text-slate-400' : 'text-gray-600'
          }`}>
            Gérez vos offres de services de nettoyage et tarification
          </p>
        </div>
        <button className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Nouveau Service</span>
        </button>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {services.map((service) => (
          <div key={service.id} className={`rounded-xl shadow-sm border p-6 hover:shadow-md transition-all ${
            isDarkMode 
              ? 'bg-slate-800 border-slate-700 hover:shadow-slate-900/20' 
              : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 bg-gradient-to-r ${getCategoryColor(service.category)} rounded-lg flex items-center justify-center`}>
                  <Wrench className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className={`font-semibold transition-colors ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {service.name}
                  </h3>
                  <span className={`text-sm transition-colors ${
                    isDarkMode ? 'text-slate-400' : 'text-gray-500'
                  }`}>
                    {service.category}
                  </span>
                </div>
              </div>
              <div className="flex space-x-1">
                <button className={`p-1 transition-colors ${
                  isDarkMode 
                    ? 'text-slate-400 hover:text-emerald-400' 
                    : 'text-gray-400 hover:text-emerald-600'
                }`}>
                  <Edit className="w-4 h-4" />
                </button>
                <button className={`p-1 transition-colors ${
                  isDarkMode 
                    ? 'text-slate-400 hover:text-red-400' 
                    : 'text-gray-400 hover:text-red-600'
                }`}>
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <p className={`text-sm mb-4 transition-colors ${
              isDarkMode ? 'text-slate-400' : 'text-gray-600'
            }`}>
              {service.description}
            </p>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className={`flex items-center space-x-2 text-sm transition-colors ${
                  isDarkMode ? 'text-slate-400' : 'text-gray-600'
                }`}>
                  <DollarSign className="w-4 h-4" />
                  <span>Tarif</span>
                </div>
                <span className={`text-lg font-semibold transition-colors ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {formatCurrency(service.price)}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className={`flex items-center space-x-2 text-sm transition-colors ${
                  isDarkMode ? 'text-slate-400' : 'text-gray-600'
                }`}>
                  <Clock className="w-4 h-4" />
                  <span>Durée</span>
                </div>
                <span className={`font-medium transition-colors ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {formatDuration(service.duration)}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className={`flex items-center space-x-2 text-sm transition-colors ${
                  isDarkMode ? 'text-slate-400' : 'text-gray-600'
                }`}>
                  <TrendingUp className="w-4 h-4" />
                  <span>Réservations</span>
                </div>
                <span className={`font-medium transition-colors ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {service.bookingCount}
                </span>
              </div>
            </div>

            {/* Equipment List */}
            <div className={`mt-4 pt-4 border-t transition-colors ${
              isDarkMode ? 'border-slate-700' : 'border-gray-100'
            }`}>
              <div className="flex items-center space-x-2 mb-2">
                <Package className={`w-4 h-4 transition-colors ${
                  isDarkMode ? 'text-slate-400' : 'text-gray-500'
                }`} />
                <span className={`text-sm font-medium transition-colors ${
                  isDarkMode ? 'text-slate-300' : 'text-gray-700'
                }`}>
                  Équipements requis:
                </span>
              </div>
              <div className="flex flex-wrap gap-1">
                {service.equipment.map((item, index) => (
                  <span key={index} className={`px-2 py-1 text-xs rounded transition-colors ${
                    isDarkMode 
                      ? 'bg-slate-700 text-slate-400' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className={`mt-4 pt-4 border-t transition-colors ${
              isDarkMode ? 'border-slate-700' : 'border-gray-100'
            }`}>
              <div className="flex items-center justify-between">
                <span className={getStatusBadge(service.status)}>
                  {service.status}
                </span>
                <button className="text-sm text-blue-500 hover:text-blue-600 font-medium transition-colors">
                  Voir Détails
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Service Categories */}
      <div className={`rounded-xl shadow-sm border p-6 transition-colors ${
        isDarkMode 
          ? 'bg-slate-800 border-slate-700' 
          : 'bg-white border-gray-200'
      }`}>
        <h3 className={`text-lg font-semibold mb-4 transition-colors ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Catégories de Services
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {['Nettoyage Hôtel', 'Nettoyage Terrain', 'Nettoyage Bureau', 'Entretien'].map((category) => {
            const categoryServices = services.filter(s => s.category === category);
            const totalBookings = categoryServices.reduce((sum, s) => sum + s.bookingCount, 0);
            const averagePrice = categoryServices.length > 0 
              ? categoryServices.reduce((sum, s) => sum + s.price, 0) / categoryServices.length 
              : 0;
            
            return (
              <div key={category} className={`p-4 border rounded-lg transition-colors ${
                isDarkMode ? 'border-slate-700' : 'border-gray-200'
              }`}>
                <div className={`w-8 h-8 bg-gradient-to-r ${getCategoryColor(category)} rounded-lg flex items-center justify-center mb-3`}>
                  <Wrench className="w-4 h-4 text-white" />
                </div>
                <h4 className={`font-semibold mb-2 transition-colors ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {category}
                </h4>
                <div className={`space-y-1 text-sm transition-colors ${
                  isDarkMode ? 'text-slate-400' : 'text-gray-600'
                }`}>
                  <p>{categoryServices.length} services</p>
                  <p>{totalBookings} réservations</p>
                  <p>Moy. {formatCurrency(Math.round(averagePrice))}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}