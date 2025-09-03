import { useState } from 'react';
import {
  LayoutDashboard,
  Users,
  Calendar,
  CreditCard,
  Wrench,
  Package,
  Clock,
  UserCheck,
  Shield,
  ChevronRight,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  userRole: 'admin' | 'superviseur' | 'employe';
}

const sidebarItems = [
  { id: 'dashboard', label: 'Tableau de Bord', icon: LayoutDashboard, path: '/dashboard' },
  { id: 'clients', label: 'Clients', icon: Users, path: '/clients' },
  { id: 'reservations', label: 'Réservations', icon: Calendar, path: '/reservations' },
  { id: 'payments', label: 'Paiements', icon: CreditCard, path: '/payments' },
  { id: 'services', label: 'Services', icon: Wrench, path: '/services' },
  { id: 'materials', label: 'Matériels', icon: Package, path: '/materials' },
  {
    id: 'employees',
    label: 'Employés',
    icon: UserCheck,
    adminOnly: true,
    path: '/employees',
    subItems: [
      { id: 'employees', label: 'Gestion Employés', icon: UserCheck, path: '/employees' },
      { id: 'planning', label: 'Pointage', icon: Clock, path: '/planning' },
      { id: 'roles', label: 'Rôles', icon: Shield, path: '/roles' }
    ]
  },
];

export default function Sidebar({ activeSection, onSectionChange, userRole }: SidebarProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>(['employees']);

  const filteredItems = sidebarItems.filter(item =>
    !item.adminOnly || userRole === 'admin'
  );

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const isSubItemActive = (subItems: any[]) => {
    return subItems.some(subItem => activeSection === subItem.id);
  };

  return (
    <div className="w-64 shadow-xl border-r bg-blue-600 border-gray-200 flex flex-col">
      {/* Logo avec image */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3 flex justify-center">
          <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
            <img 
              src="/src/components/Layout/logo.png" 
              alt="Laverie Logo" 
              className="w-full h-full object-contain "
            />
          </div>
        </div>
      </div>


      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {filteredItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          const isExpanded = expandedItems.includes(item.id);
          const hasSubItems = item.subItems && item.subItems.length > 0;
          const hasActiveSubItem = hasSubItems && isSubItemActive(item.subItems);

          return (
            <div key={item.id}>
              <NavLink to={item.path}
                onClick={() => {
                  if (hasSubItems) {
                    toggleExpanded(item.id);
                  } else {
                    onSectionChange(item.id);
                  }
                }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 ${isActive || hasActiveSubItem
                    ? 'bg-gradient-to-r from-blue-500 to-blue-500 text-white shadow-lg'
                    : 'text-white hover:bg-gray-100 hover:text-blue-600'
                  }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`w-5 h-5 ${isActive || hasActiveSubItem ? 'text-white' : 'text-white'}`} />
                  <span className="font-medium">{item.label}</span>
                </div>
                {hasSubItems && (
                  <div className={`transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}>
                    <ChevronRight className={`w-4 h-4 ${isActive || hasActiveSubItem ? 'text-white' : 'text-white'}`} />
                  </div>
                )}
              </NavLink>

              {hasSubItems && isExpanded && (
                <div className="ml-4 mt-2 space-y-1">
                  {item.subItems.map((subItem) => {
                    const SubIcon = subItem.icon;
                    const isSubActive = activeSection === subItem.id;

                    return (
                      <NavLink to={ subItem.path }
                        key={subItem.id}
                        onClick={() => onSectionChange(subItem.id)}
                        className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-all duration-200 ${isSubActive
                            ? 'bg-blue-100 text-blue-800 border-l-4 border-blue-500'
                            : 'text-white hover:bg-white hover:text-blue-600'
                          }`}
                        >
                        <SubIcon className={`w-4 h-4 ${isSubActive ? 'text-blue-600' : 'text-white'}`} />
                        <span className="text-sm font-medium">{subItem.label}</span>
                      </NavLink>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Settings */}
      {/* <div className="p-4 border-t border-gray-200">
        <NavLink to={'/parametre'} className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100">
          <Settings className="w-5 h-5 text-gray-500" />
          <span className="font-medium">Paramètres</span>
        </NavLink>
      </div> */}
    </div>
  );
}
