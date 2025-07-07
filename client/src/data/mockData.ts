import { Client, Reservation, Payment, Service, Material, Employee, Planning, Role } from '../types';

export const mockClients: Client[] = [
  {
    id: '1',
    name: 'Hôtel Colbert Antananarivo',
    email: 'contact@hotelcolbert.mg',
    phone: '+261 20 22 202 02',
    address: 'Rue Printsy Ratsimamanga, Antananarivo',
    type: 'hotel',
    status: 'actif',
    totalContracts: 24,
    totalSpent: 15750000,
    lastActivity: '2024-01-15',
    city: 'Antananarivo'
  },
  {
    id: '2',
    name: 'Terrain Industriel Ankorondrano',
    email: 'admin@ankorondrano-industrial.mg',
    phone: '+261 34 12 345 67',
    address: 'Zone Industrielle Ankorondrano',
    type: 'terrain',
    status: 'actif',
    totalContracts: 12,
    totalSpent: 8900000,
    lastActivity: '2024-01-12',
    city: 'Antananarivo'
  },
  {
    id: '3',
    name: 'Résidence Ivandry',
    email: 'residence.ivandry@gmail.com',
    phone: '+261 33 98 765 43',
    address: 'Quartier Ivandry, Antananarivo',
    type: 'residence',
    status: 'actif',
    totalContracts: 6,
    totalSpent: 2450000,
    lastActivity: '2024-01-10',
    city: 'Antananarivo'
  },
  {
    id: '4',
    name: 'Hôtel Palissandre Côte Ouest',
    email: 'info@palissandre.mg',
    phone: '+261 62 225 225',
    address: 'Morondava, Côte Ouest',
    type: 'hotel',
    status: 'actif',
    totalContracts: 18,
    totalSpent: 12300000,
    lastActivity: '2024-01-08',
    city: 'Morondava'
  }
];

export const mockReservations: Reservation[] = [
  {
    id: '1',
    clientId: '1',
    clientName: 'Hôtel Colbert Antananarivo',
    serviceId: '1',
    serviceName: 'Nettoyage Complet Hôtel',
    status: 'confirme',
    date: '2024-01-20',
    time: '06:00',
    duration: 480,
    totalAmount: 850000,
    location: 'Antananarivo Centre',
    surface: 2500
  },
  {
    id: '2',
    clientId: '2',
    clientName: 'Terrain Industriel Ankorondrano',
    serviceId: '2',
    serviceName: 'Débroussaillage Terrain',
    status: 'en-attente',
    date: '2024-01-18',
    time: '07:00',
    duration: 360,
    totalAmount: 650000,
    location: 'Ankorondrano',
    surface: 5000
  },
  {
    id: '3',
    clientId: '3',
    clientName: 'Résidence Ivandry',
    serviceId: '3',
    serviceName: 'Entretien Espaces Verts',
    status: 'termine',
    date: '2024-01-10',
    time: '08:00',
    duration: 240,
    totalAmount: 320000,
    location: 'Ivandry',
    surface: 800
  }
];

export const mockPayments: Payment[] = [
  {
    id: '1',
    reservationId: '1',
    clientName: 'Hôtel Colbert Antananarivo',
    amount: 850000,
    status: 'paye',
    method: 'virement',
    date: '2024-01-15',
    dueDate: '2024-01-20',
    currency: 'MGA'
  },
  {
    id: '2',
    reservationId: '2',
    clientName: 'Terrain Industriel Ankorondrano',
    amount: 650000,
    status: 'en-attente',
    method: 'cheque',
    date: '2024-01-16',
    dueDate: '2024-01-18',
    currency: 'MGA'
  },
  {
    id: '3',
    reservationId: '3',
    clientName: 'Résidence Ivandry',
    amount: 320000,
    status: 'en-retard',
    method: 'especes',
    date: '2024-01-05',
    dueDate: '2024-01-10',
    currency: 'MGA'
  }
];

