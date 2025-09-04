// ServiceEdit.tsx  (même squelette que RoleEdit)
import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getServiceState } from '../../../Redux/Slice/ServiceSlice';
import { updateService } from '../../../Redux/AsyncThunk/ServiceThunk';
import { useNavigate } from 'react-router-dom';
import { AppDispatchType } from '../../../Redux/Store';
import ServiceForm from './ServiceForm';

const ServiceEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatchType>();
  const navigate = useNavigate();

  const { datas: services, action } = useSelector(getServiceState);
  const serviceToEdit = services.find(s => s.id === Number(id));

  if (!serviceToEdit) return <div>Service non trouvé</div>;

  const handleUpdate = async (data: {
    denomination: string;
    description?: string;
    prix: number;
  }) => {
    try {
      await dispatch(updateService({ id: Number(id), ...data })).unwrap();
      navigate('/services');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-12 p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold mb-8 text-gray-800">Modifier le service</h2>
      <ServiceForm service={serviceToEdit} onSubmit={handleUpdate} loading={action.isUpdating} />
    </div>
  );
};

export default ServiceEdit;