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

// ****************************************************** //

export interface ActionType {
  isLoading: boolean,
  isDeleting: boolean,
  isUpdating: boolean
}


export interface RoleType {
  id: number,
  nom_role: string,
  description_role: string
}

export interface PointageType {
  id: number;
  created_at: string;
  heure_debut: string;
  heure_fin: string | null;
  remarque?: string;
  employe?: {
    id: number;
    nom: string;
    prenoms: string;
  };
}

export interface ServiceType {
  id: number;
  denomination: string;
  description: string;
  prix: number;
  created_at: string;
}

export interface EmployeType {
  id: number;
  services: ServiceType[]; // 
  role: RoleType | null;
  nom: string;
  prenoms: string;
  email: string;
  phone: string;
  cin: string;
  pointages: PointageType[];
  createdAt: string;
}

export interface ClientType {
  id: number;
  nom_client: string;
  prenom_client: string;
  email_client: string;
  phone_client: string;
  adresse_client: string;
}

export interface MaterielType {
  id: number;
  nom_materiel: string;
  type_materiel: string;
  etat_materiel: string;
  quantite: number;
  service_id: number | null;
  service_nom: string | null;
  created_at: string;
}


// src/types/ReservationType.ts
export interface ReservationType {
  id: number;
  created_at: string; // Y-m-d H:i:s
  statut_reservation: 'Payé' | 'En attente' | 'Annulé';
  montant_total: number;
  client: {
    id: number;
    nom_client: string;
    prenom_client: string;
    email_client: string;
    phone_client: string;
    adresse_client: string;
  } | null;
  services: Array<{
    id: number;
    denomination: string; 
    prix: number;
  }>;
  paiements: Array<{
    id: number;
    montant: number;
    date_paiement: string; 
  }>;
}

export interface ReservationEmbedded {
  id: number;
  statut_reservation: string;
}

// src/types/ModePaiementType.ts
export type ModePaiementEmbedded = {
  id: number;
  denomination_paie: string;
  numero: string;
};

export interface PaiementType {
  id: number;
  created_at: string;
  montant: number;
  status: string;
  reservation: ReservationEmbedded | null;
  mode_paiement: ModePaiementEmbedded | null;
}