export const mockServices: Service[] = [
  {
    id: '1',
    name: 'Nettoyage Complet Hôtel',
    description: 'Service complet de nettoyage pour établissements hôteliers',
    price: 850000,
    duration: 480,
    category: 'Nettoyage Hôtel',
    status: 'actif',
    bookingCount: 45,
    equipment: ['Aspirateurs industriels', 'Produits désinfectants', 'Matériel de lavage']
  },
  {
    id: '2',
    name: 'Débroussaillage Terrain',
    description: 'Débroussaillage et nettoyage de terrains industriels et résidentiels',
    price: 650000,
    duration: 360,
    category: 'Nettoyage Terrain',
    status: 'actif',
    bookingCount: 32,
    equipment: ['Débroussailleuses', 'Tondeuses', 'Outils de jardinage']
  },
  {
    id: '3',
    name: 'Entretien Espaces Verts',
    description: 'Entretien et maintenance des espaces verts et jardins',
    price: 320000,
    duration: 240,
    category: 'Entretien',
    status: 'actif',
    bookingCount: 28,
    equipment: ['Sécateurs', 'Arrosoirs', 'Engrais']
  },
  {
    id: '4',
    name: 'Nettoyage Bureau',
    description: 'Nettoyage quotidien des espaces de bureau',
    price: 180000,
    duration: 120,
    category: 'Nettoyage Bureau',
    status: 'actif',
    bookingCount: 56,
    equipment: ['Aspirateurs', 'Produits vitres', 'Chiffons microfibres']
  }
];

export const mockMaterials: Material[] = [
  {
    id: '1',
    name: 'Détergent Industriel',
    category: 'Produits Chimiques',
    quantity: 25,
    minStock: 10,
    status: 'disponible',
    lastUpdated: '2024-01-15',
    supplier: 'ChemMada SARL',
    unit: 'litres'
  },
  {
    id: '2',
    name: 'Débroussailleuses',
    category: 'Équipements',
    quantity: 3,
    minStock: 5,
    status: 'stock-faible',
    lastUpdated: '2024-01-14',
    supplier: 'EquipMada',
    unit: 'unités'
  },
  {
    id: '3',
    name: 'Camion de Transport',
    category: 'Véhicules',
    quantity: 2,
    minStock: 1,
    status: 'maintenance',
    lastUpdated: '2024-01-12',
    supplier: 'AutoMada',
    unit: 'unités'
  },
  {
    id: '4',
    name: 'Aspirateurs Industriels',
    category: 'Équipements',
    quantity: 8,
    minStock: 4,
    status: 'disponible',
    lastUpdated: '2024-01-16',
    supplier: 'TechClean Madagascar',
    unit: 'unités'
  }
];

export const mockEmployees: Employee[] = [
  {
    id: '1',
    name: 'Rakoto Andry',
    email: 'rakoto.andry@cleanmada.mg',
    phone: '+261 34 12 345 67',
    role: 'Chef d\'Équipe',
    department: 'Nettoyage Hôtels',
    status: 'actif',
    hireDate: '2022-03-15',
    specialization: ['Nettoyage hôtelier', 'Formation équipe'],
    salary: 800000
  },
  {
    id: '2',
    name: 'Rasoa Hery',
    email: 'rasoa.hery@cleanmada.mg',
    phone: '+261 33 98 765 43',
    role: 'Superviseur Terrain',
    department: 'Nettoyage Terrains',
    status: 'actif',
    hireDate: '2021-09-20',
    specialization: ['Débroussaillage', 'Conduite engins'],
    salary: 750000
  },
  {
    id: '3',
    name: 'Rabe Miora',
    email: 'rabe.miora@cleanmada.mg',
    phone: '+261 32 11 222 33',
    role: 'Agent de Nettoyage',
    department: 'Nettoyage Bureaux',
    status: 'actif',
    hireDate: '2023-01-10',
    specialization: ['Nettoyage bureaux', 'Entretien'],
    salary: 450000
  },
  {
    id: '4',
    name: 'Nivo Randria',
    email: 'nivo.randria@cleanmada.mg',
    phone: '+261 34 55 666 77',
    role: 'Mécanicien',
    department: 'Maintenance',
    status: 'actif',
    hireDate: '2020-11-05',
    specialization: ['Réparation équipements', 'Maintenance véhicules'],
    salary: 650000
  }
];

