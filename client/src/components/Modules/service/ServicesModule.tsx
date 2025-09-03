// ServicesModule.tsx
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Wrench,
  Plus,
  Edit,
  Trash2,
  DollarSign,
} from 'lucide-react';
import {
  getAllServices,
  createService,
  updateService,
  deleteService,
} from '../../../Redux/AsyncThunk/ServiceThunk';
import { getServiceState } from '../../../Redux/Slice/ServiceSlice';
import { AppDispatchType } from '../../../Redux/Store';
import { ServiceType } from '../../../types';
import ServiceForm from './ServiceForm';

const ServicesModule: React.FC = () => {
  const dispatch = useDispatch<AppDispatchType>();
  const { datas: services, action } = useSelector(getServiceState);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editService, setEditService] = useState<ServiceType | null>(null);

  /* ── Chargement initial ── */
  useEffect(() => {
    dispatch(getAllServices());
  }, [dispatch]);

  /* ── Helpers ── */
  const formatCurrency = (amount: number) => `${amount.toLocaleString()} Ar`;
  const formatDate = (date: string) => new Date(date).toLocaleDateString('fr-FR');

  /* ── CRUD Handlers ── */
  const handleCreate = async (data: {
    denomination: string;
    description?: string;
    prix: number;
  }) => {
    await dispatch(createService(data)).unwrap();
    setIsAddModalOpen(false);
  };

  const handleUpdate = async (data: {
    denomination: string;
    description?: string;
    prix: number;
  }) => {
    if (!editService) return;
    await dispatch(updateService({ id: editService.id, ...data })).unwrap();
    setEditService(null);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Supprimer ce service ?')) {
      dispatch(deleteService(id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gestion des Services</h2>
          <p className="text-gray-600">Gérez vos offres de services et tarification</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Nouveau Service</span>
        </button>
      </div>

      {/* Loading */}
      {action.isLoading && <p className="text-center text-gray-500">Chargement...</p>}

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {services.map((service: ServiceType) => (
          <div
            key={service.id}
            className="rounded-xl shadow-sm border p-6 bg-white border-gray-200 hover:shadow-md transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                  <Wrench className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{service.denomination}</h3>
                  <span className="text-sm text-gray-500">
                    Service créé le {formatDate(service.created_at)}
                  </span>
                </div>
              </div>
              <div className="flex space-x-1">
                <button
                  onClick={() => setEditService(service)}
                  className="p-1 text-gray-400 hover:text-emerald-600 transition-colors"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(service.id)}
                  className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <p className="text-sm mb-4 text-gray-600">{service.description}</p>

            <div className="flex items-center justify-between text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <DollarSign className="w-4 h-4" />
                <span>Prix</span>
              </div>
              <span className="text-lg font-semibold text-gray-900">
                {formatCurrency(service.prix)}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="rounded-xl shadow-sm border p-6 bg-white border-gray-200">
        <h3 className="text-lg font-semibold mb-4 text-gray-900">Résumé des services</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
          <div>
            <p className="font-medium">Total services</p>
            <p className="text-2xl font-bold text-gray-900">{services.length}</p>
          </div>
          <div>
            <p className="font-medium">Prix moyen</p>
            <p className="text-2xl font-bold text-gray-900">
              {formatCurrency(
                services.length > 0
                  ? services.reduce((sum, s) => sum + s.prix, 0) / services.length
                  : 0
              )}
            </p>
          </div>
          <div>
            <p className="font-medium">Créés récemment</p>
            <p className="text-2xl font-bold text-gray-900">
              {
                services.filter(
                  (s) =>
                    new Date(s.created_at) >
                    new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
                ).length
              }
            </p>
          </div>
        </div>
      </div>

      {/* Modale Ajouter */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-8 relative">
            <header className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Ajouter un service</h3>
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
            <ServiceForm onSubmit={handleCreate} loading={action.isCreating} />
          </div>
        </div>
      )}

      {/* Modale Modifier */}
      {editService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-8 relative">
            <header className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Modifier le service</h3>
              <button
                onClick={() => setEditService(null)}
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
            <ServiceForm service={editService} onSubmit={handleUpdate} loading={action.isUpdating} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicesModule;