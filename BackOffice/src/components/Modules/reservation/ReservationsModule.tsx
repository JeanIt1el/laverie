import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Calendar,
  Clock,
  User,
  MapPin,
  Filter,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  List,
  Grid,
} from 'lucide-react';
import {
  getAllReservations,
  createReservation,
  updateReservation,
  deleteReservation,
} from '../../../Redux/AsyncThunk/ReservationThunk';
import { getAllServices } from '../../../Redux/AsyncThunk/ServiceThunk';
import { getEmployeesByServiceIds } from '../../../Redux/AsyncThunk/EmployeThunk';
import { getReservationState } from '../../../Redux/Slice/ReservationSlice';
import { getEmployeState } from '../../../Redux/Slice/EmployeSlice';
import { AppDispatchType } from '../../../Redux/Store';
import ReservationForm from './ReservationForm';

export default function ReservationsModule() {
  const dispatch = useDispatch<AppDispatchType>();

  const { datas: reservations, action: reservationAction } = useSelector(getReservationState);
  const { datas: employees } = useSelector(getEmployeState);

  const [filterStatus, setFilterStatus] = useState<'all' | 'En attente' | 'En cours d\'exécution' | 'Terminé' | 'Annulé'>('all');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReservation, setEditingReservation] = useState<any>(null);
  const [expandedReservations, setExpandedReservations] = useState<Set<number>>(new Set());

  useEffect(() => {
    dispatch(getAllReservations());
    dispatch(getAllServices());
  }, [dispatch]);

  const openModal = (r?: any) => {
    setEditingReservation(r || null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingReservation(null);
  };

  const handleSubmit = async (payload: any) => {
    if (editingReservation) {
      await dispatch(updateReservation({ id: editingReservation.id, ...payload }));
    } else {
      await dispatch(createReservation(payload));
    }
    closeModal();
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Supprimer cette réservation ?')) {
      await dispatch(deleteReservation(id));
    }
  };

  const handleConfirm = async (id: number) => {
    await dispatch(updateReservation({ id, statut_reservation: 'Terminé' }));
  };

  const toggleExpand = (id: number) => {
    setExpandedReservations((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const filtered = reservations.filter(
    (r) => filterStatus === 'all' || r.statut_reservation === filterStatus
  );

  const badge = (status: string) => {
    const base = 'px-3 py-1 rounded-full text-xs font-semibold';
    switch (status) {
      case 'Terminé':
        return `${base} bg-green-100 text-green-800`;
      case 'En cours d\'exécution':
        return `${base} bg-yellow-100 text-yellow-800`;
      case 'Annulé':
        return `${base} bg-red-100 text-red-800`;
      default:
        return `${base} bg-blue-100 text-blue-800`;
    }
  };

  const fmtDate = (iso: string) =>
    new Date(iso).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

  const fmtCurrency = (amount: number) => `${amount.toLocaleString()} Ar`;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header + Filters + View toggle */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900">Gestion des Réservations</h1>
          <p className="text-gray-600 mt-1">Suivi des contrats et interventions</p>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600 flex-grow sm:flex-grow-0"
          >
            <option value="all">Tous</option>
            <option value="En attente">En attente</option>
            <option value="En cours d'exécution">En cours d'exécution</option>
            <option value="Terminé">Terminé</option>
            <option value="Annulé">Annulé</option>
          </select>

          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
            <button
              className={`px-4 py-2 flex items-center gap-2 transition-colors ${
                viewMode === 'list' ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => setViewMode('list')}
              aria-label="Vue liste"
              title="Vue liste"
            >
              <List className="w-5 h-5" />
              Liste
            </button>
            <button
              className={`px-4 py-2 flex items-center gap-2 transition-colors ${
                viewMode === 'grid' ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => setViewMode('grid')}
              aria-label="Vue grille"
              title="Vue grille"
            >
              <Grid className="w-5 h-5" />
              Grille
            </button>
          </div>

          <button
            onClick={() => openModal()}
            className="bg-indigo-600 text-white rounded-lg px-5 py-2 hover:bg-indigo-700 flex items-center justify-center gap-2
            font-semibold transition-shadow shadow-md hover:shadow-lg flex-shrink-0"
          >
            <Plus className="w-5 h-5" />
            <span>Nouvelle réservation</span>
          </button>
        </div>
      </div>

      {/* Vue liste */}
      {viewMode === 'list' && (
        <ul className="space-y-6">
          {reservationAction.isLoading && (
            <p className="text-center text-gray-500">Chargement des réservations...</p>
          )}
          {filtered.map((r) => {
            const client = r.client;
            const clientName = client
              ? `${client.nom_client} ${client.prenom_client}`
              : 'Client inconnu';
            const paid = r.paiements?.reduce((sum: number, p: any) => sum + p.montant, 0) ?? 0;
            const remaining = (r.montant_total ?? 0) - paid;
            const isExpanded = expandedReservations.has(r.id);

            return (
              <li
                key={r.id}
                className="bg-white rounded-xl shadow-md p-6 flex flex-col lg:flex-row gap-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col gap-4 flex-grow">
                  <div className="flex items-center gap-4">
                    <Calendar className="text-indigo-600 w-12 h-12" />
                    <div>
                      <h3 className="text-2xl font-semibold text-gray-900 truncate" title={clientName}>
                        {clientName}
                      </h3>
                      {client && (
                        <div className="mt-1 space-y-0.5 text-sm text-gray-600 max-w-md">
                          <p><span className="font-medium">Téléphone:</span> {client.phone_client || 'Non renseigné'}</p>
                          <p><span className="font-medium">Email:</span> {client.email_client || 'Non renseigné'}</p>
                          <p className="truncate max-w-sm"><span className="font-medium">Adresse:</span> {client.adresse_client || 'Non renseignée'}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="mt-4 border border-gray-200 rounded-lg p-4 bg-gray-50 text-gray-700 text-sm space-y-3">
                      <p><strong>Date réservation :</strong> {fmtDate(r.created_at)}</p>
                      <p><strong>Montant total :</strong> {fmtCurrency(r.montant_total)}</p>
                      <p><strong>Payé :</strong> {fmtCurrency(paid)}</p>
                      <p><strong>Reste à payer :</strong> {fmtCurrency(remaining)}</p>
                      <p><strong>Services :</strong> {r.services?.map((s:any) => s.denomination || s.nom).join(', ')}</p>
                    </div>
                  )}
                </div>

                <div className="flex flex-col justify-end gap-4 shrink-0">
                  <span className={badge(r.statut_reservation)}>{r.statut_reservation}</span>

                  <button
                    onClick={() => toggleExpand(r.id)}
                    className="text-indigo-600 hover:text-indigo-800 flex items-center gap-1 font-semibold focus:outline-none"
                    aria-label={isExpanded ? 'Réduire détails' : 'Afficher détails'}
                  >
                    {isExpanded ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
                    {isExpanded ? 'Moins' : 'Plus'}
                  </button>

                  <button
                    onClick={() => openModal(r)}
                    className="bg-blue-100 text-blue-800 rounded-lg px-4 py-1 hover:bg-blue-200 flex items-center gap-2 font-semibold"
                  >
                    <Edit className="w-5 h-5" />
                    Modifier
                  </button>

                  <button
                    onClick={() => handleDelete(r.id)}
                    className="bg-red-100 text-red-800 rounded-lg px-4 py-1 hover:bg-red-200 flex items-center gap-2 font-semibold"
                  >
                    <Trash2 className="w-5 h-5" />
                    Supprimer
                  </button>

                  {r.statut_reservation === 'En attente' && (
                    <button
                      onClick={() => handleConfirm(r.id)}
                      className="bg-green-600 text-white rounded-lg px-4 py-1 hover:bg-green-700 flex items-center gap-2 font-semibold"
                    >
                      <CheckCircle className="w-5 h-5" />
                      Terminer
                    </button>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {/* Vue grille */}
      {viewMode === 'grid' && (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {reservationAction.isLoading && (
            <p className="text-center text-gray-500 col-span-full">Chargement des réservations...</p>
          )}

          {filtered.map((r) => {
            const client = r.client;
            const clientName = client
              ? `${client.nom_client} ${client.prenom_client}`
              : 'Client inconnu';
            const paid = r.paiements?.reduce((sum: number, p: any) => sum + p.montant, 0) ?? 0;
            const remaining = (r.montant_total ?? 0) - paid;
            const isExpanded = expandedReservations.has(r.id);

            return (
              <li
                key={r.id}
                className="bg-white rounded-xl shadow-md p-6 flex flex-col hover:shadow-lg transition-shadow min-h-[360px]"
              >
                <div className="flex flex-col flex-grow space-y-4">
                  <div className="flex items-center gap-4">
                    <Calendar className="text-indigo-600 w-12 h-12 flex-shrink-0" />
                    <div>
                      <h3 className="text-2xl font-semibold text-gray-900 truncate" title={clientName}>
                        {clientName}
                      </h3>
                      {client && (
                        <div className="mt-1 space-y-1 text-sm text-gray-600 max-w-md">
                          <p><span className="font-medium">Téléphone:</span> {client.phone_client || 'Non renseigné'}</p>
                          <p><span className="font-medium">Email:</span> {client.email_client || 'Non renseigné'}</p>
                          <p className="truncate max-w-sm"><span className="font-medium">Adresse:</span> {client.adresse_client || 'Non renseignée'}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 text-gray-700 text-sm space-y-3">
                      <p><strong>Date réservation :</strong> {fmtDate(r.created_at)}</p>
                      <p><strong>Montant total :</strong> {fmtCurrency(r.montant_total)}</p>
                      <p><strong>Payé :</strong> {fmtCurrency(paid)}</p>
                      <p><strong>Reste à payer :</strong> {fmtCurrency(remaining)}</p>
                      <p><strong>Services :</strong> {r.services?.map((s:any) => s.denomination || s.nom).join(', ')}</p>
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200 flex flex-wrap gap-2 justify-end">
                  <span className={badge(r.statut_reservation)}>{r.statut_reservation}</span>

                  <button
                    onClick={() => toggleExpand(r.id)}
                    className="text-indigo-600 hover:text-indigo-800 flex items-center gap-1 font-semibold focus:outline-none"
                    aria-label={isExpanded ? 'Réduire détails' : 'Afficher détails'}
                  >
                    {isExpanded ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
                    {isExpanded ? 'Moins' : 'Plus'}
                  </button>

                  <button
                    onClick={() => openModal(r)}
                    className="bg-blue-100 text-blue-800 rounded-lg px-3 py-1 hover:bg-blue-200 flex items-center gap-2 font-semibold"
                  >
                    <Edit className="w-5 h-5" />
                    Modifier
                  </button>

                  <button
                    onClick={() => handleDelete(r.id)}
                    className="bg-red-100 text-red-800 rounded-lg px-3 py-1 hover:bg-red-200 flex items-center gap-2 font-semibold"
                  >
                    <Trash2 className="w-5 h-5" />
                    Supprimer
                  </button>

                  {r.statut_reservation === 'En attente' && (
                    <button
                      onClick={() => handleConfirm(r.id)}
                      className="bg-green-600 text-white rounded-lg px-3 py-1 hover:bg-green-700 flex items-center gap-2 font-semibold"
                    >
                      <CheckCircle className="w-5 h-5" />
                      Terminer
                    </button>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm px-4">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6">
            <ReservationForm
              reservation={editingReservation}
              onClose={closeModal}
              onSubmit={handleSubmit}
              loading={reservationAction.isCreating || reservationAction.isUpdating}
            />
          </div>
        </div>
      )}
    </div>
  );
}
