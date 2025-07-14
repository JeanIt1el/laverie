import { useState } from 'react';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import ClientsModule from './components/Modules/ClientsModule';
import ReservationsModule from './components/Modules/ReservationsModule';
import PaymentsModule from './components/Modules/PaymentsModule';
import ServicesModule from './components/Modules/ServicesModule';
import MaterialsModule from './components/Modules/MaterialsModule';
import PlanningModule from './components/Modules/PlanningModule';
import EmployeesModule from './components/Modules/EmployeesModule';
import RoleList from './components/Modules/role/RoleList';
import RoleAdd from './components/Modules/role/RoleAdd';
import RoleEdit from './components/Modules/role/RoleEdit';


import DashBoard from './components/Modules/DashBoard';

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { User } from './types';
import Parametre from './components/Modules/Parametre';

const currentUser: User = {
  id: '1',
  name: 'Rakoto Admin',
  email: 'admin@cleanmada.mg',
  role: 'admin'
};

function App() {
  const [activeSection, setActiveSection] = useState('dashboard');

  return (
    <Router>
      <div className="flex h-screen bg-gray-50 transition-colors">
        <Sidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          userRole={currentUser.role}
        />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header
            userRole={currentUser.role}
            userName={currentUser.name}
          />
          <main className="flex-1 overflow-y-auto p-6">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route path="/dashboard" element={<DashBoard />} />
              <Route path="/clients" element={<ClientsModule />} />
              <Route path="/reservations" element={<ReservationsModule />} />
              <Route path="/payments" element={<PaymentsModule />} />
              <Route path="/services" element={<ServicesModule />} />
              <Route path="/materials" element={<MaterialsModule />} />
              <Route path="/planning" element={<PlanningModule />} />
              <Route path="/employees" element={<EmployeesModule />} />
              <Route path="/roles" element={<RoleList />} />
              <Route path="/roles/Add" element={<RoleAdd />} />
              <Route path="/roles/:id/edit" element={<RoleEdit />} />


              <Route path="/parametre" element={<Parametre />} />
              <Route path="*" element={<div>404 - Page non trouvée</div>} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
