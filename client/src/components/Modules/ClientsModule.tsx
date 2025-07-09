import  { useState } from 'react';
import { Search, Plus, Edit, Trash2, Eye, Phone, Mail, MapPin, Building } from 'lucide-react';
import { mockClients } from '../../data/mockData';
import { Client } from '../../types';

export default function ClientsModule() {
  const [clients, setClients] = useState<Client[]>(mockClients);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'actif' | 'inactif'>('all');
  const [filterType, setFilterType] = useState<'all' | 'hotel' | 'terrain' | 'bureau' | 'residence'>('all');

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || client.status === filterStatus;
    const matchesType = filterType === 'all' || client.type === filterType;
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-2 py-1 text-xs font-medium rounded-full";
    return status === 'actif'
      ? `${baseClasses} bg-emerald-100 text-emerald-800`
      : `${baseClasses} bg-gray-100 text-gray-800`;
  };

  const getTypeBadge = (type: string) => {
    const baseClasses = "px-2 py-1 text-xs font-medium rounded-full";
    const colors = {
      'hotel': 'bg-purple-100 text-purple-800',
      'terrain': 'bg-emerald-100 text-emerald-800',
      'bureau': 'bg-blue-100 text-blue-800',
      'residence': 'bg-orange-100 text-orange-800'
    };
    return `${baseClasses} ${colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800'}`;
  };

  const formatCurrency = (amount: number) => {
    return `${amount.toLocaleString()} Ar`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Gestion des Clients
          </h2>
          <p className="text-gray-600">
            Gérez votre portefeuille clients et les relations commerciales
          </p>
        </div>
        <button className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Nouveau Client</span>
        </button>
      </div>

      {/* Filters */}
      <div className="rounded-xl shadow-sm border p-6 bg-white border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white border-gray-200 text-gray-900 placeholder-gray-400"
            />
          </div>
          <div className="flex space-x-4">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white border-gray-200 text-gray-900"
            >
              <option value="all">Tous les statuts</option>
              <option value="actif">Actif</option>
              <option value="inactif">Inactif</option>
            </select>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white border-gray-200 text-gray-900"
            >
              <option value="all">Tous les types</option>
              <option value="hotel">Hôtel</option>
              <option value="terrain">Terrain</option>
              <option value="bureau">Bureau</option>
              <option value="residence">Résidence</option>
            </select>
          </div>
        </div>
      </div>

      {/* Client Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClients.map((client) => (
          <div key={client.id} className="rounded-xl shadow-sm border p-6 bg-white border-gray-200 hover:shadow-md transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-lg">
                    {client.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {client.name}
                  </h3>
                  <div className="flex space-x-2 mt-1">
                    <span className={getStatusBadge(client.status)}>
                      {client.status}
                    </span>
                    <span className={getTypeBadge(client.type)}>
                      {client.type}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-1">
                <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="p-1 text-gray-400 hover:text-emerald-600 transition-colors">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-1 text-gray-400 hover:text-red-600 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Mail className="w-4 h-4" />
                <span className="truncate">{client.email}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Phone className="w-4 h-4" />
                <span>{client.phone}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                <span className="truncate">{client.city}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Building className="w-4 h-4" />
                <span className="truncate">{client.address}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">
                    Contrats
                  </span>
                  <p className="font-semibold text-gray-900">
                    {client.totalContracts}
                  </p>
                </div>
                <div>
                  <span className="text-gray-500">
                    Total Dépensé
                  </span>
                  <p className="font-semibold text-gray-900">
                    {formatCurrency(client.totalSpent)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
