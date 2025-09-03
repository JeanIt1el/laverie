import React, { useState, useEffect } from 'react';
import { RoleType } from '../../../types';

type RoleFormProps = {
  role?: RoleType;
  onSubmit: (data: { nom_role: string; description_role?: string }) => void;
  loading?: boolean;
};

const RoleForm: React.FC<RoleFormProps> = ({ role, onSubmit, loading }) => {
  const [nomRole, setNomRole] = useState(role?.nom_role || '');
  const [description, setDescription] = useState(role?.description_role || '');

  useEffect(() => {
    if (role) {
      setNomRole(role.nom_role);
      setDescription(role.description_role || '');
    }
  }, [role]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ nom_role: nomRole, description_role: description });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Nom du rôle */}
      <div>
        <label htmlFor="nomRole" className="block mb-2 text-gray-700 font-semibold">
          Nom du rôle <span className="text-red-500">*</span>
        </label>
        <input
          id="nomRole"
          type="text"
          value={nomRole}
          onChange={(e) => setNomRole(e.target.value)}
          required
          disabled={loading}
          className="w-full px-4 py-2 border border-gray-300 rounded-md
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Entrez le nom du rôle"
        />
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block mb-2 text-gray-700 font-semibold">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={loading}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-md
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Description optionnelle"
        />
      </div>

      {/* Bouton */}
      <button
        type="submit"
        disabled={loading}
        className={`w-full py-3 rounded-md text-white bg-blue-600
                    hover:bg-blue-700 transition-colors
                    ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {role ? 'Modifier' : 'Ajouter'}
      </button>
    </form>
  );
};

export default RoleForm;
