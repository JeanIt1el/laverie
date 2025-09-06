// src/components/Account.tsx
import React, { useState, useEffect } from 'react';
import { 
  User, 
  Package, 
  CreditCard, 
  MapPin, 
  Bell, 
  Settings, 
  LogOut, 
  Clock, 
  CheckCircle 
} from 'lucide-react';
import { authService } from '../service/authService'; // ✅ 'services', pas 'service'

interface Order {
  id: string;
  status: 'delivered' | 'ready' | 'in_progress' | 'collected' | 'pending';
  date: string;
  services: string[];
  total: number;
  pickupDate: string;
  deliveryDate: string;
}

const Account: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [client, setClient] = useState<any>(null);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      window.location.href = '/login';
      return;
    }

    setClient(currentUser);

    // Charger les commandes
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/reservation');
        const data = await response.json();

        const clientOrders: Order[] = data
          .filter((r: any) => r.client?.id === currentUser.id)
          .map((r: any) => ({
            id: `ORD-${r.id}`,
            status: r.statut_reservation.toLowerCase(),
            date: r.created_at ? r.created_at.split(' ')[0] : 'N/A',
            services: r.services.map((s: any) => s.denomination),
            total: r.montant_total || 0,
            pickupDate: r.created_at,
            deliveryDate: r.created_at,
          }));

        setOrders(clientOrders);
      } catch (error) {
        console.error('Erreur lors du chargement des commandes:', error);
      }
    };

    fetchOrders();
  }, []);

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'ready': return 'bg-blue-100 text-blue-600';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'collected': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string): string => {
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
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Tableau de bord</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-blue-50 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-600 font-semibold">Commandes totales</p>
                      <p className="text-2xl font-bold text-blue-900">{orders.length}</p>
                    </div>
                    <Package className="text-blue-600" size={32} />
                  </div>
                </div>
                <div className="bg-green-50 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-600 font-semibold">Commandes livrées</p>
                      <p className="text-2xl font-bold text-green-900">
                        {orders.filter(o => o.status === 'delivered').length}
                      </p>
                    </div>
                    <CheckCircle className="text-green-600" size={32} />
                  </div>
                </div>
                <div className="bg-yellow-50 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-yellow-600 font-semibold">En cours</p>
                      <p className="text-2xl font-bold text-yellow-900">
                        {orders.filter(o => ['in_progress', 'ready', 'collected'].includes(o.status)).length}
                      </p>
                    </div>
                    <Clock className="text-yellow-600" size={32} />
                  </div>
                </div>
              </div>

              <h4 className="text-lg font-semibold text-gray-900 mb-4">Commandes récentes</h4>
              <div className="space-y-4">
                {orders.slice(0, 3).map((order) => (
                  <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-900">#{order.id}</p>
                        <p className="text-sm text-gray-600">{order.services.join(', ')}</p>
                      </div>
                      <div className="text-right">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {getStatusText(order.status)}
                        </span>
                        <p className="text-sm text-gray-600 mt-1">{order.total.toLocaleString()} F</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'profile':
        return (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Mon profil</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Prénom</label>
                  <input
                    type="text"
                    defaultValue={client?.prenom_client}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nom</label>
                  <input
                    type="text"
                    defaultValue={client?.nom_client}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  defaultValue={client?.email_client}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                <input
                  type="tel"
                  defaultValue={client?.phone_client}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                />
              </div>
              <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
                Mettre à jour
              </button>
            </form>
          </div>
        );

      default:
        return null;
    }
  };

  if (!client) {
    return <div className="flex justify-center items-center h-64">Chargement...</div>;
  }

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
                  <h3 className="font-bold text-gray-900">
                    {client.prenom_client} {client.nom_client}
                  </h3>
                  <p className="text-gray-600">Client</p>
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
                      activeTab === item.id ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <item.icon size={20} />
                    <span>{item.label}</span>
                  </button>
                ))}
                <button
                  onClick={authService.logout}
                  className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <LogOut size={20} />
                  <span>Déconnexion</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">{renderContent()}</div>
        </div>
      </div>
    </section>
  );
};

export default Account;