// src/pages/Clients/ClientsModule.tsx
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Phone,
  Mail,
  MapPin,
} from 'lucide-react';
import {
  getAllClients,
  createClient,
  updateClient,
  deleteClient,
} from '../../../Redux/AsyncThunk/ClientThunk';
import { getClientState } from '../../../Redux/Slice/ClientSlice';
import { AppDispatchType } from '../../../Redux/Store';
import { ClientType } from '../../../types';
import ClientForm from './ClientForm';

export default function ClientsModule() {
  const dispatch = useDispatch<AppDispatchType>();
  const { datas: clients, action } = useSelector(getClientState);

  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editClient, setEditClient] = useState<ClientType | null>(null);

  useEffect(() => {
    dispatch(getAllClients());
  }, [dispatch]);

  /* CRUD */
  const handleCreate = async (data: {
    nom_client: string;
    prenom_client: string;
    email_client: string;
    phone_client: string;
    adresse_client: string;
  }) => {
    await dispatch(createClient(data)).unwrap();
    setIsAddModalOpen(false);
  };

  const handleUpdate = async (data: {
    nom_client?: string;
    prenom_client?: string;
    email_client?: string;
    phone_client?: string;
    adresse_client?: string;
  }) => {
    if (!editClient) return;
    await dispatch(updateClient({ id: editClient.id, ...data })).unwrap();
    setEditClient(null);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Supprimer ce client ?')) {
      dispatch(deleteClient(id));
    }
  };

  /* Filtre simple */
  const filteredClients = clients.filter(
    (client) =>
      client.nom_client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email_client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.adresse_client.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gestion des Clients</h2>
          <p className="text-gray-600">Gérez votre portefeuille clients</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Nouveau Client</span>
        </button>
      </div>

      {/* Search */}
      <div className="rounded-xl shadow-sm border p-6 bg-white border-gray-200">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher clients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Client Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {action.isLoading && <p className="text-center text-gray-500">Chargement...</p>}
        {filteredClients.map((client) => (
          <div
            key={client.id}
            className="rounded-xl shadow-sm border p-6 bg-white border-gray-200 hover:shadow-md transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-lg">
                    {client.nom_client.charAt(0)}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {client.nom_client} {client.prenom_client}
                  </h3>
                </div>
              </div>
              <div className="flex space-x-1">
                <button
                  onClick={() => setEditClient(client)}
                  className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(client.id)}
                  className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span className="truncate">{client.email_client}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>{client.phone_client}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span className="truncate">{client.adresse_client}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modale Ajouter */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-8 relative">
            <header className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Ajouter un client</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-gray-500 hover:text-gray-900"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </header>
            <ClientForm onSubmit={handleCreate} loading={action.isCreating} />
          </div>
        </div>
      )}

      {/* Modale Modifier */}
      {editClient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-8 relative">
            <header className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Modifier le client</h3>
              <button
                onClick={() => setEditClient(null)}
                className="text-gray-500 hover:text-gray-900"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </header>
            <ClientForm client={editClient} onSubmit={handleUpdate} loading={action.isUpdating} />
          </div>
        </div>
      )}
    </div>
  );
}