import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Calendar,
  Clock,
  User,
  MapPin,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  getAllReservations,
  createReservation,
  updateReservation,
  deleteReservation,
} from "../../../Redux/AsyncThunk/ReservationThunk";
import { getAllServices } from "../../../Redux/AsyncThunk/ServiceThunk";
import { getEmployeesByServiceIds } from "../../../Redux/AsyncThunk/EmployeThunk";
import { getReservationState } from "../../../Redux/Slice/ReservationSlice";
import { getServiceState } from "../../../Redux/Slice/ServiceSlice";
import { getEmployeState } from "../../../Redux/Slice/EmployeSlice";
import { AppDispatchType } from "../../../Redux/Store";
import ReservationForm from "./ReservationForm";
import { useLocation } from "react-router-dom";

const FILTER_OPTIONS = [
  "all",
  "en attente",
  "en cours d'exécution",
  "terminé",
  "annulé",
] as const;
type FilterStatus = typeof FILTER_OPTIONS[number];

export default function ReservationsModule() {
  const dispatch = useDispatch<AppDispatchType>();
  const location = useLocation();

  // Récupère l’id de la réservation cliquée dans notification
  const viewedReservationId = location.state?.viewedReservationId || null;

  const { datas: reservations, action: reservationAction } = useSelector(
    getReservationState
  );
  const { datas: services } = useSelector(getServiceState);
  const { datas: employees } = useSelector(getEmployeState);

  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReservation, setEditingReservation] = useState<any>(null);
  const [expandedReservations, setExpandedReservations] = useState<Set<number>>(
    new Set()
  );
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list");
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);

  useEffect(() => {
    const reloadData = () => {
      dispatch(getAllReservations());
      dispatch(getAllServices());
    };
    reloadData();
    const intervalId = setInterval(() => {
      reloadData();
    }, 10000);
    return () => clearInterval(intervalId);
  }, [dispatch]);

  useEffect(() => {
    const serviceIds = reservations.flatMap((r) => r.services?.map((s: any) => s.id) || []);
    if (serviceIds.length > 0) {
      dispatch(getEmployeesByServiceIds([...new Set(serviceIds)]));
    }
  }, [dispatch, reservations]);

  const openModal = (r?: any) => {
    setEditingReservation(r ?? null);
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
    dispatch(getAllReservations());
    dispatch(getAllServices());
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Supprimer cette réservation ?")) {
      await dispatch(deleteReservation(id));
      dispatch(getAllReservations());
      dispatch(getAllServices());
    }
  };

  const handleConfirm = async (id: number) => {
    await dispatch(updateReservation({ id, statut_reservation: "terminé" }));
    dispatch(getAllReservations());
    dispatch(getAllServices());
  };

  const toggleExpand = (id: number) => {
    setExpandedReservations((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const badge = (status: string) => {
    const base = "px-3 py-1 text-sm font-semibold rounded-full";
    switch (status?.toLowerCase()) {
      case "terminé":
        return `${base} bg-green-200 text-green-800`;
      case "en cours d'exécution":
        return `${base} bg-yellow-200 text-yellow-800`;
      case "annulé":
        return `${base} bg-red-200 text-red-800`;
      case "en attente":
        return `${base} bg-blue-200 text-blue-700`;
      default:
        return `${base} bg-gray-200 text-gray-800`;
    }
  };

  const fmtDate = (iso: string) =>
    new Date(iso).toLocaleDateString("fr-FR", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  const fmtCurrency = (amount: number) => `${amount.toLocaleString()} Ar`;

  const filtered = useMemo(() => {
    if (filterStatus === "all") return reservations;
    return reservations.filter(
      (r) => r.statut_reservation?.toLowerCase() === filterStatus.toLowerCase()
    );
  }, [filterStatus, reservations]);

  const NewReservationButton = () => (
    <button
      onClick={() => openModal()}
      className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center space-x-3 font-semibold transition"
    >
      <Plus className="w-5 h-5 opacity-90" />
      <span>Nouvelle Réservation</span>
    </button>
  );

  const ReservationCard = ({ r }: { r: any }) => {
    const paid = r.paiements?.reduce((sum: number, p: any) => sum + p.montant, 0) ?? 0;
    const remaining = r.montant_total - paid;

    const assignedEmployees = Array.from(
      new Map(
        (r.services?.flatMap((s: any) =>
          Array.isArray(employees)
            ? employees.filter((e) =>
                Array.isArray(e.services) && e.services.some((srv: any) => srv.id === s.id)
              )
            : []
        ) || []).map((e) => [e.id, e])
      ).values()
    );

    const isExpanded = expandedReservations.has(r.id);

    const isViewed = viewedReservationId === r.id;

    return (
      <div
        className={`border rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 ${
          isViewed ? "bg-yellow-50 border-yellow-400" : "bg-white border-gray-200"
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Calendar className="w-8 h-8 bg-blue-500 text-white rounded-full p-1" />
            <div>
              <h3 className="font-semibold text-gray-900 text-lg">{`Réservation #${r.id}`}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{`${r.client?.nom_client} ${r.client?.prenom_client}`}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span className={badge(r.statut_reservation)}>{r.statut_reservation}</span>
            <button
              onClick={() => toggleExpand(r.id)}
              className="text-blue-600 hover:text-blue-700 transition"
            >
              {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
          </div>
        </div>

        {isExpanded && (
          <div className="mt-5 space-y-4 text-gray-700 text-base leading-relaxed">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>{fmtDate(r.created_at)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span>{fmtCurrency(paid)} payé</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5" />
                <span>{fmtCurrency(remaining)} reste</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>{r.services?.length || 0} service(s)</span>
              </div>
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span>Email: {r.client?.email_client || "Non renseigné"}</span>
              </div>
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span>Téléphone: {r.client?.phone_client || "Non renseigné"}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5" />
                <span>Adresse: {r.client?.adresse_client || "Non renseigné"}</span>
              </div>
              <div className="col-span-2 flex flex-wrap gap-2">
                <strong>Services commandés :</strong>
                {r.services?.length
                  ? r.services.map((s) => (
                      <span
                        key={s.id}
                        className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full"
                      >
                        {s.denomination}
                      </span>
                    ))
                  : " Aucun service"}
              </div>
            </div>

            <div>
              <strong>Employés : </strong>
              {assignedEmployees.length ? (
                <ul className="list-disc list-inside ml-5">
                  {assignedEmployees.map((e) => (
                    <li key={e.id}>{`${e.nom} ${e.prenoms}`}</li>
                  ))}
                </ul>
              ) : (
                "Aucun employé"
              )}
            </div>

            <div className="flex justify-end space-x-3 pt-3">
              <button
                onClick={() => openModal(r)}
                className="flex items-center space-x-2 px-4 py-2 border border-blue-500 rounded-xl text-blue-600 hover:bg-blue-100 transition"
              >
                <Edit size={18} />
                <span>Modifier</span>
              </button>
              <button
                onClick={() => handleDelete(r.id)}
                className="flex items-center space-x-2 px-4 py-2 border border-red-500 rounded-xl text-red-600 hover:bg-red-100 transition"
              >
                <Trash2 size={18} />
                <span>Supprimer</span>
              </button>
              {r.statut_reservation?.toLowerCase() === "en attente" && (
                <button
                  onClick={() => handleConfirm(r.id)}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
                >
                  <CheckCircle size={18} />
                  <span>Terminer</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  // Calendrier complet
  const renderCalendar = () => {
    const year = calendarDate.getFullYear();
    const month = calendarDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const startOffset = (firstDayOfMonth + 6) % 7; // Adjust pour lundi = 0
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const blanks = Array(startOffset).fill(null);
    const days: { date: Date; reservationsOnDay: any[] }[] = [];

    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(year, month, d);
      const dateKey = date.toISOString().slice(0, 10);
      const reservationsOnDay = reservations.filter(
        (r) => r.created_at?.slice(0, 10) === dateKey
      );
      days.push({ date, reservationsOnDay });
    }

    const allCells = [...blanks, ...days];
    const weeks = [];
    for (let i = 0; i < allCells.length; i += 7) {
      weeks.push(allCells.slice(i, i + 7));
    }

    return (
      <div>
        <div className="flex items-center justify-center space-x-4 mb-4">
          <button
            onClick={() =>
              setCalendarDate(new Date(year, month - 1, calendarDate.getDate()))
            }
            className="p-2 rounded-md hover:bg-gray-100"
            aria-label="Mois précédent"
          >
            <ChevronLeft size={20} />
          </button>
          <span className="font-semibold text-lg">
            {calendarDate.toLocaleDateString("fr-FR", {
              month: "long",
              year: "numeric",
            })}
          </span>
          <button
            onClick={() =>
              setCalendarDate(new Date(year, month + 1, calendarDate.getDate()))
            }
            className="p-2 rounded-md hover:bg-gray-100"
            aria-label="Mois suivant"
          >
            <ChevronRight size={20} />
          </button>
          <button
            onClick={() => setCalendarDate(new Date())}
            className="ml-4 text-sm bg-blue-500 text-white px-3 py-1 rounded"
            aria-label="Aller à aujourd'hui"
          >
            Aujourd'hui
          </button>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center text-sm">
          {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map((day) => (
            <div key={day} className="font-semibold text-gray-600 py-2">
              {day}
            </div>
          ))}
          {weeks.map((week, wi) =>
            week.map((cell, di) => {
              if (!cell) return <div key={`blank-${wi}-${di}`} />;
              const isToday = cell.date.toDateString() === new Date().toDateString();
              const hasReservations = cell.reservationsOnDay.length > 0;
              return (
                <div
                  key={cell.date.toISOString()}
                  className={`border rounded-lg p-3 cursor-pointer hover:bg-blue-100 transition-colors duration-200 ${
                    isToday ? "bg-blue-100 shadow-inner" : ""
                  } ${hasReservations ? "bg-green-100 shadow-inner" : ""}`}
                  onClick={() => setSelectedDay(cell.date)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") setSelectedDay(cell.date);
                  }}
                  aria-label={`Jour ${cell.date.getDate()} ${
                    hasReservations ? `${cell.reservationsOnDay.length} réservations` : "pas de réservation"
                  }`}
                >
                  <div className="font-semibold text-lg">{cell.date.getDate()}</div>
                  {hasReservations && (
                    <div className="mt-1 text-xs bg-green-600 text-white rounded-full w-5 h-5 flex items-center justify-center mx-auto">
                      {cell.reservationsOnDay.length}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    );
  };

  // Modal affichant les réservations sur un jour sélectionné
  const DayModal = () => {
    if (!selectedDay) return null;
    const dayKey = selectedDay.toISOString().slice(0, 10);
    const dayReservations = reservations.filter(
      (r) => r.created_at?.slice(0, 10) === dayKey
    );

    return (
      <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
          <h3 className="text-lg font-semibold mb-4">
            Réservations du {selectedDay.toLocaleDateString("fr-FR")}
          </h3>
          {dayReservations.length ? (
            <ul className="space-y-4 max-h-60 overflow-y-auto">
              {dayReservations.map((r) => {
                const assignedEmployees = Array.from(
                  new Map(
                    (r.services?.flatMap((s: any) =>
                      Array.isArray(employees)
                        ? employees.filter((e) =>
                            Array.isArray(e.services) && e.services.some((srv: any) => srv.id === s.id)
                          )
                        : []
                    ) || []).map((e) => [e.id, e])
                  ).values()
                );
                return (
                  <li key={r.id} className="border-b pb-2">
                    <div className="font-semibold">
                      #{r.id} – {r.client?.nom_client} {r.client?.prenom_client}
                    </div>
                    <div className="text-sm text-gray-600">{r.statut_reservation}</div>
                    <div className="mt-1 text-green-700 font-medium">
                      Employés pour ce service :&nbsp;
                      {assignedEmployees.length > 0 ? (
                        <ul className="list-disc list-inside ml-5">
                          {assignedEmployees.map((e) => (
                            <li key={e.id}>
                              {e.nom} {e.prenoms}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        "Aucun employé assigné"
                      )}
                    </div>
                    <div className="mt-1">
                      <strong>Services commandés : </strong>
                      {(r.services?.map((s) => s.denomination).join(", ")) || "Aucun service"}
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-gray-500">Aucune réservation ce jour-là.</p>
          )}
          <button
            onClick={() => setSelectedDay(null)}
            className="mt-4 w-full bg-blue-500 text-white rounded py-2 hover:bg-blue-600 transition"
          >
            Fermer
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-10 bg-gray-50 min-h-screen p-8 font-sans">
      <header className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Gestion des Réservations
          </h1>
          <p className="mt-1 text-gray-600 text-lg font-medium">
            Gérez les contrats de nettoyage et interventions
          </p>
        </div>
        <NewReservationButton />
      </header>

      <div className="flex items-center space-x-4 mb-8">
        {FILTER_OPTIONS.map((opt) => (
          <button
            key={opt}
            onClick={() => setFilterStatus(opt)}
            className={`px-5 py-2 rounded-xl font-semibold transition ${
              filterStatus === opt
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-100 shadow"
            }`}
          >
            {opt.charAt(0).toUpperCase() + opt.slice(1)}
          </button>
        ))}
      </div>

      <div className="mb-8">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setViewMode("list")}
            className={`px-5 py-3 rounded-xl font-semibold transition ${
              viewMode === "list"
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-100 shadow"
            }`}
          >
            Vue Liste
          </button>
          <button
            onClick={() => setViewMode("calendar")}
            className={`px-5 py-3 rounded-xl font-semibold transition ${
              viewMode === "calendar"
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-100 shadow"
            }`}
          >
            Vue Calendrier
          </button>
        </div>
      </div>

      <div className="rounded-xl shadow-lg border border-gray-200 bg-white p-8">
        {viewMode === "list" && (
          <div className="space-y-8">
            {reservationAction.isLoading && (
              <p className="text-center text-gray-500">Chargement…</p>
            )}
            {filtered.map((r) => (
              <ReservationCard key={r.id} r={r} />
            ))}
          </div>
        )}

        {viewMode === "calendar" && <div>{renderCalendar()}</div>}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm px-4">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6">
            <ReservationForm
              reservation={editingReservation}
              onClose={closeModal}
              onSubmit={handleSubmit}
              loading={reservationAction.isCreating || reservationAction.isUpdating}
              employees={employees}
              services={services}
            />
          </div>
        </div>
      )}

      {selectedDay && <DayModal />}
    </div>
  );
}
