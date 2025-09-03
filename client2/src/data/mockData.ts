import { Service } from '../types';

export const services: Service[] = [
  {
    id: '1',
    name: 'Lavage Standard',
    description: 'Lavage complet de vos vêtements avec lessive haute qualité et adoucissant. Idéal pour le linge du quotidien.',
    price: 2500,
    duration: '24h',
    icon: 'Shirt'
  },
  {
    id: '2',
    name: 'Repassage Professionnel',
    description: 'Repassage expert pour un rendu impeccable. Vos vêtements retrouvent leur forme et leur élégance.',
    price: 1500,
    duration: '12h',
    icon: 'Zap'
  },
  {
    id: '3',
    name: 'Nettoyage à Sec',
    description: 'Nettoyage délicat pour vos vêtements fragiles, costumes, robes de soirée et tissus délicats.',
    price: 4000,
    duration: '48h',
    icon: 'Sparkles'
  },
  {
    id: '4',
    name: 'Lavage Express',
    description: 'Service rapide pour vos urgences. Lavage et séchage en moins de 6 heures.',
    price: 3500,
    duration: '6h',
    icon: 'Clock'
  },
  {
    id: '5',
    name: 'Lavage Couette & Oreillers',
    description: 'Nettoyage spécialisé pour couettes, oreillers et linge de maison volumineux.',
    price: 5000,
    duration: '72h',
    icon: 'Home'
  },
  {
    id: '6',
    name: 'Traitement Anti-Taches',
    description: 'Élimination professionnelle des taches tenaces avec produits spécialisés.',
    price: 2000,
    duration: '24h',
    icon: 'Droplets'
  }
];



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

