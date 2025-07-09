import  { useState } from 'react';
import { Shield, Plus, Edit, Trash2, Users, Settings, Eye, Lock } from 'lucide-react';
import { mockRoles } from '../../data/mockData';
import { Role } from '../../types';

const allPermissions = [
  { id: 'gerer_utilisateurs', label: 'Gérer Utilisateurs', category: 'Gestion Utilisateurs' },
  { id: 'gerer_roles', label: 'Gérer Rôles', category: 'Gestion Utilisateurs' },
  { id: 'voir_rapports', label: 'Voir Rapports', category: 'Analytiques' },
  { id: 'gerer_parametres', label: 'Gérer Paramètres', category: 'Système' },
  { id: 'gerer_paiements', label: 'Gérer Paiements', category: 'Financier' },
  { id: 'gerer_clients', label: 'Gérer Clients', category: 'Gestion Clients' },
  { id: 'gerer_reservations', label: 'Gérer Réservations', category: 'Réservations' },
  { id: 'gerer_employes', label: 'Gérer Employés', category: 'RH' },
  { id: 'gerer_planning', label: 'Gérer Planning', category: 'Planning' },
  { id: 'voir_planning', label: 'Voir Planning', category: 'Planning' },
  { id: 'gerer_equipe', label: 'Gérer Équipe', category: 'Terrain' },
  { id: 'voir_materiels', label: 'Voir Matériels', category: 'Matériels' },
  { id: 'mettre_a_jour_statut', label: 'Mettre à Jour Statut', category: 'Terrain' },
  { id: 'voir_planning_personnel', label: 'Voir Planning Personnel', category: 'Personnel' },
  { id: 'mettre_a_jour_profil', label: 'Mettre à Jour Profil', category: 'Personnel' },
  { id: 'voir_taches', label: 'Voir Tâches', category: 'Personnel' },
];

interface RolesModuleProps {
  isDarkMode: boolean;
}

