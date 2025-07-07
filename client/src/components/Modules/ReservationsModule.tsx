import React, { useState } from 'react';
import { Calendar, Clock, User, MapPin, DollarSign, Filter, Ruler } from 'lucide-react';
import { mockReservations } from '../../data/mockData';
import { Reservation } from '../../types';

interface ReservationsModuleProps {
  isDarkMode: boolean;
}

export default function ReservationsModule({ isDarkMode }: ReservationsModuleProps) {
  const [reservations, setReservations] = useState<Reservation[]>(mockReservations);
  const [filterStatus, setFilterStatus] = useState<'all' | 'confirme' | 'en-attente' | 'annule' | 'termine'>('all');

  const filteredReservations = reservations.filter(reservation => 
    filterStatus === 'all' || reservation.status === filterStatus
  );

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-3 py-1 text-xs font-medium rounded-full";
    switch (status) {
      case 'confirme':
        return `${baseClasses} ${isDarkMode ? 'bg-emerald-900/50 text-emerald-400' : 'bg-emerald-100 text-emerald-800'}`;
      case 'en-attente':
        return `${baseClasses} ${isDarkMode ? 'bg-yellow-900/50 text-yellow-400' : 'bg-yellow-100 text-yellow-800'}`;
      case 'annule':
        return `${baseClasses} ${isDarkMode ? 'bg-red-900/50 text-red-400' : 'bg-red-100 text-red-800'}`;
      case 'termine':
        return `${baseClasses} ${isDarkMode ? 'bg-blue-900/50 text-blue-400' : 'bg-blue-100 text-blue-800'}`;
      default:
        return `${baseClasses} ${isDarkMode ? 'bg-slate-700 text-slate-400' : 'bg-gray-100 text-gray-800'}`;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
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
            Gestion des Réservations
          </h2>
          <p className={`transition-colors ${
            isDarkMode ? 'text-slate-400' : 'text-gray-600'
          }`}>
            Gérez les contrats de nettoyage et interventions
          </p>
        </div>
        <button className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all flex items-center space-x-2">
          <Calendar className="w-4 h-4" />
          <span>Nouvelle Réservation</span>
        </button>
      </div>

      {/* Calendar View Toggle */}
      <div className={`rounded-xl shadow-sm border p-6 transition-colors ${
        isDarkMode 
          ? 'bg-slate-800 border-slate-700' 
          : 'bg-white border-gray-200'
      }`}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex space-x-4">
            <button className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg">Vue Liste</button>
            <button className={`px-4 py-2 rounded-lg transition-colors ${
              isDarkMode 
                ? 'text-slate-400 hover:bg-slate-700' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}>
              Vue Calendrier
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <Filter className={`w-4 h-4 transition-colors ${
              isDarkMode ? 'text-slate-400' : 'text-gray-400'
            }`} />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className={`px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors ${
                isDarkMode 
                  ? 'bg-slate-700 border-slate-600 text-white' 
                  : 'bg-white border-gray-200 text-gray-900'
              }`}
            >
              <option value="all">Tous les statuts</option>
              <option value="confirme">Confirmé</option>
              <option value="en-attente">En Attente</option>
              <option value="annule">Annulé</option>
              <option value="termine">Terminé</option>
            </select>
          </div>
        </div>

        {/* Reservations List */}
        <div className="space-y-4">
          {filteredReservations.map((reservation) => (
            <div key={reservation.id} className={`border rounded-lg p-6 hover:shadow-md transition-all ${
              isDarkMode 
                ? 'border-slate-700 hover:shadow-slate-900/20' 
                : 'border-gray-200'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className={`font-semibold transition-colors ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {reservation.serviceName}
                    </h3>
                    <p className={`transition-colors ${
                      isDarkMode ? 'text-slate-400' : 'text-gray-600'
                    }`}>
                      {reservation.clientName}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={getStatusBadge(reservation.status)}>
                    {reservation.status}
                  </span>
                  <span className={`text-lg font-semibold transition-colors ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {formatCurrency(reservation.totalAmount)}
                  </span>
                </div>
              </div>

              <div className={`grid grid-cols-1 md:grid-cols-4 gap-4 text-sm transition-colors ${
                isDarkMode ? 'text-slate-400' : 'text-gray-600'
              }`}>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(reservation.date)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>{reservation.time} ({formatDuration(reservation.duration)})</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>{reservation.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Ruler className="w-4 h-4" />
                  <span>{reservation.surface} m²</span>
                </div>
              </div>

              <div className="flex justify-end space-x-2 mt-4">
                <button className="px-4 py-2 text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-lg transition-colors">
                  Voir Détails
                </button>
                <button className="px-4 py-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                  Modifier
                </button>
                {reservation.status === 'en-attente' && (
                  <button className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg hover:shadow-lg transition-all">
                    Confirmer
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}