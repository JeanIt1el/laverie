import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createRole } from '../../../Redux/AsyncThunk/RoleThunk';
import { getRoleState } from '../../../Redux/Slice/RoleSlice';
import RoleForm from './RoleForm';
import { AppDispatchType } from '../../../Redux/Store';
import { useNavigate } from 'react-router-dom';

const RoleAdd: React.FC = () => {
  const dispatch = useDispatch<AppDispatchType>();
  const navigate = useNavigate();

  const { action } = useSelector(getRoleState);

  const handleAdd = async (data: { nom_role: string; description_role?: string }) => {
    try {
      await dispatch(createRole(data)).unwrap();
      navigate('/roles');
    } catch (error) {
      console.error("Erreur lors de l'ajout du rôle:", error);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-12 p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold mb-8 text-gray-800">Ajouter un rôle</h2>
      <RoleForm onSubmit={handleAdd} loading={action.isCreating} />
    </div>
  );
};

export default RoleAdd;