export const mockPlanning: Planning[] = [
  {
    id: '1',
    employeeId: '1',
    employeeName: 'Rakoto Andry',
    serviceId: '1',
    serviceName: 'Nettoyage Complet Hôtel',
    clientName: 'Hôtel Colbert Antananarivo',
    date: '2024-01-20',
    startTime: '06:00',
    endTime: '14:00',
    status: 'planifie',
    location: 'Antananarivo Centre',
    teamSize: 6,
    equipment: ['Aspirateurs industriels', 'Produits désinfectants']
  },
  {
    id: '2',
    employeeId: '2',
    employeeName: 'Rasoa Hery',
    serviceId: '2',
    serviceName: 'Débroussaillage Terrain',
    clientName: 'Terrain Industriel Ankorondrano',
    date: '2024-01-18',
    startTime: '07:00',
    endTime: '13:00',
    status: 'en-cours',
    location: 'Ankorondrano',
    teamSize: 4,
    equipment: ['Débroussailleuses', 'Tondeuses']
  },
  {
    id: '3',
    employeeId: '3',
    employeeName: 'Rabe Miora',
    serviceId: '3',
    serviceName: 'Entretien Espaces Verts',
    clientName: 'Résidence Ivandry',
    date: '2024-01-10',
    startTime: '08:00',
    endTime: '12:00',
    status: 'termine',
    location: 'Ivandry',
    teamSize: 2,
    equipment: ['Sécateurs', 'Arrosoirs']
  }
];

export const mockRoles: Role[] = [
  {
    id: '1',
    name: 'Administrateur',
    description: 'Accès complet à tous les modules du système',
    permissions: ['gerer_utilisateurs', 'gerer_roles', 'voir_rapports', 'gerer_parametres', 'gerer_paiements', 'gerer_clients'],
    userCount: 2,
    level: 'eleve',
    department: 'Administration'
  },
  {
    id: '2',
    name: 'Superviseur',
    description: 'Gestion des opérations et supervision des équipes',
    permissions: ['voir_rapports', 'gerer_clients', 'gerer_reservations', 'gerer_employes', 'gerer_planning'],
    userCount: 3,
    level: 'moyen',
    department: 'Opérations'
  },
  {
    id: '3',
    name: 'Chef d\'Équipe',
    description: 'Coordination des équipes de nettoyage sur le terrain',
    permissions: ['voir_planning', 'gerer_equipe', 'voir_materiels', 'mettre_a_jour_statut'],
    userCount: 5,
    level: 'moyen',
    department: 'Terrain'
  },
  {
    id: '4',
    name: 'Agent de Nettoyage',
    description: 'Exécution des tâches de nettoyage assignées',
    permissions: ['voir_planning_personnel', 'mettre_a_jour_profil', 'voir_taches'],
    userCount: 15,
    level: 'faible',
    department: 'Terrain'
  }
];

export const chartData = {
  reservations: [
    { name: 'Jan', value: 45 },
    { name: 'Fév', value: 52 },
    { name: 'Mar', value: 48 },
    { name: 'Avr', value: 61 },
    { name: 'Mai', value: 55 },
    { name: 'Jun', value: 67 }
  ],
  revenue: [
    { name: 'Jan', value: 18400000 },
    { name: 'Fév', value: 21200000 },
    { name: 'Mar', value: 19800000 },
    { name: 'Avr', value: 25500000 },
    { name: 'Mai', value: 23800000 },
    { name: 'Jun', value: 28200000 }
  ],
  payments: [
    { name: 'Payé', value: 75, color: '#10B981' },
    { name: 'En Attente', value: 20, color: '#F59E0B' },
    { name: 'En Retard', value: 5, color: '#EF4444' }
  ]
};