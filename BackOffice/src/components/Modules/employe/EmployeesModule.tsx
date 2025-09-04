// src/pages/Employees/EmployeesModule.tsx
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  UserCheck,
  Plus,
  Edit,
  Trash2,
  Mail,
  Phone,
  Calendar,
  Filter,
} from 'lucide-react';
import {
  getAllEmployes,
  createEmploye,
  updateEmploye,
  deleteEmploye,
} from '../../../Redux/AsyncThunk/EmployeThunk';
import { getAllServices } from '../../../Redux/AsyncThunk/ServiceThunk';
import { getAllRoles } from '../../../Redux/AsyncThunk/RoleThunk';
import { getEmployeState } from '../../../Redux/Slice/EmployeSlice';
import { AppDispatchType, RootStateType } from '../../../Redux/Store';
import { EmployeType, ServiceType } from '../../../types';
import EmployeForm from './EmployeForm';

export default function EmployeesModule() {
  const dispatch = useDispatch<AppDispatchType>();
  const { datas: employes, action } = useSelector(getEmployeState);
  const services = useSelector((state: RootStateType) => state.Service.datas);
  const roles = useSelector((state: RootStateType) => state.Roles.datas);

  const [filterService, setFilterService] = useState<string>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editEmploye, setEditEmploye] = useState<EmployeType | null>(null);

  useEffect(() => {
    dispatch(getAllServices());
    dispatch(getAllRoles());
    dispatch(getAllEmployes());
  }, [dispatch]);

  // 🔧 Mappers sécurisés
  const getServiceLabels = (serviceList: ServiceType[]) =>
    Array.isArray(serviceList) && serviceList.length > 0
      ? serviceList
          .map((s) => services.find((srv) => srv.id === s.id)?.denomination || 'Inconnu')
          .join(', ')
      : 'Non assigné';

  const getRoleLabel = (id: number) =>
    roles.find((r) => r.id === id)?.nom_role || 'Sans rôle';

  const formatDate = (date: string) => {
    if (!date) return '–';
    const d = new Date(date);
    return isNaN(d.getTime())
      ? '–'
      : d.toLocaleDateString('fr-FR', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        });
  };

  /* CRUD */
  const handleCreate = async (data: {
    nom: string;
    prenoms: string;
    email: string;
    phone: string;
    cin: string;
    service_ids?: number[];
    role_id?: number;
  }) => {
    await dispatch(createEmploye(data)).unwrap();
    setIsAddModalOpen(false);
  };

  const handleUpdate = async (data: {
    nom: string;
    prenoms: string;
    email: string;
    phone: string;
    cin: string;
    service_ids?: number[];
    role_id?: number;
  }) => {
    if (!editEmploye) return;
    await dispatch(
      updateEmploye({
        id: editEmploye.id,
        ...data,
      })
    ).unwrap();
    setEditEmploye(null);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Supprimer cet employé ?')) {
      dispatch(deleteEmploye(id))
        .unwrap()
        .then(() => dispatch(getAllEmployes()));
    }
  };

  // Labels uniques des services
  const serviceLabels = [
    ...new Set(
      employes
        .flatMap((e) =>
          Array.isArray(e.services)
            ? e.services.map((s) => s.denomination || '')
            : []
        )
        .filter(Boolean)
    ),
  ];

  // Filtre par service
  const filtered = employes.filter((e) => {
    if (filterService === 'all') return true;
    return Array.isArray(e.services) && e.services.some((s) => s.denomination === filterService);
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Gestion des Employés
          </h2>
          <p className="text-gray-600">
            Gérez votre équipe et les informations du personnel
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Nouvel Employé</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            label: 'Total Employés',
            value: employes.length,
            iconColor: 'text-blue-500',
            icon: UserCheck,
          },
          {
            label: 'Avec Service(s)',
            value: employes.filter((e) => Array.isArray(e.services) && e.services.length > 0).length,
            iconColor: 'text-indigo-500',
            icon: UserCheck,
          },
          {
            label: 'Sans Service',
            value: employes.filter((e) => !Array.isArray(e.services) || e.services.length === 0).length,
            iconColor: 'text-gray-500',
            icon: UserCheck,
          },
          {
            label: 'Services actifs',
            value: serviceLabels.length,
            iconColor: 'text-purple-500',
            icon: UserCheck,
          },
        ].map(({ label, value, iconColor, icon: Icon }) => (
          <div
            key={label}
            className="rounded-xl shadow-sm border p-6 bg-white border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{label}</p>
                <p className={`text-2xl font-bold ${iconColor}`}>{value}</p>
              </div>
              <Icon className={`w-8 h-8 ${iconColor}`} />
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="rounded-xl shadow-sm border p-6 bg-white border-gray-200">
        <div className="flex items-center space-x-4">
          <Filter className="w-4 h-4 text-gray-400" />
          <select
            value={filterService}
            onChange={(e) => setFilterService(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white border-gray-200"
          >
            <option value="all">Tous les services</option>
            {serviceLabels.map((label) => (
              <option key={label} value={String(label)}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Employee Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {action.isLoading && (
          <p className="text-center text-gray-500">Chargement...</p>
        )}
        
        {filtered.map((e: EmployeType) => (
          <div
            key={e.id}
            className="rounded-xl shadow-sm border p-6 hover:shadow-md transition-all bg-white border-gray-200"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-lg">
                    {e.nom.charAt(0)}
                    {e.prenoms.charAt(0)}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {e.nom} {e.prenoms}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {getRoleLabel(e.role?.id ?? 0)}
                  </p>
                </div>
              </div>
              <div className="flex space-x-1">
                <button
                  onClick={() => setEditEmploye(e)}
                  className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(e.id)}
                  className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span className="truncate">{e.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>{e.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <UserCheck className="w-4 h-4" />
                <span>{getServiceLabels(Array.isArray(e.services) ? e.services : [])}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>Créé le {formatDate(e.created_at)}</span>
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
              <h3 className="text-xl font-semibold text-gray-900">
                Ajouter un employé
              </h3>
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
            <EmployeForm onSubmit={handleCreate} loading={action.isCreating} />
          </div>
        </div>
      )}

      {/* Modale Modifier */}
      {editEmploye && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-8 relative">
            <header className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900">
                Modifier l'employé
              </h3>
              <button
                onClick={() => setEditEmploye(null)}
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
            <EmployeForm
              employe={editEmploye}
              onSubmit={handleUpdate}
              loading={action.isUpdating}
            />
          </div>
        </div>
      )}
    </div>
  );
}