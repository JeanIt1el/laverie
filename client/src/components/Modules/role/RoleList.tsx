// src/pages/Role/RolesModule.tsx
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Shield,
  Plus,
  Edit,
  Trash2,
  Search,
  Users,
} from 'lucide-react';
import {
  getAllRoles,
  createRole,
  updateRole,
  deleteRole,
} from '../../../Redux/AsyncThunk/RoleThunk';
import { getRoleState } from '../../../Redux/Slice/RoleSlice';
import { AppDispatchType } from '../../../Redux/Store';
import { RoleType } from '../../../types';
import RoleForm from './RoleForm';

export default function RolesModule() {
  const dispatch = useDispatch<AppDispatchType>();
  const { datas: roles, action } = useSelector(getRoleState);

  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editRole, setEditRole] = useState<RoleType | null>(null);

  
  useEffect(() => {
    dispatch(getAllRoles());
  }, [dispatch]);

  /* ── Recherche ── */
  const filteredRoles = roles.filter((role) =>
    role.nom_role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (role.description_role && role.description_role.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  /* ── CRUD ── */
  const handleAdd = async (data: { nom_role: string; description_role?: string }) => {
    await dispatch(createRole(data)).unwrap();
    setIsAddModalOpen(false);
  };

  const handleUpdate = async (data: { nom_role: string; description_role?: string }) => {
    if (!editRole) return;
    await dispatch(updateRole({ id: editRole.id, ...data })).unwrap();
    setEditRole(null);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Supprimer ce rôle ?')) dispatch(deleteRole(id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gestion des Rôles</h2>
          <p className="text-gray-600">Définissez et gérez les rôles et permissions</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Nouveau Rôle</span>
        </button>
      </div>

      {/* Recherche */}
      <div className="rounded-xl shadow-sm border p-4 bg-white border-gray-200">
        <div className="relative max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher par nom ou description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Cartes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {action.isLoading && <p className="text-center text-gray-500">Chargement...</p>}
        {filteredRoles.map((role) => (
          <div
            key={role.id}
            className="rounded-xl shadow-sm border p-6 bg-white border-gray-200 hover:shadow-md transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{role.nom_role}</h3>
                  <p className="text-sm text-gray-600">{role.description_role || '—'}</p>
                </div>
              </div>
              <div className="flex space-x-1">
                <button
                  onClick={() => setEditRole(role)}
                  className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(role.id)}
                  className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <span>ID : {role.id}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modale Ajouter */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-8">
            <header className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Ajouter un rôle</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-gray-500 hover:text-gray-900"
              >
                ✕
              </button>
            </header>
            <RoleForm onSubmit={handleAdd} loading={action.isCreating} />
          </div>
        </div>
      )}

      {/* Modale Modifier */}
      {editRole && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-8">
            <header className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Modifier le rôle</h3>
              <button
                onClick={() => setEditRole(null)}
                className="text-gray-500 hover:text-gray-900"
              >
                ✕
              </button>
            </header>
            <RoleForm role={editRole} onSubmit={handleUpdate} loading={action.isUpdating} />
          </div>
        </div>
      )}
    </div>
  );
}