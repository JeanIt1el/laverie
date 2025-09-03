// src/pages/Planning/PlanningModule.tsx
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Filter, Plus, Edit, Trash2 } from 'lucide-react';
import {
  getAllPointages,
  createPointage,
  updatePointage,
  deletePointage,
} from '../../../Redux/AsyncThunk/PointageThunk';
import { getPointageState } from '../../../Redux/Slice/PointageSlice';
import { getAllEmployes } from '../../../Redux/AsyncThunk/EmployeThunk';
import { AppDispatchType, RootStateType } from '../../../Redux/Store';
import { PointageType } from '../../../types';
import PointageForm from './PointageForm';

// FullCalendar
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import frLocale from '@fullcalendar/core/locales/fr';

export default function PlanningModule() {
  const dispatch = useDispatch<AppDispatchType>();
  const { datas: pointages, action } = useSelector(getPointageState);
  const employes = useSelector((state: RootStateType) => state.Employe.datas);

  const [filterEmployee, setFilterEmployee] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editPointage, setEditPointage] = useState<PointageType | null>(null);

  useEffect(() => {
    dispatch(getAllPointages());
    dispatch(getAllEmployes());
  }, [dispatch]);

  /* ── Helpers ── */
  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString('fr-FR', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

  const formatTime = (iso: string) =>
    new Date(iso).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });

  /* ── CRUD Handlers ── */
  const handleCreate = async (data: {
    employe: number;
    heure_debut: string;
    heure_fin: string;
    remarque?: string;
  }) => {
    await dispatch(
      createPointage({
        employe_id: data.employe,
        heure_debut: data.heure_debut,
        heure_fin: data.heure_fin,
        remarque: data.remarque,
      })
    ).unwrap();
    setIsAddModalOpen(false);
  };

  const handleUpdate = async (data: {
    employe: number;
    heure_debut: string;
    heure_fin: string;
    remarque?: string;
  }) => {
    if (!editPointage) return;
    await dispatch(
      updatePointage({
        id: editPointage.id,
        employe: data.employe,
        heure_debut: data.heure_debut,
        heure_fin: data.heure_fin,
        remarque: data.remarque,
      })
    ).unwrap();
    setEditPointage(null);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Supprimer ce pointage ?')) {
      dispatch(deletePointage(id));
    }
  };

  /* ── Filtrage ── */
  const filtered = pointages.filter(
    (p) => filterEmployee === 'all' || p.employe?.id.toString() === filterEmployee
  );

  const calendarEvents = filtered
    .filter((p) => p.heure_fin)
    .map((p) => ({
      title: `${p.employe?.nom} ${p.employe?.prenoms}`,
      start: p.heure_debut,
      end: p.heure_fin!,
      extendedProps: {
        remarque: p.remarque,
      },
    }));

  /* ── Empêcher les doublons dans la journée ── */
  const today = new Date().toISOString().split('T')[0];

  const employeeIdsWithPointageToday = pointages
    .filter((p) => {
      const date = new Date(p.heure_debut).toISOString().split('T')[0];
      return date === today;
    })
    .map((p) => p.employe?.id)
    .filter(Boolean) as number[];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Planning des Pointages</h2>
          <p className="text-gray-600">Gérez les heures de travail des employés</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Ajouter Pointage</span>
        </button>
      </div>

      {/* Filters */}
      <div className="rounded-xl shadow-sm border p-6 bg-white border-gray-200">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="flex space-x-4">
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                viewMode === 'list' ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Vue Liste
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                viewMode === 'calendar' ? 'bg-indigo-600 text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Vue Calendrier
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={filterEmployee}
              onChange={(e) => setFilterEmployee(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white border-gray-200"
            >
              <option value="all">Tous les employés</option>
              {employes.map((e) => (
                <option key={e.id} value={e.id.toString()}>
                  {e.nom} {e.prenoms}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Vue Liste */}
      {viewMode === 'list' && (
        <div className="space-y-4">
          {action.isLoading && <p className="text-center text-gray-500">Chargement...</p>}
          {filtered.map((p: PointageType) => (
            <div key={p.id} className="border rounded-lg p-4 bg-white shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-900">{formatDate(p.created_at)}</p>
                  <p className="text-sm text-gray-600">
                    {formatTime(p.heure_debut)} –{' '}
                    {p.heure_fin ? formatTime(p.heure_fin) : 'En cours'}
                  </p>
                  {p.remarque && (
                    <p className="text-sm italic text-gray-500 mt-1">
                      Remarque : {p.remarque}
                    </p>
                  )}
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setEditPointage(p)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Vue Calendrier */}
      {viewMode === 'calendar' && (
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin]}
          initialView="dayGridMonth"
          locale={frLocale}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          events={calendarEvents}
          eventContent={(info) => (
            <div className="text-xs">
              <strong>{info.event.title}</strong>
              <br />
              {info.timeText}
              {info.event.extendedProps.remarque && (
                <>
                  <br />
                  <span className="italic">({info.event.extendedProps.remarque})</span>
                </>
              )}
            </div>
          )}
          height="auto"
        />
      )}

      {/* Modale Ajouter */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-8 relative">
            <header className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Ajouter un pointage</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-gray-500 hover:text-gray-900"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </header>
            <PointageForm
              onSubmit={handleCreate}
              loading={action.isCreating}
              excludedEmployeeIds={employeeIdsWithPointageToday}
            />
          </div>
        </div>
      )}

      {/* Modale Modifier */}
      {editPointage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-8 relative">
            <header className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Modifier le pointage</h3>
              <button
                onClick={() => setEditPointage(null)}
                className="text-gray-500 hover:text-gray-900"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </header>
            <PointageForm
              pointage={editPointage}
              onSubmit={handleUpdate}
              loading={action.isUpdating}
            />
          </div>
        </div>
      )}
    </div>
  );
}