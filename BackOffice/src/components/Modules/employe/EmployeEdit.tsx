import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getEmployeState } from '../../../Redux/Slice/EmployeSlice';
import { updateEmploye, getAllEmployes } from '../../../Redux/AsyncThunk/EmployeThunk';
import { useNavigate } from 'react-router-dom';
import { AppDispatchType } from '../../../Redux/Store';
import EmployeForm from './EmployeForm';

const EmployeEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatchType>();
  const navigate = useNavigate();

  const { datas: employes, action } = useSelector(getEmployeState);
  const employeToEdit = employes.find((e) => e.id === Number(id));

  if (!employeToEdit) return <div>Employé introuvable</div>;

  const handleUpdate = async (data: {
    nom: string;
    prenoms: string;
    email: string;
    phone: string;
    cin: string;
    service_ids: number[]; // ✅ tableau d’IDs
    role_id?: number;
  }) => {
    try {
      await dispatch(updateEmploye({ id: Number(id), ...data })).unwrap();
      await dispatch(getAllEmployes());
      navigate('/employees');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-12 p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold mb-8 text-gray-800">
        Modifier l'employé
      </h2>
      <EmployeForm
        employe={employeToEdit}
        onSubmit={handleUpdate}
        loading={action.isUpdating}
      />
    </div>
  );
};

export default EmployeEdit;