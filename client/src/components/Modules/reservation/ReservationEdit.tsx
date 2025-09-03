// src/pages/Reservations/ReservationEdit.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getReservationById, updateReservation } from '../../../Redux/AsyncThunk/ReservationThunk';
import { getReservationState } from '../../../Redux/Slice/ReservationSlice';
import ReservationForm from './ReservationForm';
import { AppDispatchType } from '../../../Redux/Store';

const ReservationEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatchType>();
  const navigate = useNavigate();

  const { selected, action } = useSelector(getReservationState);

  useEffect(() => {
    if (id) dispatch(getReservationById(Number(id)));
  }, [dispatch, id]);

  const handleEdit = async (payload: {
    statut_reservation: string;
    montant_total: number;
    client_id: number;
    services: number[];
  }) => {
    try {
      await dispatch(updateReservation({ id: Number(id), ...payload })).unwrap();
      navigate('/reservations');
    } catch (error) {
      console.error("Erreur lors de la modification de la réservation :", error);
    }
  };

  if (!selected) return <p className="text-center mt-12">Chargement…</p>;

  return (
    <div className="max-w-2xl mx-auto mt-12 p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold mb-8 text-gray-800">Modifier la réservation #{id}</h2>
      <ReservationForm
        reservation={selected}
        onSubmit={handleEdit}
        loading={action.isUpdating}
      />
    </div>
  );
};

export default ReservationEdit;