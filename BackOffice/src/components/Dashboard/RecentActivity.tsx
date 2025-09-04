import React from 'react';
import { Clock, User, Calendar, CreditCard, MapPin } from 'lucide-react';

interface ActivityItem {
  id: string;
  type: 'client' | 'reservation' | 'payment';
  message: string;
  time: string;
  icon: React.ElementType;
  color: string;
  location?: string;
}

export default function RecentActivity() {
  const activities: ActivityItem[] = [
    {
      id: '1',
      type: 'client',
      message: 'Nouveau client: Hôtel Sakamanga',
      time: 'Il y a 2 heures',
      icon: User,
      color: 'bg-blue-100 text-blue-600',
      location: 'Antananarivo'
    },
    {
      id: '2',
      type: 'reservation',
      message: 'Nettoyage terrain confirmé - Zone Industrielle',
      time: 'Il y a 4 heures',
      icon: Calendar,
      color: 'bg-emerald-100 text-emerald-600',
      location: 'Ankorondrano'
    },
    {
      id: '3',
      type: 'payment',
      message: 'Paiement reçu - Hôtel Colbert - 850,000 Ar',
      time: 'Il y a 6 heures',
      icon: CreditCard,
      color: 'bg-purple-100 text-purple-600'
    },
    {
      id: '4',
      type: 'reservation',
      message: 'Entretien espaces verts terminé',
      time: 'Il y a 8 heures',
      icon: Calendar,
      color: 'bg-emerald-100 text-emerald-600',
      location: 'Ivandry'
    },
    {
      id: '5',
      type: 'payment',
      message: 'Paiement en retard: Nettoyage bureau - 180,000 Ar',
      time: 'Il y a 1 jour',
      icon: CreditCard,
      color: 'bg-red-100 text-red-600'
    }
  ];

  return (
    <div className="rounded-xl shadow-sm border p-6 bg-white border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Activités Récentes</h3>
        <button className="text-sm text-emerald-500 hover:text-emerald-600 font-medium">Voir Tout</button>
      </div>

      <div className="space-y-4">
        {activities.map((activity) => {
          const Icon = activity.icon;
          return (
            <div key={activity.id} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activity.color}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">
                  {activity.message}
                </p>
                <div className="flex items-center space-x-2 mt-1">
                  <Clock className="w-3 h-3 text-gray-400" />
                  <span className="text-xs text-gray-500">{activity.time}</span>
                  {activity.location && (
                    <>
                      <MapPin className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-500">{activity.location}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
