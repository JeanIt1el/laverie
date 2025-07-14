import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatchType } from '../../../Redux/Store';
import { getAllRoles, deleteRole } from '../../../Redux/AsyncThunk/RoleThunk'; // ✅ ajouter deleteRole ici
import { getRoleState } from '../../../Redux/Slice/RoleSlice';
import { RoleType } from '../../../types';
import { Link } from 'react-router-dom';

const RolesModule: React.FC = () => {
  const dispatch = useDispatch<AppDispatchType>();
  const { datas: roles, action } = useSelector(getRoleState);

  useEffect(() => {
    dispatch(getAllRoles());
  }, [dispatch]);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Liste des rôles</h2>

      <div className="mb-4">
        <Link to="/roles/add">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            + Ajouter un rôle
          </button>
        </Link>
      </div>

      {action.isLoading ? (
        <p>Chargement...</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Nom du rôle</th>
              <th className="py-2 px-4 border-b">Description</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role: RoleType) => (
              <tr key={role.id}>
                <td className="py-2 px-4 border-b">{role.id}</td>
                <td className="py-2 px-4 border-b">{role.nom_role}</td>
                <td className="py-2 px-4 border-b">{role.description_role || '-'}</td>
                <td className="py-2 px-4 border-b flex space-x-2">
                  <Link to={`/roles/${role.id}/edit`}>
                    <button className="text-blue-500 hover:underline">Modifier</button>
                  </Link>
                  <button
                    onClick={() => {
                      if (window.confirm('Voulez-vous vraiment supprimer ce rôle ?')) {
                        dispatch(deleteRole(role.id));
                      }
                    }}
                    className="text-red-500 hover:underline"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default RolesModule;
