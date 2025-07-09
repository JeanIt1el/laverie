import { useState } from 'react';
import { Clock, Calendar, User, MapPin, Filter, Plus, Users, Package } from 'lucide-react';
import { mockPlanning } from '../../data/mockData';
import { Planning } from '../../types';

export default function PlanningModule() {
  const [planning, setPlanning] = useState<Planning[]>(mockPlanning);
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const [filterEmployee, setFilterEmployee] = useState<string>('all');

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-3 py-1 text-xs font-medium rounded-full";
    switch (status) {
      case 'planifie': return `${baseClasses} bg-blue-100 text-blue-800`;
      case 'en-cours': return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'termine': return `${baseClasses} bg-emerald-100 text-emerald-800`;
      case 'annule': return `${baseClasses} bg-red-100 text-red-800`;
      default: return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('fr-FR', { month: 'short', day: 'numeric', year: 'numeric' });

  const getTimeSlot = (startTime: string, endTime: string) => `${startTime} - ${endTime}`;

  const employees = [...new Set(planning.map(p => p.employeeName))];

  const filteredPlanning = planning.filter(item => filterEmployee === 'all' || item.employeeName === filterEmployee);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Planning & Planification</h2>
          <p className="text-gray-600">Gérez les plannings et l'allocation des ressources</p>
        </div>
        <button className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Planifier Intervention</span>
        </button>
      </div>

      {/* View Controls */}
      <div className="rounded-xl shadow-sm border p-6 bg-white border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <div className="flex space-x-4">
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                viewMode === 'list' ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Vue Liste
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                viewMode === 'calendar' ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Vue Calendrier
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={filterEmployee}
              onChange={e => setFilterEmployee(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white border-gray-200 text-gray-900"
            >
              <option value="all">Tous les Employés</option>
              {employees.map(emp => (
                <option key={emp} value={emp}>{emp}</option>
              ))}
            </select>
          </div>
        </div>

        {viewMode === 'list' && (
          <>
            {/* Planning Today */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Planning d'Aujourd'hui</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredPlanning.filter(p => p.date === '2024-01-18').map(appointment => (
                  <div key={appointment.id} className="border rounded-lg p-4 hover:shadow-md transition-all border-gray-200">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-indigo-500" />
                        <span className="font-medium text-gray-900">{getTimeSlot(appointment.startTime, appointment.endTime)}</span>
                      </div>
                      <span className={getStatusBadge(appointment.status)}>{appointment.status}</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-gray-600">
                        <User className="w-4 h-4" />
                        <span className="text-sm">{appointment.employeeName}</span>
                      </div>
                      <div className="text-sm font-medium text-gray-900">{appointment.serviceName}</div>
                      <div className="text-sm text-gray-600">{appointment.clientName}</div>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">{appointment.location}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Users className="w-4 h-4" />
                        <span className="text-sm">{appointment.teamSize} personnes</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Planned Interventions */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Interventions Planifiées</h3>
              {filteredPlanning.map(appointment => (
                <div key={appointment.id} className="border rounded-lg p-6 hover:shadow-md transition-all border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{appointment.serviceName}</h4>
                        <p className="text-gray-600">{appointment.clientName}</p>
                      </div>
                    </div>
                    <span className={getStatusBadge(appointment.status)}>{appointment.status}</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4 text-gray-600">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">{formatDate(appointment.date)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{getTimeSlot(appointment.startTime, appointment.endTime)}</span>
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

                  {/* Equipments */}
                  <div className="mb-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Package className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-700">Équipements requis:</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {appointment.equipment.map((item, idx) => (
                        <span key={idx} className="px-2 py-1 text-xs rounded bg-gray-100 text-gray-600">{item}</span>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end space-x-2">
                    <button className="px-4 py-2 text-indigo-500 hover:bg-indigo-50 rounded-lg transition-colors">Reprogrammer</button>
                    <button className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">Voir Détails</button>
                    {appointment.status === 'planifie' && (
                      <button className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all">Démarrer</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {viewMode === 'calendar' && (
          <div className="text-gray-600">
            {/* Ici tu peux intégrer un vrai calendrier avec une bibliothèque comme react-calendar, FullCalendar, etc. */}
            Vue calendrier en cours de développement...
          </div>
        )}
      </div>
    </div>
  );
}
