// src/pages/Materials/MaterielEdit.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getMaterielState } from '../../../Redux/Slice/MaterielSlice';
import { updateMateriel } from '../../../Redux/AsyncThunk/MaterielThunk';
import { useNavigate } from 'react-router-dom';
import { AppDispatchType } from '../../../Redux/Store';
import MaterielForm from './MaterielForm';

const MaterielEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatchType>();
  const navigate = useNavigate();

  const { datas: materiels, action } = useSelector(getMaterielState);
  const materielToEdit = materiels.find((m) => m.id === Number(id));

  if (!materielToEdit) return <div>Matériel introuvable</div>;

  const handleUpdate = async (data: {
    nom_materiel?: string;
    type_materiel?: string;
    etat_materiel?: string;
    quantite?: number;
    service_id?: number;
  }) => {
    try {
      await dispatch(updateMateriel({ id: Number(id), ...data })).unwrap();
      navigate('/materials');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-12 p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold mb-8 text-blue-800">Modifier le matériel</h2>
      <MaterielForm materiel={materielToEdit} onSubmit={handleUpdate} loading={action.isUpdating} />
    </div>
  );
};

export default MaterielEdit;