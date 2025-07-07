import React, { useState } from 'react';
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
  Settings,
  Search,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  userRole: 'admin' | 'superviseur' | 'employe';
  isDarkMode: boolean;
}

const sidebarItems = [
  { id: 'dashboard', label: 'Tableau de Bord', icon: LayoutDashboard },
  { id: 'clients', label: 'Clients', icon: Users },
  { id: 'reservations', label: 'Réservations', icon: Calendar },
  { id: 'payments', label: 'Paiements', icon: CreditCard },
  { id: 'services', label: 'Services', icon: Wrench },
  { id: 'materials', label: 'Matériels', icon: Package },
  { 
    id: 'employees', 
    label: 'Employés', 
    icon: UserCheck, 
    adminOnly: true,
    subItems: [
      { id: 'employees', label: 'Gestion Employés', icon: UserCheck },
      { id: 'planning', label: 'Planning', icon: Clock },
      { id: 'roles', label: 'Rôles', icon: Shield }
    ]
  },
];

export default function Sidebar({ activeSection, onSectionChange, userRole, isDarkMode }: SidebarProps) {
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

  const isSubItemActive = (parentId: string, subItems: any[]) => {
    return subItems.some(subItem => activeSection === subItem.id);
  };

  return (
    <div className={`w-64 shadow-xl border-r flex flex-col transition-colors ${
      isDarkMode 
        ? 'bg-slate-800 border-slate-700' 
        : 'bg-white border-gray-200'
    }`}>
      {/* Logo */}
      <div className={`p-6 border-b transition-colors ${
        isDarkMode ? 'border-slate-700' : 'border-gray-200'
      }`}>
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
            <LayoutDashboard className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className={`text-xl font-bold transition-colors ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              CleanMada
            </h1>
            <p className={`text-sm transition-colors ${
              isDarkMode ? 'text-slate-400' : 'text-gray-500'
            }`}>
              Agence de Nettoyage
            </p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className={`p-4 border-b transition-colors ${
        isDarkMode ? 'border-slate-700' : 'border-gray-100'
      }`}>
        <div className="relative">
          <Search className={`w-4 h-4 absolute left-3 top-3 transition-colors ${
            isDarkMode ? 'text-slate-400' : 'text-gray-400'
          }`} />
          <input
            type="text"
            placeholder="Recherche rapide..."
            className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm transition-colors ${
              isDarkMode 
                ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400' 
                : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400'
            }`}
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {filteredItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          const isExpanded = expandedItems.includes(item.id);
          const hasSubItems = item.subItems && item.subItems.length > 0;
          const hasActiveSubItem = hasSubItems && isSubItemActive(item.id, item.subItems);
          
          return (
            <div key={item.id}>
              <button
                onClick={() => {
                  if (hasSubItems) {
                    toggleExpanded(item.id);
                  } else {
                    onSectionChange(item.id);
                  }
                }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive || hasActiveSubItem
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg'
                    : isDarkMode
                      ? 'text-slate-300 hover:bg-slate-700 hover:text-white'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`w-5 h-5 ${
                    isActive || hasActiveSubItem 
                      ? 'text-white' 
                      : isDarkMode 
                        ? 'text-slate-400' 
                        : 'text-gray-500'
                  }`} />
                  <span className="font-medium">{item.label}</span>
                </div>
                {hasSubItems && (
                  <div className={`transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}>
                    <ChevronRight className={`w-4 h-4 ${
                      isActive || hasActiveSubItem 
                        ? 'text-white' 
                        : isDarkMode 
                          ? 'text-slate-400' 
                          : 'text-gray-500'
                    }`} />
                  </div>
                )}
              </button>
              
              {hasSubItems && isExpanded && (
                <div className="ml-4 mt-2 space-y-1">
                  {item.subItems.map((subItem) => {
                    const SubIcon = subItem.icon;
                    const isSubActive = activeSection === subItem.id;
                    
                    return (
                      <button
                        key={subItem.id}
                        onClick={() => onSectionChange(subItem.id)}
                        className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-all duration-200 ${
                          isSubActive
                            ? isDarkMode
                              ? 'bg-emerald-900/50 text-emerald-300 border-l-4 border-emerald-400'
                              : 'bg-emerald-100 text-emerald-800 border-l-4 border-emerald-500'
                            : isDarkMode
                              ? 'text-slate-400 hover:bg-slate-700 hover:text-slate-200'
                              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                        }`}
                      >
                        <SubIcon className={`w-4 h-4 ${
                          isSubActive 
                            ? isDarkMode 
                              ? 'text-emerald-400' 
                              : 'text-emerald-600'
                            : isDarkMode 
                              ? 'text-slate-500' 
                              : 'text-gray-400'
                        }`} />
                        <span className="text-sm font-medium">{subItem.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Settings */}
      <div className={`p-4 border-t transition-colors ${
        isDarkMode ? 'border-slate-700' : 'border-gray-200'
      }`}>
        <button className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
          isDarkMode 
            ? 'text-slate-300 hover:bg-slate-700' 
            : 'text-gray-700 hover:bg-gray-100'
        }`}>
          <Settings className={`w-5 h-5 transition-colors ${
            isDarkMode ? 'text-slate-400' : 'text-gray-500'
          }`} />
          <span className="font-medium">Paramètres</span>
        </button>
      </div>
    </div>
  );
}