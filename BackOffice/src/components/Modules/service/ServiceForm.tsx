// src/components/Forms/ServiceForm.tsx
import React, { useState, useEffect } from 'react';
import { ServiceType } from '../../../types';

type ServiceFormProps = {
  service?: ServiceType;
  onSubmit: (data: { denomination: string; description?: string; prix: number }) => void;
  loading?: boolean;
};

const ServiceForm: React.FC<ServiceFormProps> = ({ service, onSubmit, loading }) => {
  const [denomination, setDenomination] = useState(service?.denomination || '');
  const [description, setDescription] = useState(service?.description || '');
  const [prix, setPrix] = useState<number>(service?.prix || 0);

  useEffect(() => {
    if (service) {
      setDenomination(service.denomination);
      setDescription(service.description || '');
      setPrix(service.prix);
    }
  }, [service]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ denomination, description, prix });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Dénomination */}
      <div>
        <label htmlFor="denomination" className="block mb-2 text-gray-700 font-semibold">
          Dénomination <span className="text-red-500">*</span>
        </label>
        <input
          id="denomination"
          type="text"
          value={denomination}
          onChange={(e) => setDenomination(e.target.value)}
          required
          disabled={loading}
          className="w-full px-4 py-2 border border-gray-300 rounded-md
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Entrez la dénomination"
        />
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block mb-2 text-gray-700 font-semibold">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={loading}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-md
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Description optionnelle"
        />
      </div>

      {/* Prix */}
      <div>
        <label htmlFor="prix" className="block mb-2 text-gray-700 font-semibold">
          Prix (Ar) <span className="text-red-500">*</span>
        </label>
        <input
          id="prix"
          type="number"
          min="0"
          step="1"
          value={prix}
          onChange={(e) => setPrix(Number(e.target.value))}
          required
          disabled={loading}
          className="w-full px-4 py-2 border border-gray-300 rounded-md
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="0"
        />
      </div>

      {/* Bouton */}
      <button
        type="submit"
        disabled={loading}
        className={`w-full py-3 rounded-md text-white bg-blue-600
                    hover:bg-blue-700 transition-colors
                    ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {service ? 'Modifier' : 'Ajouter'}
      </button>
    </form>
  );
};

export default ServiceForm;