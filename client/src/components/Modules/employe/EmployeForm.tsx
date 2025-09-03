import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatchType, RootStateType } from '../../../Redux/Store';
import { getAllServices } from '../../../Redux/AsyncThunk/ServiceThunk';
import { getAllRoles } from '../../../Redux/AsyncThunk/RoleThunk';
import { EmployeType } from '../../../types';

type EmployeFormProps = {
  employe?: EmployeType;
  onSubmit: (data: {
    nom: string;
    prenoms: string;
    email: string;
    phone: string;
    cin: string;
    service_ids: number[];
    role_id?: number;
  }) => void;
  loading?: boolean;
};

const EmployeForm: React.FC<EmployeFormProps> = ({ employe, onSubmit, loading }) => {
  const dispatch = useDispatch<AppDispatchType>();
  const services = useSelector((state: RootStateType) => state.Service.datas);
  const roles = useSelector((state: RootStateType) => state.Roles.datas);

  const [nom, setNom] = useState(employe?.nom || '');
  const [prenoms, setPrenoms] = useState(employe?.prenoms || '');
  const [email, setEmail] = useState(employe?.email || '');
  const [phone, setPhone] = useState<string>(employe?.phone?.toString() || '');
  const [cin, setCin] = useState<string>(employe?.cin || '');
  const [service_ids, setServiceIds] = useState<number[]>(
    employe?.services?.map((s) => s.id) || []
  );
  const [role_id, setRoleId] = useState<number | undefined>(employe?.role?.id);

  useEffect(() => {
    dispatch(getAllServices());
    dispatch(getAllRoles());
  }, [dispatch]);

  const handleServiceToggle = (id: number) => {
    setServiceIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ Nettoyage et conversion en entiers valides
    const cleanedServiceIds = service_ids
      .map(Number)
      .filter((id) => !isNaN(id));

    onSubmit({
      nom,
      prenoms,
      email,
      phone,
      cin,
      service_ids: cleanedServiceIds,
      role_id,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Nom</label>
        <input
          type="text"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Prénoms</label>
        <input
          type="text"
          value={prenoms}
          onChange={(e) => setPrenoms(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Téléphone</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">CIN</label>
        <input
          type="text"
          value={cin}
          onChange={(e) => setCin(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Services</label>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {services.map((s) => (
            <label key={s.id} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={service_ids.includes(s.id)}
                onChange={() => handleServiceToggle(s.id)}
              />
              <span>{s.denomination}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Rôle</label>
        <select
          value={role_id || ''}
          onChange={(e) => setRoleId(Number(e.target.value) || undefined)}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <option value="" disabled>-- Sélectionner un rôle --</option>
          {roles.map((r) => (
            <option key={r.id} value={r.id}>
              {r.nom_role}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-md hover:bg-emerald-700 disabled:opacity-50"
      >
        {employe ? 'Modifier' : 'Ajouter'}
      </button>
    </form>
  );
};

export default EmployeForm;