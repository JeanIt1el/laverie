// src/types/index.ts

// Service
export type ServiceType = {
  id: number;
  denomination: string;
  description: string | null;
  prix: number;
  created_at: string | null;
};

// Client
export type ClientType = {
  id: number;
  nom_client: string;
  prenom_client: string;
  email_client: string;
  phone_client: string;
  adresse_client: string;
};

// Reservation
export type ReservationType = {
  id: number;
  created_at: string;
  statut_reservation: string;
  montant_total: number;
  client: ClientType;
  services: ServiceType[];
};

// Pour la création
export type CreateReservationDTO = {
  client_id: number;
  statut_reservation: string;
  montant_total: number;
  created_at: string;
  services: number[]; // tableau d'IDs de services
};

// Action
export type ActionType = {
  isLoading?: boolean;
  isCreating?: boolean;
  isUpdating?: boolean;
  isDeleting?: boolean;
};

// Store
export type RootStateType = {
  Reservation: {
    datas: ReservationType[];
    action: ActionType;
  };
  Service: {
    datas: ServiceType[];
    action: ActionType;
    page: number;
  };
  Client: {
    data: ClientType | null;
  };
};