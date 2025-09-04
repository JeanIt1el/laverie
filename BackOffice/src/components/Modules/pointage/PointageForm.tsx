// src/pages/Planning/PointageForm.tsx
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootStateType } from '../../../Redux/Store';
import { PointageType } from '../../../types';

type PointageFormProps = {
  pointage?: PointageType;
  onSubmit: (data: {
    employe: number;
    heure_debut: string;
    heure_fin: string;
    remarque?: string;
  }) => void;
  loading?: boolean;
  excludedEmployeeIds?: number[]; // ✅ Ajout ici
};

const PointageForm: React.FC<PointageFormProps> = ({
  pointage,
  onSubmit,
  loading,
  excludedEmployeeIds = [],
}) => {
  const employes = useSelector((state: RootStateType) => state.Employe.datas);

  const [employe, setEmploye] = useState<number>(pointage?.employe?.id ?? 0);
  const [heure_debut, setHeureDebut] = useState<string>(
    pointage?.heure_debut ? new Date(pointage.heure_debut).toISOString().slice(0, 16) : ''
  );
  const [heure_fin, setHeureFin] = useState<string>(
    pointage?.heure_fin ? new Date(pointage.heure_fin).toISOString().slice(0, 16) : ''
  );
  const [remarque, setRemarque] = useState<string>(pointage?.remarque || '');

  const toISO = (local: string) => {
    if (!local) return '';
    const [date, time] = local.split('T');
    return `${date}T${time}:00Z`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (employe === 0) {
      alert('Veuillez sélectionner un employé.');
      return;
    }

    onSubmit({
      employe,
      heure_debut: toISO(heure_debut),
      heure_fin: toISO(heure_fin),
      remarque,
    });
  };

  // ✅ Filtrer les employés déjà pointés aujourd'hui
  const availableEmployes = pointage
    ? employes // Si on édite, on ne filtre pas
    : employes.filter((emp) => !excludedEmployeeIds.includes(emp.id));

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Employé */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Employé</label>
        <select
          value={employe}
          onChange={(e) => setEmploye(Number(e.target.value))}
          required
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value={0} disabled>
            -- Sélectionner un employé --
          </option>

          {availableEmployes.length === 0 && !pointage && (
            <option disabled>Tous les employés ont pointé aujourd’hui</option>
          )}

          {availableEmployes.map((emp) => (
            <option key={emp.id} value={emp.id}>
              {emp.nom} {emp.prenoms}
            </option>
          ))}
        </select>
      </div>

      {/* Heure début */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Début</label>
        <input
          type="datetime-local"
          value={heure_debut}
          onChange={(e) => setHeureDebut(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Heure fin */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Fin</label>
        <input
          type="datetime-local"
          value={heure_fin}
          onChange={(e) => setHeureFin(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Remarque */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Remarque</label>
        <textarea
          value={remarque}
          onChange={(e) => setRemarque(e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Bouton */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
      >
        {pointage ? 'Modifier' : 'Ajouter'}
      </button>
    </form>
  );
};

export default PointageForm;