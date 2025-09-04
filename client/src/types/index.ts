export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  icon: string;
}

export interface Payload {
  client_id: number, 
  created_at: string,
  pickup_time: string,
  address: string,
  phone: string,
  email: string,
  name: string,
  notes: string,
  statut_reservation: "en attente",
  montant_total: string,
  services: string[],
}

export interface Order {
  id: string;
  services: Service[];
  status: 'pending' | 'collected' | 'in_progress' | 'ready' | 'delivered';
  pickupDate: Date;
  deliveryDate: Date;
  totalPrice: number;
  customerInfo: CustomerInfo;
}

export interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface Review {
  id: string;
  customerName: string;
  rating: number;
  comment: string;
  date: Date;
  verified: boolean;
}


