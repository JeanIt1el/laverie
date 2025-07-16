import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatchType } from '../../../Redux/Store';
import { getAllRoles, deleteRole, createRole, updateRole } from '../../../Redux/AsyncThunk/RoleThunk';
import { getRoleState } from '../../../Redux/Slice/RoleSlice';
import { RoleType } from '../../../types';
import RoleForm from './RoleForm';

const CloseIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const EditIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.121 2.121 0 113 3L7 19l-4 1 1-4 12.5-12.5z" />
  </svg>
);

const DeleteIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-2 14H7L5 6" />
    <path d="M10 11v6" />
    <path d="M14 11v6" />
    <path d="M9 6V4h6v2" />
  </svg>
);

const SearchIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const RolesModule: React.FC = () => {
  const dispatch = useDispatch<AppDispatchType>();
  const { datas: roles, action } = useSelector(getRoleState);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editRole, setEditRole] = useState<RoleType | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(getAllRoles());
  }, [dispatch]);

  // Filtrer les rôles selon le terme de recherche
  const filteredRoles = roles.filter((role: RoleType) => 
    role.nom_role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (role.description_role && role.description_role.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleAdd = async (data: { nom_role: string; description_role?: string }) => {
    await dispatch(createRole(data)).unwrap();
    setIsAddModalOpen(false);
  };

  const handleEdit = async (data: { nom_role: string; description_role?: string }) => {
    if (!editRole) return;
    await dispatch(updateRole({ id: editRole.id, ...data })).unwrap();
    setEditRole(null);
    
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Liste des rôles</h2>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center bg-blue-600 hover:bg-blue-700 transition-colors text-white font-semibold py-2 px-5 rounded shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          + Ajouter un rôle
        </button>
      </div>

      <div className="mb-6">
        <div className="relative max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon />
          </div>
          <input
            type="text"
            placeholder="Rechercher par nom ou description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-colors"
          />
        </div>
      </div>

      {action.isLoading ? (
        <p className="text-center text-gray-600">Chargement...</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">Nom du rôle</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Description</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRoles.length > 0 ? (
                filteredRoles.map((role: RoleType) => (
                  <tr key={role.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-semibold">
                            {role.nom_role.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <span className="font-medium text-gray-900">{role.nom_role}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-600">{role.description_role || '-'}</td>
                    <td className="py-4 px-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setEditRole(role)}
                          className="px-3 py-1 text-blue-500 hover:bg-blue-50 rounded text-sm transition-colors inline-flex items-center space-x-1"
                          aria-label={`Modifier le rôle ${role.nom_role}`}
                        >
                          <EditIcon />
                          <span>Modifier</span>
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm('Voulez-vous vraiment supprimer ce rôle ?')) {
                              dispatch(deleteRole(role.id));
                            }
                          }}
                          className="px-3 py-1 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded text-sm hover:shadow-lg transition-all inline-flex items-center space-x-1"
                          aria-label={`Supprimer le rôle ${role.nom_role}`}
                        >
                          <DeleteIcon />
                          <span>Supprimer</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="py-8 px-4 text-center text-gray-500">
                    {searchTerm ? 'Aucun rôle trouvé pour cette recherche' : 'Aucun rôle trouvé'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* MODALE ADD */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm" role="dialog" aria-modal="true">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-8 relative animate-fadeIn">
            <header className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Ajouter un rôle</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-gray-500 hover:text-gray-900 focus:outline-none rounded-full p-1 transition-colors"
                aria-label="Fermer la modale d'ajout"
              >
                <CloseIcon />
              </button>
            </header>
            <RoleForm onSubmit={handleAdd} loading={action.isCreating} />
          </div>
        </div>
      )}

      {/* MODALE EDIT */}
      {editRole && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm" role="dialog" aria-modal="true">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-8 relative animate-fadeIn">
            <header className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Modifier le rôle</h3>
              <button
                onClick={() => setEditRole(null)}
                className="text-gray-500 hover:text-gray-900 focus:outline-none rounded-full p-1 transition-colors"
                aria-label="Fermer la modale de modification"
              >
                <CloseIcon />
              </button>
            </header>
            <RoleForm role={editRole} onSubmit={handleEdit} loading={action.isUpdating} />
          </div>
        </div>
      )}
    </div>
  );
};

export default RolesModule;