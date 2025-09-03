// src/pages/Planning/PointageEdit.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getPointageState } from '../../../Redux/Slice/PointageSlice';
import { updatePointage } from '../../../Redux/AsyncThunk/PointageThunk';
import { useNavigate } from 'react-router-dom';
import { AppDispatchType } from '../../../Redux/Store';
import PointageForm from './PointageForm';

const PointageEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatchType>();
  const navigate = useNavigate();

  const { datas: pointages, action } = useSelector(getPointageState);
  const pointageToEdit = pointages.find((p) => p.id === Number(id));

  if (!pointageToEdit) return <div>Pointage introuvable</div>;

  const handleUpdate = async (data: {
    employe: number;
    heure_debut: string;
    heure_fin: string;
    remarque?: string;
  }) => {
    try {
      await dispatch(updatePointage({ id: Number(id), ...data })).unwrap();
      navigate('/planning');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-12 p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold mb-8 text-gray-800">Modifier le pointage</h2>
      <PointageForm pointage={pointageToEdit} onSubmit={handleUpdate} loading={action.isUpdating} />
    </div>
  );
};

export default PointageEdit;