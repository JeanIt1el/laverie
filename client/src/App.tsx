import React, { useState } from 'react';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import StatsCards from './components/Dashboard/StatsCards';
import { ReservationChart, RevenueChart, PaymentStatusChart } from './components/Dashboard/Charts';
import RecentActivity from './components/Dashboard/RecentActivity';
import ClientsModule from './components/Modules/ClientsModule';
import ReservationsModule from './components/Modules/ReservationsModule';
import PaymentsModule from './components/Modules/PaymentsModule';
import ServicesModule from './components/Modules/ServicesModule';
import MaterialsModule from './components/Modules/MaterialsModule';
import PlanningModule from './components/Modules/PlanningModule';
import EmployeesModule from './components/Modules/EmployeesModule';
import RolesModule from './components/Modules/RolesModule';
import { User } from './types';

const currentUser: User = {
  id: '1',
  name: 'Rakoto Admin',
  email: 'admin@cleanmada.mg',
  role: 'admin'
};

function App() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const renderMainContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <div className="space-y-8">
            <StatsCards isDarkMode={isDarkMode} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <ReservationChart isDarkMode={isDarkMode} />
              <RevenueChart isDarkMode={isDarkMode} />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <PaymentStatusChart isDarkMode={isDarkMode} />
              </div>
              <div>
                <RecentActivity isDarkMode={isDarkMode} />
              </div>
            </div>
          </div>
        );
      case 'clients':
        return <ClientsModule isDarkMode={isDarkMode} />;
      case 'reservations':
        return <ReservationsModule isDarkMode={isDarkMode} />;
      case 'payments':
        return <PaymentsModule isDarkMode={isDarkMode} />;
      case 'services':
        return <ServicesModule isDarkMode={isDarkMode} />;
      case 'materials':
        return <MaterialsModule isDarkMode={isDarkMode} />;
      case 'employees':
        return <EmployeesModule isDarkMode={isDarkMode} />;
      case 'planning':
        return <PlanningModule isDarkMode={isDarkMode} />;
      case 'roles':
        return <RolesModule isDarkMode={isDarkMode} />;
      default:
        return <div>Section non trouvée</div>;
    }
  };

  return (
    <div className={`flex h-screen transition-colors ${
      isDarkMode ? 'bg-slate-900' : 'bg-gray-50'
    }`}>
      <Sidebar 
        activeSection={activeSection} 
        onSectionChange={setActiveSection}
        userRole={currentUser.role}
        isDarkMode={isDarkMode}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          userRole={currentUser.role}
          userName={currentUser.name}
          isDarkMode={isDarkMode}
          onToggleDarkMode={toggleDarkMode}
        />
        <main className="flex-1 overflow-y-auto p-6">
          {renderMainContent()}
        </main>
      </div>
    </div>
  );
}

export default App;