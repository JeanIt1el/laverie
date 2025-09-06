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
  ChevronLeft,
  ChevronRight,
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
import { getServiceState } from '../../../Redux/Slice/ServiceSlice';
import { getEmployeState } from '../../../Redux/Slice/EmployeSlice';
import { AppDispatchType } from '../../../Redux/Store';
import ReservationForm from './ReservationForm';

export default function ReservationsModule() {
  const dispatch = useDispatch<AppDispatchType>();

  const { datas: reservations, action: reservationAction } = useSelector(getReservationState);
  const { datas: services } = useSelector(getServiceState);
  const { datas: employees } = useSelector(getEmployeState);

  const [filterStatus, setFilterStatus] = useState<'all' | 'En attente' | 'En cours d\'exécution' | 'Terminé' | 'Annulé'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReservation, setEditingReservation] = useState<any>(null);
  const [expandedReservations, setExpandedReservations] = useState<Set<number>>(new Set());
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);

  useEffect(() => {
    dispatch(getAllReservations());
    dispatch(getAllServices());
  }, [dispatch]);

  useEffect(() => {
    const serviceIds = reservations.flatMap((r) => r.services?.map((s: any) => s.id) || []);
    if (serviceIds.length > 0) {
      dispatch(getEmployeesByServiceIds([...new Set(serviceIds)]));
    }
  }, [dispatch, reservations]);

  // Ouvre le modal avec la réservation à modifier ou vide pour nouveau
  const openModal = (r?: any) => {
    setEditingReservation(r ?? null);  // r ou null si pas défini
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
    (r) => filterStatus === 'all' || r.statut_reservation.toLowerCase() === filterStatus.toLowerCase()
  );

  const badge = (status: string) => {
    const base = 'px-3 py-1 text-xs font-medium rounded-full';
    switch (status?.toLowerCase()) {
      case 'terminé':
        return `${base} bg-green-100 text-green-800`;
      case "en cours d'exécution":
        return `${base} bg-yellow-100 text-yellow-800`;
      case 'annulé':
        return `${base} bg-red-100 text-red-800`;
      default:
        return `${base} bg-blue-100 text-blue-800`;
    }
  };

  const fmtDate = (iso: string) =>
    new Date(iso).toLocaleDateString('fr-FR', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

  const fmtCurrency = (amount: number) => `${amount.toLocaleString()} Ar`;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gestion des Réservations</h2>
          <p className="text-gray-600">Gérez les contrats de nettoyage et interventions</p>
        </div>
        <button
          onClick={() => openModal()}  // Nouveau formulaire
          className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-lg hover:shadow-lg flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Nouvelle Réservation</span>
        </button>
      </div>

      {/* Vue Toggle */}
      <div className="flex space-x-4 mb-4">
        <button
          className={`px-4 py-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
          onClick={() => setViewMode('list')}
        >
          Vue Liste
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${viewMode === 'calendar' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
          onClick={() => setViewMode('calendar')}
        >
          Vue Calendrier
        </button>
      </div>

      {/* Liste des réservations */}
      {viewMode === 'list' && (
        <div className="space-y-4">
          {reservationAction.isLoading && <p className="text-center text-gray-500">Chargement…</p>}
          {filtered.map((r) => {
            const clientName = r.client ? `${r.client.nom_client} ${r.client.prenom_client}` : 'Client inconnu';
            const paid = r.paiements?.reduce((sum: number, p: any) => sum + p.montant, 0) ?? 0;
            const remaining = r.montant_total - paid;

            const assignedEmployees = [
              ...new Map(
                (r.services?.flatMap((s: any) =>
                  Array.isArray(employees)
                    ? employees.filter((e) =>
                        Array.isArray(e.services) && e.services.some((srv: any) => srv.id === s.id)
                      )
                    : []
                ) || []).map(e => [e.id, e])
              ).values(),
            ];

            const isExpanded = expandedReservations.has(r.id);

            return (
              <div key={r.id} className="border rounded-lg p-4 bg-white hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Calendar className="w-8 h-8 bg-blue-500 text-white rounded-full p-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Réservation #{r.id}</h3>
                      <p className="text-sm text-gray-600">{clientName}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={badge(r.statut_reservation)}>{r.statut_reservation}</span>
                    <button onClick={() => toggleExpand(r.id)} className="text-blue-500 hover:text-blue-700">
                      {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                  </div>
                </div>

                {isExpanded && (
                  <div className="mt-4 space-y-3 text-sm text-gray-700">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>{fmtDate(r.created_at)}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <span>{fmtCurrency(paid)} payé</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4" />
                        <span>{fmtCurrency(remaining)} reste</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>{r.services?.length || 0} service(s)</span>
                      </div>

                      {/* Infos client */}
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <span>Email: {r.client?.email_client || 'Non renseigné'}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <span>Téléphone: {r.client?.phone_client || 'Non renseigné'}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4" />
                        <span>Adresse: {r.client?.adresse_client || 'Non renseigné'}</span>
                      </div>
                    </div>

                    <div className="pt-2">
                      <strong>Employés : </strong>
                      {assignedEmployees.length > 0
                        ? assignedEmployees.map((e) => `${e.nom} ${e.prenoms}`).join(', ')
                        : 'Aucun employé'}
                    </div>

                    <div className="flex justify-end space-x-2 pt-2">
                      <button
                        onClick={() => openModal(r)}  // ici le bouton modifier fonctionne
                        className="flex items-center space-x-1 px-3 py-1 text-blue-500 hover:bg-blue-50 rounded-lg"
                      >
                        <Edit size={16} />
                        <span>Modifier</span>
                      </button>
                      <button
                        onClick={() => handleDelete(r.id)}
                        className="flex items-center space-x-1 px-3 py-1 text-red-500 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 size={16} />
                        <span>Supprimer</span>
                      </button>
                      {r.statut_reservation?.toLowerCase() === 'en attente' && (
                        <button
                          onClick={() => handleConfirm(r.id)}
                          className="flex items-center space-x-1 px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700"
                        >
                          <CheckCircle size={16} />
                          <span>Terminer</span>
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Modal formulaire réservation */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm px-4">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6">
            <ReservationForm
              reservation={editingReservation}  // passe bien la réservation pour modification
              onClose={closeModal}
              onSubmit={handleSubmit}
              loading={reservationAction.isCreating || reservationAction.isUpdating}
              employees={employees}
              services={services}
            />
          </div>
        </div>
      )}

      {/* Modal jour calendrier (optionnelle) */}

    </div>
  );
}
