import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Bell, ChevronDown, User, X } from "lucide-react";
import { getReservationState } from "../../Redux/Slice/ReservationSlice";

interface HeaderProps {
  userRole: "admin" | "superviseur" | "employe";
  userName: string;
}

const roleLabels = {
  admin: "Administrateur",
  superviseur: "Superviseur",
  employe: "Employé",
};

type Notification = {
  id: number;
  type: "Réservation" | "Aide" | "Idée";
  message: string;
  date: string;
};

export default function Header({ userRole, userName }: HeaderProps) {
  const { datas: reservations } = useSelector(getReservationState);
  const navigate = useNavigate();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const notifiedIds = useRef<Set<number>>(new Set());

  useEffect(() => {
    const newReserveNotifs = reservations.filter(
      (r) =>
        r.statut_reservation?.toLowerCase() === "en attente" &&
        !notifiedIds.current.has(r.id)
    );

    if (newReserveNotifs.length > 0) {
      const notifsToAdd = newReserveNotifs.map((r) => ({
        id: r.id,
        type: "Réservation",
        message: `Nouvelle réservation #${r.id} en attente de validation.`,
        date: new Date(r.created_at).toLocaleString(),
      }));

      notifsToAdd.forEach((n) => notifiedIds.current.add(n.id));
      setNotifications((old) => [...notifsToAdd, ...old]);
    }
  }, [reservations]);

  const handleClickNotification = (notif: Notification) => {
    setIsNotifOpen(false);
    setNotifications((old) => old.filter((n) => n.id !== notif.id));
    navigate("/reservations", { state: { viewedReservationId: notif.id } });
  };

  return (
    <header className="shadow-sm border-b bg-white border-gray-200 px-6 py-1 relative z-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-bold text-gray-900">Tableau de Bord</h2>
          <div className="h-6 w-px bg-gray-300"></div>
          <span className="text-sm text-gray-500">{roleLabels[userRole]}</span>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <button
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              aria-label="Afficher notifications"
              className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 relative"
            >
              <Bell className="w-5 h-5" />
              {notifications.length > 0 && (
                <span
                  className="absolute -top-1 -right-1 min-w-[18px] h-4 bg-gradient-to-r from-red-500 to-pink-500 rounded-full text-white
                  text-xs font-semibold flex items-center justify-center px-1.5 select-none"
                  title={`${notifications.length} notifications non lues`}
                >
                  {notifications.length > 9 ? "9+" : notifications.length}
                </span>
              )}
            </button>

            {isNotifOpen && (
              <div
                className="absolute right-0 mt-2 w-96 max-h-96 overflow-y-auto rounded-lg border border-gray-300 bg-white shadow-xl ring-1 ring-black ring-opacity-5 origin-top-right animate-fade-in"
                style={{ animationDuration: "0.2s" }}
              >
                <div className="flex justify-between items-center p-4 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-800">Notifications</h3>
                  <button
                    onClick={() => setIsNotifOpen(false)}
                    aria-label="Fermer notifications"
                    className="p-1 rounded hover:bg-gray-200"
                  >
                    <X size={16} />
                  </button>
                </div>
                <ul className="divide-y divide-gray-100 max-h-72 overflow-auto">
                  {notifications.length > 0 ? (
                    notifications.map((notif) => (
                      <li
                        key={notif.id}
                        tabIndex={0}
                        onClick={() => handleClickNotification(notif)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ")
                            handleClickNotification(notif);
                        }}
                        className="p-4 hover:bg-gray-50 cursor-pointer transition"
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-indigo-600">
                            {notif.type}
                          </span>
                          <time className="text-xs text-gray-400">{notif.date}</time>
                        </div>
                        <p className="mt-1 text-sm text-gray-700">{notif.message}</p>
                      </li>
                    ))
                  ) : (
                    <li className="p-4 text-center text-gray-500">
                      Aucune notification
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-3 px-4 py-2 rounded-lg bg-gray-50">
            <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-900">{userName}</span>
              <span className="text-xs text-gray-500">{roleLabels[userRole]}</span>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from {opacity: 0; transform: scale(0.95);}
          to {opacity: 1; transform: scale(1);}
        }
        .animate-fade-in {
          animation-name: fade-in;
          animation-fill-mode: forwards;
        }
      `}</style>
    </header>
  );
}
