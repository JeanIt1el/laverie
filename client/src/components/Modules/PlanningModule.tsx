import React, { useState } from 'react';
import { Clock, Calendar, User, MapPin, Filter, Plus, Users, Package } from 'lucide-react';
import { mockPlanning } from '../../data/mockData';
import { Planning } from '../../types';

interface PlanningModuleProps {
  isDarkMode: boolean;
}

export default function PlanningModule({ isDarkMode }: PlanningModuleProps) {
  const [planning, setPlanning] = useState<Planning[]>(mockPlanning);
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const [filterEmployee, setFilterEmployee] = useState<string>('all');

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-3 py-1 text-xs font-medium rounded-full";
    switch (status) {
      case 'planifie':
        return `${baseClasses} ${isDarkMode ? 'bg-blue-900/50 text-blue-400' : 'bg-blue-100 text-blue-800'}`;
      case 'en-cours':
        return `${baseClasses} ${isDarkMode ? 'bg-yellow-900/50 text-yellow-400' : 'bg-yellow-100 text-yellow-800'}`;
      case 'termine':
        return `${baseClasses} ${isDarkMode ? 'bg-emerald-900/50 text-emerald-400' : 'bg-emerald-100 text-emerald-800'}`;
      case 'annule':
        return `${baseClasses} ${isDarkMode ? 'bg-red-900/50 text-red-400' : 'bg-red-100 text-red-800'}`;
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

  const getTimeSlot = (startTime: string, endTime: string) => {
    return `${startTime} - ${endTime}`;
  };

  const employees = [...new Set(planning.map(p => p.employeeName))];

  const filteredPlanning = planning.filter(item => 
    filterEmployee === 'all' || item.employeeName === filterEmployee
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-2xl font-bold transition-colors ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Planning & Planification
          </h2>
          <p className={`transition-colors ${
            isDarkMode ? 'text-slate-400' : 'text-gray-600'
          }`}>
            Gérez les plannings et l'allocation des ressources
          </p>
        </div>
        <button className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Planifier Intervention</span>
        </button>
      </div>

      {/* View Controls */}
      <div className={`rounded-xl shadow-sm border p-6 transition-colors ${
        isDarkMode 
          ? 'bg-slate-800 border-slate-700' 
          : 'bg-white border-gray-200'
      }`}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex space-x-4">
            <button 
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                viewMode === 'list' 
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white' 
                  : isDarkMode
                    ? 'text-slate-400 hover:bg-slate-700'
                    : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Vue Liste
            </button>
            <button 
              onClick={() => setViewMode('calendar')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                viewMode === 'calendar' 
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white' 
                  : isDarkMode
                    ? 'text-slate-400 hover:bg-slate-700'
                    : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Vue Calendrier
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <Filter className={`w-4 h-4 transition-colors ${
              isDarkMode ? 'text-slate-400' : 'text-gray-400'
            }`} />
            <select 
              value={filterEmployee}
              onChange={(e) => setFilterEmployee(e.target.value)}
              className={`px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors ${
                isDarkMode 
                  ? 'bg-slate-700 border-slate-600 text-white' 
                  : 'bg-white border-gray-200 text-gray-900'
              }`}
            >
              <option value="all">Tous les Employés</option>
              {employees.map(emp => (
                <option key={emp} value={emp}>{emp}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Today's Schedule */}
        <div className="mb-6">
          <h3 className={`text-lg font-semibold mb-4 transition-colors ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Planning d'Aujourd'hui
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPlanning.filter(p => p.date === '2024-01-18').map((appointment) => (
              <div key={appointment.id} className={`border rounded-lg p-4 hover:shadow-md transition-all ${
                isDarkMode 
                  ? 'border-slate-700 hover:shadow-slate-900/20' 
                  : 'border-gray-200'
              }`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-indigo-500" />
                    <span className={`font-medium transition-colors ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {getTimeSlot(appointment.startTime, appointment.endTime)}
                    </span>
                  </div>
                  <span className={getStatusBadge(appointment.status)}>
                    {appointment.status}
                  </span>
                </div>
                <div className="space-y-2">
                  <div className={`flex items-center space-x-2 transition-colors ${
                    isDarkMode ? 'text-slate-400' : 'text-gray-600'
                  }`}>
                    <User className="w-4 h-4" />
                    <span className="text-sm">{appointment.employeeName}</span>
                  </div>
                  <div className={`text-sm font-medium transition-colors ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {appointment.serviceName}
                  </div>
                  <div className={`text-sm transition-colors ${
                    isDarkMode ? 'text-slate-400' : 'text-gray-600'
                  }`}>
                    {appointment.clientName}
                  </div>
                  <div className={`flex items-center space-x-2 transition-colors ${
                    isDarkMode ? 'text-slate-400' : 'text-gray-600'
                  }`}>
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{appointment.location}</span>
                  </div>
                  <div className={`flex items-center space-x-2 transition-colors ${
                    isDarkMode ? 'text-slate-400' : 'text-gray-600'
                  }`}>
                    <Users className="w-4 h-4" />
                    <span className="text-sm">{appointment.teamSize} personnes</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Planning Timeline */}
        <div className="space-y-4">
          <h3 className={`text-lg font-semibold transition-colors ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Interventions Planifiées
          </h3>
          {filteredPlanning.map((appointment) => (
            <div key={appointment.id} className={`border rounded-lg p-6 hover:shadow-md transition-all ${
              isDarkMode 
                ? 'border-slate-700 hover:shadow-slate-900/20' 
                : 'border-gray-200'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className={`font-semibold transition-colors ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {appointment.serviceName}
                    </h4>
                    <p className={`transition-colors ${
                      isDarkMode ? 'text-slate-400' : 'text-gray-600'
                    }`}>
                      {appointment.clientName}
                    </p>
                  </div>
                </div>
                <span className={getStatusBadge(appointment.status)}>
                  {appointment.status}
                </span>
              </div>

              <div className={`grid grid-cols-1 md:grid-cols-5 gap-4 mb-4 transition-colors ${
                isDarkMode ? 'text-slate-400' : 'text-gray-600'
              }`}>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">{formatDate(appointment.date)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">
                    {getTimeSlot(appointment.startTime, appointment.endTime)}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span className="text-sm">{appointment.employeeName}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{appointment.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4" />
                  <span className="text-sm">{appointment.teamSize} personnes</span>
                </div>
              </div>

              {/* Equipment List */}
              <div className="mb-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Package className={`w-4 h-4 transition-colors ${
                    isDarkMode ? 'text-slate-400' : 'text-gray-400'
                  }`} />
                  <span className={`text-sm font-medium transition-colors ${
                    isDarkMode ? 'text-slate-300' : 'text-gray-700'
                  }`}>
                    Équipements requis:
                  </span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {appointment.equipment.map((item, index) => (
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

              <div className="flex justify-end space-x-2">
                <button className="px-4 py-2 text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors">
                  Reprogrammer
                </button>
                <button className={`px-4 py-2 rounded-lg transition-colors ${
                  isDarkMode 
                    ? 'text-slate-400 hover:bg-slate-700' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}>
                  Voir Détails
                </button>
                {appointment.status === 'planifie' && (
                  <button className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all">
                    Démarrer
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