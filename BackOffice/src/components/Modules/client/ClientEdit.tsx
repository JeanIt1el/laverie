// src/pages/Clients/ClientEdit.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getClientState } from '../../../Redux/Slice/ClientSlice';
import { updateClient } from '../../../Redux/AsyncThunk/ClientThunk';
import { useNavigate } from 'react-router-dom';
import { AppDispatchType } from '../../../Redux/Store';
import ClientForm from './ClientForm';

const ClientEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatchType>();
  const navigate = useNavigate();

  const { datas: clients, action } = useSelector(getClientState);
  const clientToEdit = clients.find((c) => c.id === Number(id));

  if (!clientToEdit) return <div>Client introuvable</div>;

  const handleUpdate = async (data: {
    nom_client?: string;
    prenom_client?: string;
    email_client?: string;
    phone_client?: string;
    adresse_client?: string;
  }) => {
    try {
      await dispatch(updateClient({ id: Number(id), ...data })).unwrap();
      navigate('/clients');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-12 p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold mb-8 text-gray-800">Modifier le client</h2>
      <ClientForm client={clientToEdit} onSubmit={handleUpdate} loading={action.isUpdating} />
    </div>
  );
};

export default ClientEdit;