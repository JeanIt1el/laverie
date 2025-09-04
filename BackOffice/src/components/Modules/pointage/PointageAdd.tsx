// src/pages/Planning/PointageAdd.tsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createPointage } from '../../../Redux/AsyncThunk/PointageThunk';
import { getPointageState } from '../../../Redux/Slice/PointageSlice';
import { AppDispatchType, RootStateType } from '../../../Redux/Store';
import PointageForm from './PointageForm';

const PointageAdd: React.FC = () => {
  const dispatch = useDispatch<AppDispatchType>();
  const navigate = useNavigate();
  const { action } = useSelector(getPointageState);
  const pointages = useSelector((state: RootStateType) => state.Pointage.datas);

  const today = new Date().toISOString().split('T')[0];

  const employeeIdsWithPointageToday = pointages
    .filter((p) => {
      const date = new Date(p.heure_debut).toISOString().split('T')[0];
      return date === today;
    })
    .map((p) => p.employe?.id)
    .filter(Boolean) as number[];

  const handleAdd = async (data: {
    employe: number;
    heure_debut: string;
    heure_fin: string;
    remarque?: string;
  }) => {
    try {
      await dispatch(
        createPointage({
          employe_id: data.employe, // ✅ renommage ici
          heure_debut: data.heure_debut,
          heure_fin: data.heure_fin,
          remarque: data.remarque,
        })
      ).unwrap();
      navigate('/planning');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-12 p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold mb-8 text-gray-800">Ajouter un pointage</h2>
      <PointageForm
        onSubmit={handleAdd}
        loading={action.isCreating}
        excludedEmployeeIds={employeeIdsWithPointageToday}
      />
    </div>
  );
};

export default PointageAdd;