export default function RolesModule({ isDarkMode }: RolesModuleProps) {
  const [roles, setRoles] = useState<Role[]>(mockRoles);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  const getLevelBadge = (level: string) => {
    const baseClasses = "px-3 py-1 text-xs font-medium rounded-full";
    switch (level) {
      case 'eleve':
        return `${baseClasses} ${isDarkMode ? 'bg-red-900/50 text-red-400' : 'bg-red-100 text-red-800'}`;
      case 'moyen':
        return `${baseClasses} ${isDarkMode ? 'bg-yellow-900/50 text-yellow-400' : 'bg-yellow-100 text-yellow-800'}`;
      case 'faible':
        return `${baseClasses} ${isDarkMode ? 'bg-emerald-900/50 text-emerald-400' : 'bg-emerald-100 text-emerald-800'}`;
      default:
        return `${baseClasses} ${isDarkMode ? 'bg-slate-700 text-slate-400' : 'bg-gray-100 text-gray-800'}`;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'eleve':
        return 'from-red-500 to-red-600';
      case 'moyen':
        return 'from-yellow-500 to-yellow-600';
      case 'faible':
        return 'from-emerald-500 to-teal-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const getPermissionsByCategory = (permissions: string[]) => {
    const categories: { [key: string]: string[] } = {};
    permissions.forEach(permId => {
      const perm = allPermissions.find(p => p.id === permId);
      if (perm) {
        if (!categories[perm.category]) {
          categories[perm.category] = [];
        }
        categories[perm.category].push(perm.label);
      }
    });
    return categories;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-2xl font-bold transition-colors ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Gestion des Rôles
          </h2>
          <p className={`transition-colors ${
            isDarkMode ? 'text-slate-400' : 'text-gray-600'
          }`}>
            Définissez et gérez les rôles utilisateurs et permissions
          </p>
        </div>
        <button className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Créer Rôle</span>
        </button>
      </div>

      {/* Role Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className={`rounded-xl shadow-sm border p-6 transition-colors ${
          isDarkMode 
            ? 'bg-slate-800 border-slate-700' 
            : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium transition-colors ${
                isDarkMode ? 'text-slate-400' : 'text-gray-600'
              }`}>
                Total Rôles
              </p>
              <p className={`text-2xl font-bold transition-colors ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {roles.length}
              </p>
            </div>
            <Shield className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className={`rounded-xl shadow-sm border p-6 transition-colors ${
          isDarkMode 
            ? 'bg-slate-800 border-slate-700' 
            : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium transition-colors ${
                isDarkMode ? 'text-slate-400' : 'text-gray-600'
              }`}>
                Accès Élevé
              </p>
              <p className="text-2xl font-bold text-red-500">
                {roles.filter(r => r.level === 'eleve').length}
              </p>
            </div>
            <Lock className="w-8 h-8 text-red-500" />
          </div>
        </div>
        
        <div className={`rounded-xl shadow-sm border p-6 transition-colors ${
          isDarkMode 
            ? 'bg-slate-800 border-slate-700' 
            : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium transition-colors ${
                isDarkMode ? 'text-slate-400' : 'text-gray-600'
              }`}>
                Total Utilisateurs
              </p>
              <p className="text-2xl font-bold text-purple-500">
                {roles.reduce((sum, r) => sum + r.userCount, 0)}
              </p>
            </div>
            <Users className="w-8 h-8 text-purple-500" />
          </div>
        </div>
        
        <div className={`rounded-xl shadow-sm border p-6 transition-colors ${
          isDarkMode 
            ? 'bg-slate-800 border-slate-700' 
            : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium transition-colors ${
                isDarkMode ? 'text-slate-400' : 'text-gray-600'
              }`}>
                Permissions
              </p>
              <p className="text-2xl font-bold text-emerald-500">{allPermissions.length}</p>
            </div>
            <Settings className="w-8 h-8 text-emerald-500" />
          </div>
        </div>
      </div>

      {/* Roles Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {roles.map((role) => (
          <div key={role.id} className={`rounded-xl shadow-sm border p-6 hover:shadow-md transition-all ${
            isDarkMode 
              ? 'bg-slate-800 border-slate-700 hover:shadow-slate-900/20' 
              : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 bg-gradient-to-r ${getLevelColor(role.level)} rounded-lg flex items-center justify-center`}>
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className={`font-semibold transition-colors ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {role.name}
                  </h3>
                  <p className={`text-sm transition-colors ${
                    isDarkMode ? 'text-slate-400' : 'text-gray-600'
                  }`}>
                    {role.description}
                  </p>
                  <p className={`text-xs mt-1 transition-colors ${
                    isDarkMode ? 'text-slate-500' : 'text-gray-500'
                  }`}>
                    {role.department}
                  </p>
                </div>
              </div>
              <div className="flex space-x-1">
                <button 
                  onClick={() => setSelectedRole(role)}
                  className={`p-1 transition-colors ${
                    isDarkMode 
                      ? 'text-slate-400 hover:text-blue-400' 
                      : 'text-gray-400 hover:text-blue-600'
                  }`}
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button className={`p-1 transition-colors ${
                  isDarkMode 
                    ? 'text-slate-400 hover:text-emerald-400' 
                    : 'text-gray-400 hover:text-emerald-600'
                }`}>
                  <Edit className="w-4 h-4" />
                </button>
                <button className={`p-1 transition-colors ${
                  isDarkMode 
                    ? 'text-slate-400 hover:text-red-400' 
                    : 'text-gray-400 hover:text-red-600'
                }`}>
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className={`text-sm transition-colors ${
                  isDarkMode ? 'text-slate-400' : 'text-gray-600'
                }`}>
                  Niveau d'Accès
                </span>
                <span className={getLevelBadge(role.level)}>
                  {role.level.charAt(0).toUpperCase() + role.level.slice(1)}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className={`text-sm transition-colors ${
                  isDarkMode ? 'text-slate-400' : 'text-gray-600'
                }`}>
                  Utilisateurs
                </span>
                <span className={`font-medium transition-colors ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {role.userCount}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className={`text-sm transition-colors ${
                  isDarkMode ? 'text-slate-400' : 'text-gray-600'
                }`}>
                  Permissions
                </span>
                <span className={`font-medium transition-colors ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {role.permissions.length}
                </span>
              </div>
            </div>

            <div className={`mt-4 pt-4 border-t transition-colors ${
              isDarkMode ? 'border-slate-700' : 'border-gray-100'
            }`}>
              <div className="flex flex-wrap gap-1">
                {role.permissions.slice(0, 3).map((permId) => {
                  const perm = allPermissions.find(p => p.id === permId);
                  return perm ? (
                    <span key={permId} className={`px-2 py-1 text-xs rounded transition-colors ${
                      isDarkMode 
                        ? 'bg-slate-700 text-slate-400' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {perm.label}
                    </span>
                  ) : null;
                })}
                {role.permissions.length > 3 && (
                  <span className={`px-2 py-1 text-xs rounded transition-colors ${
                    isDarkMode 
                      ? 'bg-slate-700 text-slate-400' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    +{role.permissions.length - 3} autres
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Role Details Modal */}
      {selectedRole && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`rounded-xl shadow-xl p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto transition-colors ${
            isDarkMode ? 'bg-slate-800' : 'bg-white'
          }`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className={`text-xl font-semibold transition-colors ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Détails du Rôle: {selectedRole.name}
              </h3>
              <button 
                onClick={() => setSelectedRole(null)}
                className={`transition-colors ${
                  isDarkMode 
                    ? 'text-slate-400 hover:text-slate-200' 
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className={`font-medium mb-2 transition-colors ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Description
                </h4>
                <p className={`transition-colors ${
                  isDarkMode ? 'text-slate-400' : 'text-gray-600'
                }`}>
                  {selectedRole.description}
                </p>
                <p className={`text-sm mt-1 transition-colors ${
                  isDarkMode ? 'text-slate-500' : 'text-gray-500'
                }`}>
                  Département: {selectedRole.department}
                </p>
              </div>

              <div>
                <h4 className={`font-medium mb-2 transition-colors ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Permissions par Catégorie
                </h4>
                <div className="space-y-4">
                  {Object.entries(getPermissionsByCategory(selectedRole.permissions)).map(([category, perms]) => (
                    <div key={category} className={`border rounded-lg p-4 transition-colors ${
                      isDarkMode ? 'border-slate-700' : 'border-gray-200'
                    }`}>
                      <h5 className={`font-medium mb-2 transition-colors ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        {category}
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {perms.map((perm) => (
                          <span key={perm} className={`px-3 py-1 text-sm rounded-full ${
                            isDarkMode 
                              ? 'bg-blue-900/50 text-blue-400' 
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {perm}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`flex items-center justify-between pt-4 border-t transition-colors ${
                isDarkMode ? 'border-slate-700' : 'border-gray-200'
              }`}>
                <div className="flex items-center space-x-4">
                  <span className={getLevelBadge(selectedRole.level)}>
                    Accès {selectedRole.level.charAt(0).toUpperCase() + selectedRole.level.slice(1)}
                  </span>
                  <span className={`text-sm transition-colors ${
                    isDarkMode ? 'text-slate-400' : 'text-gray-600'
                  }`}>
                    {selectedRole.userCount} utilisateurs assignés
                  </span>
                </div>
                <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-all">
                  Modifier Rôle
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}