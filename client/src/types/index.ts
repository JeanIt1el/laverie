export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'superviseur' | 'employe';
  avatar?: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  type: 'hotel' | 'terrain' | 'bureau' | 'residence';
  status: 'actif' | 'inactif';
  totalContracts: number;
  totalSpent: number;
  lastActivity: string;
  city: string;
}

export interface Reservation {
  id: string;
  clientId: string;
  clientName: string;
  serviceId: string;
  serviceName: string;
  status: 'confirme' | 'en-attente' | 'annule' | 'termine';
  date: string;
  time: string;
  duration: number;
  totalAmount: number;
  location: string;
  surface: number;
}

export interface Payment {
  id: string;
  reservationId: string;
  clientName: string;
  amount: number;
  status: 'paye' | 'en-attente' | 'en-retard';
  method: 'especes' | 'virement' | 'cheque' | 'mobile-money';
  date: string;
  dueDate: string;
  currency: 'MGA' | 'EUR';
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  category: 'Nettoyage Terrain' | 'Nettoyage Hôtel' | 'Nettoyage Bureau' | 'Entretien';
  status: 'actif' | 'inactif';
  bookingCount: number;
  equipment: string[];
}

export interface Material {
  id: string;
  name: string;
  category: 'Produits Chimiques' | 'Équipements' | 'Véhicules' | 'Outils';
  quantity: number;
  minStock: number;
  status: 'disponible' | 'stock-faible' | 'rupture' | 'maintenance';
  lastUpdated: string;
  supplier: string;
  unit: string;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  status: 'actif' | 'inactif' | 'conge';
  hireDate: string;
  avatar?: string;
  specialization: string[];
  salary: number;
}

export interface Planning {
  id: string;
  employeeId: string;
  employeeName: string;
  serviceId: string;
  serviceName: string;
  clientName: string;
  date: string;
  startTime: string;
  endTime: string;
  status: 'planifie' | 'en-cours' | 'termine' | 'annule';
  location: string;
  teamSize: number;
  equipment: string[];
}

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  userCount: number;
  level: 'eleve' | 'moyen' | 'faible';
  department: string;
}