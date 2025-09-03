// src/pages/Service/ServiceAdd.tsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createService } from '../../../Redux/AsyncThunk/ServiceThunk'; // adapte le chemin
import { getServiceState } from '../../../Redux/Slice/ServiceSlice';
import ServiceForm from './ServiceForm';         // adapte le chemin
import { AppDispatchType } from '../../../Redux/Store';
import { useNavigate } from 'react-router-dom';

const ServiceAdd: React.FC = () => {
  const dispatch = useDispatch<AppDispatchType>();
  const navigate = useNavigate();
  const { action } = useSelector(getServiceState);

  const handleAdd = async (data: {
    denomination: string;
    description?: string;
    prix: number;
  }) => {
    try {
      await dispatch(createService(data)).unwrap();
      navigate('/services');
    } catch (error) {
      console.error("Erreur lors de l'ajout du service :", error);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-12 p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold mb-8 text-gray-800">Ajouter un service</h2>
      <ServiceForm onSubmit={handleAdd} loading={action.isCreating} />
    </div>
  );
};

export default ServiceAdd;