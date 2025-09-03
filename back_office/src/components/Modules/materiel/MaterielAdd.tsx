// src/pages/Materials/MaterielAdd.tsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createMateriel } from '../../../Redux/AsyncThunk/MaterielThunk';
import { getMaterielState } from '../../../Redux/Slice/MaterielSlice';
import { AppDispatchType } from '../../../Redux/Store';
import MaterielForm from './MaterielForm';

const MaterielAdd: React.FC = () => {
  const dispatch = useDispatch<AppDispatchType>();
  const navigate = useNavigate();
  const { action } = useSelector(getMaterielState);

  const handleAdd = async (data: {
    nom_materiel: string;
    type_materiel: string;
    etat_materiel: string;
    quantite: number;
    service_id?: number;
  }) => {
    try {
      await dispatch(createMateriel(data)).unwrap();
      navigate('/materials');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-12 p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold mb-8 text-blue-800">Ajouter un matériel</h2>
      <MaterielForm onSubmit={handleAdd} loading={action.isCreating} />
    </div>
  );
};

export default MaterielAdd;