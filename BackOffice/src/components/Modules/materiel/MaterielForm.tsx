// src/pages/Materials/MaterielForm.tsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MaterielType } from '../../../types';
import { getAllServices } from '../../../Redux/AsyncThunk/ServiceThunk';
import { getServiceState } from '../../../Redux/Slice/ServiceSlice';
import { AppDispatchType } from '../../../Redux/Store';

type MaterielFormProps = {
  materiel?: MaterielType;
  onSubmit: (data: {
    nom_materiel: string;
    type_materiel: string;
    etat_materiel: string;
    quantite: number;
    service_id?: number;
  }) => void;
  loading?: boolean;
};

const MaterielForm: React.FC<MaterielFormProps> = ({ materiel, onSubmit, loading }) => {
  const dispatch = useDispatch<AppDispatchType>();
  const { datas: services } = useSelector(getServiceState);

  const [nom_materiel, setNom] = useState(materiel?.nom_materiel || '');
  const [type_materiel, setType] = useState(materiel?.type_materiel || '');
  const [etat_materiel, setEtat] = useState(materiel?.etat_materiel || '');
  const [quantite, setQuantite] = useState<number>(materiel?.quantite || 1);
  const [service_id, setServiceId] = useState<number | undefined>(
    materiel?.service_id ?? undefined
  );

  // Charger les services au montage du composant
  useEffect(() => {
    dispatch(getAllServices());
  }, [dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ nom_materiel, type_materiel, etat_materiel, quantite, service_id });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-blue-900 mb-2">
          Nom du matériel
        </label>
        <input
          type="text"
          value={nom_materiel}
          onChange={(e) => setNom(e.target.value)}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          placeholder="Entrez le nom du matériel"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-blue-900 mb-2">
          Type de matériel
        </label>
        <input
          type="text"
          value={type_materiel}
          onChange={(e) => setType(e.target.value)}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          placeholder="Entrez le type de matériel"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-blue-900 mb-2">
          État du matériel
        </label>
        <input
          type="text"
          value={etat_materiel}
          onChange={(e) => setEtat(e.target.value)}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          placeholder="Entrez l'état du matériel"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-blue-900 mb-2">
          Quantité
        </label>
        <input
          type="number"
          min="0"
          value={quantite}
          onChange={(e) => setQuantite(Number(e.target.value))}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          placeholder="Entrez la quantité"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-blue-900 mb-2">
          Service
        </label>
        <select
          value={service_id || ''}
          onChange={(e) => setServiceId(Number(e.target.value) || undefined)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        >
          <option value="">Sélectionnez un service (optionnel)</option>
          {services.map((service) => (
            <option key={service.id} value={service.id}>
              {service.denomination}
            </option>
          ))}
        </select>
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Traitement...
            </span>
          ) : (
            materiel ? 'Modifier le matériel' : 'Ajouter le matériel'
          )}
        </button>
      </div>
    </form>
  );
};

export default MaterielForm;