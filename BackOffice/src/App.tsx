// App.tsx  (version complète avec toutes les routes)
import { useState } from 'react';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';

import ClientsModule from './components/Modules/client/ClientsModule';
import ClientAdd from './components/Modules/client/ClientAdd';
import ClientEdit from './components/Modules/client/ClientEdit';

import ReservationsModule from './components/Modules/reservation/ReservationsModule';
import PaymentsModule from './components/Modules/paiement/PaymentsModule';
import ServicesModule from './components/Modules/service/ServicesModule';


// Dans App.tsx
import MaterialsModule from './components/Modules/materiel/MaterialsModule';
import MaterielAdd from './components/Modules/materiel/MaterielAdd';
import MaterielEdit from './components/Modules/materiel/MaterielEdit';

import PlanningModule from './components/Modules/pointage/PlanningModule';
import PointageAdd from './components/Modules/pointage/PointageAdd';
import PointageEdit from './components/Modules/pointage/PointageEdit';

import EmployeesModule from './components/Modules/employe/EmployeesModule';
import EmployeAdd from './components/Modules/employe/EmployeAdd';
import EmployeEdit from './components/Modules/employe/EmployeEdit';

import RoleList from './components/Modules/role/RoleList';
import RoleAdd from './components/Modules/role/RoleAdd';
import RoleEdit from './components/Modules/role/RoleEdit';


import DashBoard from './components/Modules/DashBoard';
import Parametre from './components/Modules/Parametre';

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { User } from './types';


const currentUser: User = {
  id: '1',
  name: 'Fabrice Faniry',
  email: 'randtfbricefaniry@gmail.com',
  role: 'admin',
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
          <Header userRole={currentUser.role} userName={currentUser.name} />
          <main className="flex-1 overflow-y-auto p-6">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route path="/dashboard" element={<DashBoard />} />

              {/* Clients */}
              <Route path="/clients" element={<ClientsModule />} />
              <Route path="/clients/add" element={<ClientAdd />} />
              <Route path="/clients/:id/edit" element={<ClientEdit />} />

              <Route path="/reservations" element={<ReservationsModule />} />
              <Route path="/payments" element={<PaymentsModule />} />
              <Route path="/services" element={<ServicesModule />} />

              {/* Planning / Pointages */}
              <Route path="/planning" element={<PlanningModule />} />
              <Route path="/planning/add" element={<PointageAdd />} />
              <Route path="/planning/:id/edit" element={<PointageEdit />} />

              {/* Employés */}
              <Route path="/employees" element={<EmployeesModule />} />
              <Route path="/employees/add" element={<EmployeAdd />} />
              <Route path="/employees/:id/edit" element={<EmployeEdit />} />

              {/* Rôles */}
              <Route path="/roles" element={<RoleList />} />
              <Route path="/roles/add" element={<RoleAdd />} />
              <Route path="/roles/:id/edit" element={<RoleEdit />} />

              <Route path="/materials" element={<MaterialsModule />} />
              // Ajout des routes manquantes pour les matériels
              <Route path="/materials/add" element={<MaterielAdd />} />
              <Route path="/materials/:id/edit" element={<MaterielEdit />} />
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
