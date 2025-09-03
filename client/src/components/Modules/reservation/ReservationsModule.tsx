// src/pages/Reservations/ReservationsModule.tsx
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

  // CRUD
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

  const openModal = (r?: any) => {
    setEditingReservation(r || null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingReservation(null);
  };

  const handleSubmit = async (payload: {
    statut_reservation: string;
    montant_total: number;
    client_id: number;
    services: number[];
    created_at: string;
  }) => {
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
    setExpandedReservations(prev => {
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
    const base = 'px-3 py-1 text-xs font-medium rounded-full';
    switch (status) {
      case 'Terminé':
        return `${base} bg-green-100 text-green-800`;
      case 'En cours d\'exécution':
        return `${base} bg-yellow-100 text-yellow-800`;
      case 'Annulé':
        return `${base} bg-red-100 text-red-800`;
      case 'En attente':
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

  // CALENDRIER
  const renderCalendar = () => {
    const year = calendarDate.getFullYear();
    const month = calendarDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const cells = [];
    const blanks = Array((firstDay + 6) % 7).fill(null);

    for (let d = 1; d <= daysInMonth; d++) {
      const day = new Date(year, month, d);
      const key = day.toISOString().slice(0, 10);
      const dayRes = reservations.filter(r => r.created_at?.slice(0, 10) === key);
      cells.push({ date: day, reservations: dayRes });
    }

    const weeks = [];
    const allCells = [...blanks, ...cells];
    for (let i = 0; i < allCells.length; i += 7) {
      weeks.push(allCells.slice(i, i + 7));
    }

    return (
      <div className="grid grid-cols-7 gap-1 text-center text-sm">
        {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map(day => (
          <div key={day} className="font-semibold text-gray-600 py-2">{day}</div>
        ))}
        {weeks.map((week, idx) =>
          week.map((cell, idx2) => {
            if (!cell) return <div key={`blank-${idx}-${idx2}`} />;
            const isToday = cell.date.toDateString() === new Date().toDateString();
            return (
              <div
                key={cell.date.toISOString()}
                className={`border rounded-md p-2 cursor-pointer hover:bg-blue-50 ${isToday ? 'bg-blue-100' : ''}`}
                onClick={() => setSelectedDay(cell.date)}
              >
                <div className="font-bold">{cell.date.getDate()}</div>
                {cell.reservations.length > 0 && (
                  <div className="mt-1 text-xs bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center mx-auto">
                    {cell.reservations.length}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    );
  };

  const DayModal = () => {
    if (!selectedDay) return null;
    const dayKey = selectedDay.toISOString().slice(0, 10);
    const dayRes = reservations.filter(r => r.created_at?.slice(0, 10) === dayKey);

    return (
      <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
          <h3 className="text-lg font-semibold mb-4">
            Réservations du {selectedDay.toLocaleDateString('fr-FR')}
          </h3>
          {dayRes.length ? (
            <ul className="space-y-2 max-h-60 overflow-y-auto">
              {dayRes.map(r => (
                <li key={r.id} className="border-b pb-2">
                  <span className="font-semibold">#{r.id}</span> – {r.client?.nom_client} {r.client?.prenom_client}
                  <p className="text-sm text-gray-600">{r.statut_reservation}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">Aucune réservation ce jour-là.</p>
          )}
          <button
            onClick={() => setSelectedDay(null)}
            className="mt-4 w-full bg-blue-500 text-white rounded py-2"
          >
            Fermer
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gestion des Réservations</h2>
          <p className="text-gray-600">Gérez les contrats de nettoyage et interventions</p>
        </div>
        <button
          onClick={() => openModal()}
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

      {/* Filtres */}
      <div className="rounded-xl shadow-sm border p-6 bg-white border-gray-200">
        <div className="flex items-center justify-between mb-6">
          {viewMode === 'calendar' && (
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCalendarDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1))}
                className="p-2 rounded-md hover:bg-gray-100"
              >
                <ChevronLeft size={20} />
              </button>
              <span className="font-semibold">
                {calendarDate.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
              </span>
              <button
                onClick={() => setCalendarDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1))}
                className="p-2 rounded-md hover:bg-gray-100"
              >
                <ChevronRight size={20} />
              </button>
              <button
                onClick={() => setCalendarDate(new Date())}
                className="text-sm bg-blue-500 text-white px-3 py-1 rounded"
              >
                Aujourd'hui
              </button>
            </div>
          )}
          <div className="flex items-center space-x-4">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Tous</option>
              <option value="En attente">En attente</option>
              <option value="En cours d'exécution">En cours d'exécution</option>
              <option value="Terminé">Terminé</option>
              <option value="Annulé">Annulé</option>
            </select>
          </div>
        </div>

        {/* Contenu selon mode */}
        {viewMode === 'list' && (
          <div className="space-y-4">
            {reservationAction.isLoading && <p className="text-center text-gray-500">Chargement…</p>}
            {filtered.map((r) => {
              const clientName = r.client
                ? `${r.client.nom_client} ${r.client.prenom_client}`
                : 'Client inconnu';

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
                  ) || []).map((e) => [e.id, e])
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
                      </div>

                      {assignedEmployees?.length > 0 && (
                        <div>
                          <strong>Employés : </strong>
                          {assignedEmployees.map((e) => `${e.nom} ${e.prenoms}`).join(', ')}
                        </div>
                      )}

                      <div className="flex justify-end space-x-2 pt-2">
                        <button
                          onClick={() => openModal(r)}
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
                        {r.statut_reservation === 'En attente' && (
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

        {viewMode === 'calendar' && (
          <div className="rounded-xl shadow-sm border p-6 bg-white">
            {renderCalendar()}
          </div>
        )}
      </div>

      {/* Modal formulaire */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
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

      {/* Modal jour calendrier */}
      {selectedDay && <DayModal />}
    </div>
  );
}