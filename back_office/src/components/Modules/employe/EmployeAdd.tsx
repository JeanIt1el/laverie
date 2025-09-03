import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createEmploye, getAllEmployes } from '../../../Redux/AsyncThunk/EmployeThunk';
import { AppDispatchType } from '../../../Redux/Store';
import EmployeForm from './EmployeForm';

const EmployeAdd: React.FC = () => {
  const dispatch = useDispatch<AppDispatchType>();
  const navigate = useNavigate();

  const handleAdd = async (data: {
    nom: string;
    prenoms: string;
    email: string;
    phone: string;
    cin: string;
    service_ids: number[]; // ✅ tableau d’IDs
    role_id?: number;
  }) => {
    try {
      await dispatch(createEmploye(data)).unwrap();
      await dispatch(getAllEmployes());
      navigate('/employees');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-12 p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold mb-8 text-gray-800">
        Ajouter un employé
      </h2>
      <EmployeForm onSubmit={handleAdd} />
    </div>
  );
};

export default EmployeAdd;