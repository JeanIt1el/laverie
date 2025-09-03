// src/pages/Clients/ClientAdd.tsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createClient } from '../../../Redux/AsyncThunk/ClientThunk';
import { getClientState } from '../../../Redux/Slice/ClientSlice';
import { AppDispatchType } from '../../../Redux/Store';
import ClientForm from './ClientForm';

const ClientAdd: React.FC = () => {
  const dispatch = useDispatch<AppDispatchType>();
  const navigate = useNavigate();
  const { action } = useSelector(getClientState);

  const handleAdd = async (data: {
    nom_client: string;
    prenom_client: string;
    email_client: string;
    phone_client: string;
    adresse_client: string;
  }) => {
    try {
      await dispatch(createClient(data)).unwrap();
      navigate('/clients');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-12 p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold mb-8 text-gray-800">Ajouter un client</h2>
      <ClientForm onSubmit={handleAdd} loading={action.isCreating} />
    </div>
  );
};

export default ClientAdd;