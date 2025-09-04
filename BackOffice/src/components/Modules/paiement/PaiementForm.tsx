// src/pages/Paiement/PaiementForm.tsx
import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatchType, RootStateType } from '../../../Redux/Store';
import { getAllReservations } from '../../../Redux/AsyncThunk/ReservationThunk';
import { getAllModePaiements } from '../../../Redux/AsyncThunk/ModePaiementThunk';
import { PaiementType } from '../../../types';

type PaiementFormProps = {
  paiement?: PaiementType;
  onSubmit: (data: {
    montant: number;
    status: string;
    reservation_id: number;
    mode_paiement_id?: number | null;
  }) => void;
  loading?: boolean;
};

const PaiementForm: React.FC<PaiementFormProps> = ({ paiement, onSubmit, loading }) => {
  const dispatch = useDispatch<AppDispatchType>();

  // États locaux
  const [montant, setMontant] = useState<number>(paiement?.montant || 0);
  const [reservationId, setReservationId] = useState<number>(paiement?.reservation?.id || 0);
  const [modePaiementId, setModePaiementId] = useState<number | null>(paiement?.mode_paiement?.id || null);

  // Données Redux
  const reservations = useSelector((state: RootStateType) => state.reservation?.datas || []);
  const modes = useSelector((state: RootStateType) => state.ModePaiement?.datas || []);

  // Chargement des données
  useEffect(() => {
    dispatch(getAllReservations());
    dispatch(getAllModePaiements());
  }, [dispatch]);

  // Pré-remplissage en édition
  useEffect(() => {
    if (paiement) {
      setMontant(paiement.montant);
      setReservationId(paiement.reservation?.id ?? 0);
      setModePaiementId(paiement.mode_paiement?.id ?? null);
    }
  }, [paiement]);

  // Montant total de la réservation sélectionnée
  const reservationTotal = useMemo(() => {
    const res = reservations.find(r => r.id === reservationId);
    return res?.montant_total || 0;
  }, [reservationId, reservations]);

  // Statut automatique (payé ou partiel)
  const computedStatus = useMemo(() => {
    if (!reservationTotal) return 'en attente';
    return montant >= reservationTotal ? 'payé' : 'partiel';
  }, [montant, reservationTotal]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      montant,
      status: computedStatus,
      reservation_id: reservationId,
      mode_paiement_id: modePaiementId,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Montant */}
      <div>
        <label className="block mb-2 font-semibold">Montant *</label>
        <input
          type="number"
          step="0.01"
          value={montant}
          onChange={(e) => setMontant(parseFloat(e.target.value))}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Réservation */}
      <div>
        <label className="block mb-2 font-semibold">Réservation *</label>
        <select
          value={reservationId}
          onChange={(e) => setReservationId(Number(e.target.value))}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value={0} disabled>-- Choisir une réservation --</option>
          {reservations.map((r) => (
            <option key={r.id} value={r.id}>
              #{r.id} - {r.client?.nom_client ?? 'Client'} [{r.statut_reservation ?? 'N/A'}] - {r.montant_total?.toLocaleString()} Ar
            </option>
          ))}
        </select>
      </div>

      {/* Mode de paiement */}
      <div>
        <label className="block mb-2 font-semibold">Mode de paiement</label>
        <select
          value={modePaiementId ?? ''}
          onChange={(e) => setModePaiementId(e.target.value ? Number(e.target.value) : null)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">-- Choisir un mode --</option>
          {modes.map((m) => (
            <option key={m.id} value={m.id}>
              {m.denomination_paie}
            </option>
          ))}
        </select>
      </div>

      {/* Statut automatique (lecture seule) */}
      <div>
        <label className="block mb-2 font-semibold">Statut (automatique)</label>
        <input
          type="text"
          value={computedStatus}
          readOnly
          className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
      >
        {paiement ? 'Modifier' : 'Ajouter'}
      </button>
    </form>
  );
};

export default PaiementForm;