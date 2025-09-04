import React, { useState } from 'react';
import { User, Package, CreditCard, MapPin, Bell, Settings, LogOut, Clock, CheckCircle } from 'lucide-react';

const Account: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const mockOrders = [
    {
      id: 'ORD-001',
      status: 'delivered',
      date: '2024-01-15',
      services: ['Lavage Standard', 'Repassage'],
      total: 4000,
      pickupDate: '2024-01-16',
      deliveryDate: '2024-01-17'
    },
    {
      id: 'ORD-002',
      status: 'in_progress',
      date: '2024-01-20',
      services: ['Nettoyage à Sec'],
      total: 4000,
      pickupDate: '2024-01-21',
      deliveryDate: '2024-01-23'
    },
    {
      id: 'ORD-003',
      status: 'ready',
      date: '2024-01-25',
      services: ['Lavage Express'],
      total: 3500,
      pickupDate: '2024-01-26',
      deliveryDate: '2024-01-26'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'ready': return 'bg-blue-100 text-blue-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'collected': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'delivered': return 'Livré';
      case 'ready': return 'Prêt';
      case 'in_progress': return 'En cours';
      case 'collected': return 'Collecté';
      default: return 'En attente';
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Tableau de bord
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-blue-50 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-600 font-semibold">Commandes totales</p>
                      <p className="text-2xl font-bold text-blue-900">12</p>
                    </div>
                    <Package className="text-blue-600" size={32} />
                  </div>
                </div>
                
                <div className="bg-green-50 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-600 font-semibold">Commandes livrées</p>
                      <p className="text-2xl font-bold text-green-900">8</p>
                    </div>
                    <CheckCircle className="text-green-600" size={32} />
                  </div>
                </div>
                
                <div className="bg-yellow-50 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-yellow-600 font-semibold">En cours</p>
                      <p className="text-2xl font-bold text-yellow-900">4</p>
                    </div>
                    <Clock className="text-yellow-600" size={32} />
                  </div>
                </div>
              </div>

              <h4 className="text-lg font-semibold text-gray-900 mb-4">
                Commandes récentes
              </h4>
              <div className="space-y-4">
                {mockOrders.slice(0, 3).map((order) => (
                  <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-900">#{order.id}</p>
                        <p className="text-sm text-gray-600">
                          {order.services.join(', ')}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {getStatusText(order.status)}
                        </span>
                        <p className="text-sm text-gray-600 mt-1">
                          {order.total.toLocaleString()} F
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'orders':
        return (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Mes commandes
            </h3>
            
            <div className="space-y-6">
              {mockOrders.map((order) => (
                <div key={order.id} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">
                        Commande #{order.id}
                      </h4>
                      <p className="text-sm text-gray-600">
                        Commandé le {new Date(order.date).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                      {getStatusText(order.status)}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Services</p>
                      <p className="font-medium">{order.services.join(', ')}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Collecte</p>
                      <p className="font-medium">{new Date(order.pickupDate).toLocaleDateString('fr-FR')}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Livraison</p>
                      <p className="font-medium">{new Date(order.deliveryDate).toLocaleDateString('fr-FR')}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-bold text-gray-900">
                      Total: {order.total.toLocaleString()} F
                    </p>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      Voir détails
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'profile':
        return (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Mon profil
            </h3>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Prénom
                  </label>
                  <input
                    type="text"
                    defaultValue="Jean"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom
                  </label>
                  <input
                    type="text"
                    defaultValue="Kouassi"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  defaultValue="jean.kouassi@email.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Téléphone
                </label>
                <input
                  type="tel"
                  defaultValue="+225 01 02 03 04 05"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Mettre à jour
              </button>
            </form>
          </div>
        );

      case 'addresses':
        return (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Mes adresses
            </h3>
            
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-900">Domicile</p>
                    <p className="text-gray-600">123 Rue de la Paix, Cocody, Abidjan</p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-700">
                      Modifier
                    </button>
                    <button className="text-red-600 hover:text-red-700">
                      Supprimer
                    </button>
                  </div>
                </div>
              </div>
              
              <button className="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-gray-600 hover:border-gray-400 transition-colors">
                + Ajouter une nouvelle adresse
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="text-blue-600" size={32} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Jean Kouassi</h3>
                  <p className="text-gray-600">Client Premium</p>
                </div>
              </div>
              
              <nav className="space-y-2">
                {[
                  { id: 'dashboard', label: 'Tableau de bord', icon: Settings },
                  { id: 'orders', label: 'Mes commandes', icon: Package },
                  { id: 'profile', label: 'Mon profil', icon: User },
                  { id: 'addresses', label: 'Mes adresses', icon: MapPin },
                  { id: 'payment', label: 'Paiement', icon: CreditCard },
                  { id: 'notifications', label: 'Notifications', icon: Bell }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === item.id
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <item.icon size={20} />
                    <span>{item.label}</span>
                  </button>
                ))}
                
                <button className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                  <LogOut size={20} />
                  <span>Déconnexion</span>
                </button>
              </nav>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="lg:w-3/4">
            {renderContent()}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Account;