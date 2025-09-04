import axios from 'axios';
import { Service } from '../types';

export async function getServicesFromApi(): Promise<Service[]> {
  const res = await axios.get('https://127.0.0.1:8000/api/service');
  return res.data.map((service: any) => ({
    id: String(service.id),
    name: service.denomination,           // adapte selon le nom dans ta BDD
    description: service.description,
    price: service.prix,
    duration: service.duration ?? '24h',  // valeur par défaut si non présent
    icon: service.icon ?? 'Shirt'         // valeur par défaut si non présent
  }));
}



export const teamMembers = [
  {
    name: 'Kouamé Didier',
    role: 'Directeur Général & Fondateur',
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: '15 ans d\'expérience dans le secteur du nettoyage professionnel. Diplômé en gestion d\'entreprise.'
  },
  {
    name: 'Aya Fatima',
    role: 'Responsable Qualité & Formation',
    image: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Experte en techniques de nettoyage et formation du personnel. Garante de nos standards de qualité.'
  },
  {
    name: 'Brou Michel',
    role: 'Chef d\'Équipe Opérations',
    image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Coordonne les équipes de collecte et livraison. 10 ans d\'expérience en logistique urbaine.'
  }
];

