// src/pages/Reservations/ReservationForm.tsx
import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatchType, RootStateType } from '../../../Redux/Store';
import { getAllClients } from '../../../Redux/AsyncThunk/ClientThunk';
import { getAllServices } from '../../../Redux/AsyncThunk/ServiceThunk';

type Props = {
  reservation?: any;
  onClose?: () => void;
  onSubmit: (payload: {
    statut_reservation: string;
    montant_total: number;
    client_id: number;
    services: number[];
    created_at: string;
  }) => void;
  loading?: boolean;
};

export default function ReservationForm({
  reservation,
  onClose,
  onSubmit,
  loading,
}: Props) {
  const dispatch = useDispatch<AppDispatchType>();
  const { datas: clients } = useSelector((state: RootStateType) => state.Clients);
  const { datas: services } = useSelector((state: RootStateType) => state.Service);
  const { datas: reservations } = useSelector((state: RootStateType) => state.reservation);

  const [selectedServices, setSelectedServices] = useState<number[]>(
    reservation?.services?.map((s: any) => s.id) || []
  );

  const minDate = useMemo(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().substring(0, 10);
  }, []);

  const [createdAt, setCreatedAt] = useState<string>(
    reservation?.created_at
      ? new Date(reservation.created_at).toISOString().substring(0, 10)
      : minDate
  );

  useEffect(() => {
    dispatch(getAllClients());
    dispatch(getAllServices());
  }, [dispatch]);

  const totalAmount = useMemo(() => {
    return services
      .filter(s => selectedServices.includes(s.id))
      .reduce((sum, s) => sum + s.prix, 0);
  }, [selectedServices, services]);

  const computedStatus = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10);
    return createdAt === today ? 'En cours d\'exécution' : 'En attente';
  }, [createdAt]);

  const reservedServiceIdsOnDate = useMemo(() => {
    const dateKey = new Date(createdAt).toISOString().slice(0, 10);
    return reservations
      .filter(r =>
        r.created_at?.slice(0, 10) === dateKey &&
        (r.statut_reservation as string) !== 'Terminé'
      )
      .flatMap(r => r.services?.map((s: any) => s.id) || []);
  }, [createdAt, reservations]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    const payload = {
      statut_reservation: computedStatus,
      montant_total: totalAmount,
      client_id: Number((form.elements.namedItem('client_id') as HTMLSelectElement).value),
      services: selectedServices,
      created_at: createdAt,
    };

    console.log("Payload envoyé :", payload);
    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h3 className="text-2xl font-semibold text-gray-800">
        {reservation ? 'Modifier' : 'Ajouter'} une réservation
      </h3>

      {/* Date de réservation */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Date de réservation</label>
        <input
          type="date"
          value={createdAt}
          min={minDate}
          onChange={(e) => setCreatedAt(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
        <p className="text-xs text-gray-500 mt-1">Vous ne pouvez pas réserver pour aujourd'hui.</p>
      </div>

      {/* Statut automatique */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Statut (automatique)</label>
        <input
          type="text"
          value={computedStatus}
          readOnly
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700"
        />
      </div>

      {/* Montant total */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Montant Total (Ar)</label>
        <input
          type="number"
          value={totalAmount}
          readOnly
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700"
        />
      </div>

      {/* Client */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Client</label>
        <select
          name="client_id"
          defaultValue={reservation?.client?.id || ''}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="" disabled>-- Choisir un client --</option>
          {clients.map((c: any) => (
            <option key={c.id} value={c.id}>
              {c.nom_client} {c.prenom_client}
            </option>
          ))}
        </select>
      </div>

      {/* Services avec blocage conditionnel */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Services</label>
        <div className="mt-2 grid grid-cols-2 gap-2 max-h-48 overflow-y-auto border border-gray-300 rounded-md p-3 bg-gray-50">
          {services.map((s: any) => {
            const isReserved = reservedServiceIdsOnDate.includes(s.id);
            const reservationInfo = reservations.find(
              r =>
                r.created_at?.slice(0, 10) === new Date(createdAt).toISOString().slice(0, 10) &&
                r.services?.some((srv: any) => srv.id === s.id) &&
                (r.statut_reservation as string) !== 'Terminé'
            );

            return (
              <label
                key={s.id}
                className={`flex items-center space-x-2 text-sm ${isReserved ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <input
                  type="checkbox"
                  disabled={isReserved}
                  checked={selectedServices.includes(s.id)}
                  onChange={() =>
                    setSelectedServices(prev =>
                      prev.includes(s.id)
                        ? prev.filter(id => id !== s.id)
                        : [...prev, s.id]
                    )
                  }
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span>
                  {s.denomination} - {s.prix.toLocaleString()} Ar
                  {isReserved && (
                    <span className="ml-1 text-xs text-red-500">
                      (Réservé le {createdAt} – statut : {reservationInfo?.statut_reservation})
                    </span>
                  )}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Boutons */}
      <div className="flex justify-end space-x-3 pt-4">
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-100"
          >
            Annuler
          </button>
        )}
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Chargement…' : reservation ? 'Modifier' : 'Ajouter'}
        </button>
      </div>
    </form>
  );
}