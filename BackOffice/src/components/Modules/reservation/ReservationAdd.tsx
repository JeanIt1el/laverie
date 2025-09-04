// src/pages/Reservations/ReservationAdd.tsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createReservation } from '../../../Redux/AsyncThunk/ReservationThunk';
import { getReservationState } from '../../../Redux/Slice/ReservationSlice';
import ReservationForm from './ReservationForm';
import { AppDispatchType } from '../../../Redux/Store';

const ReservationAdd: React.FC = () => {
  const dispatch = useDispatch<AppDispatchType>();
  const navigate = useNavigate();

  const { action } = useSelector(getReservationState);

  const handleAdd = async (payload: {
    statut_reservation: string;
    montant_total: number;
    client_id: number;
    services: number[];
  }) => {
    try {
      await dispatch(createReservation(payload)).unwrap();
      navigate('/reservations');
    } catch (error) {
      console.error("Erreur lors de l'ajout de la réservation :", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-12 p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold mb-8 text-gray-800">Ajouter une réservation</h2>
      <ReservationForm onSubmit={handleAdd} loading={action.isCreating} />
    </div>
  );
};

export default ReservationAdd;