import React from 'react';
import { useParams } from 'react-router-dom';
import RoleForm from './RoleForm';
import { useSelector, useDispatch } from 'react-redux';
import { getRoleState } from '../../../Redux/Slice/RoleSlice';
import { updateRole } from '../../../Redux/AsyncThunk/RoleThunk';
import { useNavigate } from 'react-router-dom';
import { AppDispatchType } from '../../../Redux/Store';

const RoleEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatchType>();
  const navigate = useNavigate();

  const { datas: roles, action } = useSelector(getRoleState);
  const roleToEdit = roles.find(r => r.id === Number(id));

  if (!roleToEdit) return <div>Rôle non trouvé</div>;

  const handleUpdate = async (data: { nom_role: string; description_role?: string }) => {
    try {
      await dispatch(updateRole({ id: Number(id), ...data })).unwrap();
      navigate('/roles');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-12 p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold mb-8">Modifier le rôle</h2>
      <RoleForm role={roleToEdit} onSubmit={handleUpdate} loading={action.isUpdating} />
    </div>
  );
};

export default RoleEdit;
