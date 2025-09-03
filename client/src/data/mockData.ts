import { Service, Review, FAQ, BlogPost } from '../types';

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

export const reviews: Review[] = [
  {
    id: '1',
    customerName: 'Marie Dubois',
    rating: 5,
    comment: 'Service exceptionnel ! Mes vêtements sont revenus impeccables et l\'équipe est très professionnelle. Je recommande vivement CleanCare.',
    date: new Date('2024-01-15'),
    verified: true
  },
  {
    id: '2',
    customerName: 'Jean Kouassi',
    rating: 5,
    comment: 'Très satisfait du service de collecte et livraison. Ponctuel, professionnel et de qualité. Mes chemises n\'ont jamais été aussi bien repassées !',
    date: new Date('2024-01-20'),
    verified: true
  },
  {
    id: '3',
    customerName: 'Fatou Traoré',
    rating: 4,
    comment: 'Bon service dans l\'ensemble. Le repassage est parfait et l\'équipe est très aimable. Petit bémol sur les délais parfois un peu longs.',
    date: new Date('2024-01-25'),
    verified: true
  },
  {
    id: '4',
    customerName: 'Amadou Bamba',
    rating: 5,
    comment: 'CleanCare a sauvé ma robe de soirée ! Tache de vin rouge complètement disparue. Service de nettoyage à sec exceptionnel.',
    date: new Date('2024-01-18'),
    verified: true
  },
  {
    id: '5',
    customerName: 'Aïcha Sanogo',
    rating: 5,
    comment: 'Service client au top ! Collecte à l\'heure, livraison rapide et linge parfaitement propre. Je ne peux plus m\'en passer.',
    date: new Date('2024-01-22'),
    verified: true
  },
  {
    id: '6',
    customerName: 'Koffi Yao',
    rating: 4,
    comment: 'Très bon rapport qualité-prix. Le lavage express m\'a dépanné plusieurs fois. Équipe réactive et professionnelle.',
    date: new Date('2024-01-28'),
    verified: true
  }
];

export const faqData: FAQ[] = [
  {
    id: '1',
    question: 'Quels sont vos horaires de collecte et de livraison ?',
    answer: 'Nous collectons et livrons du lundi au samedi de 7h00 à 19h00, et le dimanche de 9h00 à 17h00. Vous pouvez planifier votre créneau selon vos préférences lors de la réservation en ligne.'
  },
  {
    id: '2',
    question: 'Comment fonctionne le paiement ?',
    answer: 'Nous acceptons plusieurs moyens de paiement : carte bancaire, Mobile Money (Orange Money, MTN Money, Moov Money), PayPal et paiement à la livraison. Tous les paiements en ligne sont sécurisés et vous recevez une facture électronique.'
  },
  {
    id: '3',
    question: 'Que faire en cas de dommage sur un vêtement ?',
    answer: 'Nous sommes entièrement assurés pour tous dommages. En cas de problème, contactez-nous immédiatement au +225 01 02 03 04 05. Nous procédons à une expertise et vous dédommageons selon nos conditions générales dans les 48h.'
  },
  {
    id: '4',
    question: 'Livrez-vous dans toute la ville d\'Abidjan ?',
    answer: 'Nous couvrons actuellement 15 quartiers d\'Abidjan avec livraison gratuite. Consultez notre page "Zone de couverture" pour vérifier si votre quartier est desservi. Nous étendons régulièrement notre zone de service.'
  },
  {
    id: '5',
    question: 'Quels produits utilisez-vous pour le nettoyage ?',
    answer: 'Nous utilisons exclusivement des produits professionnels de haute qualité, biodégradables et respectueux de l\'environnement. Nos lessives sont hypoallergéniques et adaptées aux peaux sensibles.'
  },
  {
    id: '6',
    question: 'Puis-je suivre ma commande en temps réel ?',
    answer: 'Oui ! Dès votre commande confirmée, vous recevez un numéro de suivi. Connectez-vous à votre espace client pour suivre chaque étape : collecte, lavage, séchage, repassage et livraison. Vous recevez aussi des SMS de notification.'
  },
  {
    id: '7',
    question: 'Proposez-vous des tarifs préférentiels pour les gros volumes ?',
    answer: 'Oui, nous proposons des tarifs dégressifs pour les commandes importantes et des abonnements mensuels avantageux pour nos clients réguliers. Contactez-nous pour un devis personnalisé.'
  },
  {
    id: '8',
    question: 'Comment annuler ou modifier une commande ?',
    answer: 'Vous pouvez annuler ou modifier votre commande jusqu\'à 2h avant l\'heure de collecte prévue via votre espace client ou en nous appelant. Aucun frais d\'annulation n\'est appliqué dans ce délai.'
  }
];

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Comment entretenir vos vêtements en coton pour qu\'ils durent plus longtemps',
    excerpt: 'Découvrez les meilleures techniques professionnelles pour préserver la qualité et la durée de vie de vos vêtements en coton.',
    content: 'Le coton est une fibre naturelle qui nécessite un entretien particulier pour conserver sa douceur et sa forme...',
    author: 'Équipe CleanCare',
    date: new Date('2024-01-10'),
    image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Conseils'
  },
  {
    id: '2',
    title: 'Les secrets du repassage professionnel révélés',
    excerpt: 'Apprenez les techniques utilisées par nos experts pour obtenir un repassage parfait et professionnel à chaque fois.',
    content: 'Le repassage est un art qui demande technique, patience et les bons outils...',
    author: 'Marie Kouamé, Responsable Qualité',
    date: new Date('2024-01-05'),
    image: 'https://images.pexels.com/photos/6198/vintage-irons-pressing-domestic.jpg?auto=compress&cs=tinysrgb&w=800',
    category: 'Techniques'
  },
  {
    id: '3',
    title: 'Nettoyage à sec : quand et pourquoi l\'utiliser ?',
    excerpt: 'Tout ce que vous devez savoir sur le nettoyage à sec, ses avantages et les types de vêtements qui en bénéficient le plus.',
    content: 'Le nettoyage à sec est une technique spécialisée qui utilise des solvants au lieu de l\'eau...',
    author: 'Didier Kouame, Directeur Technique',
    date: new Date('2024-01-12'),
    image: 'https://images.pexels.com/photos/5591664/pexels-photo-5591664.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Techniques'
  },
  {
    id: '4',
    title: 'Éliminer les taches : guide complet par type de tache',
    excerpt: 'Guide pratique pour traiter efficacement tous types de taches avant qu\'elles ne deviennent permanentes.',
    content: 'Chaque type de tache nécessite un traitement spécifique pour être éliminée efficacement...',
    author: 'Équipe CleanCare',
    date: new Date('2024-01-08'),
    image: 'https://images.pexels.com/photos/4239146/pexels-photo-4239146.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Astuces'
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

export const coverageAreas = [
  'Cocody', 'Plateau', 'Marcory', 'Koumassi', 'Port-Bouët',
  'Treichville', 'Adjamé', 'Attécoubé', 'Yopougon', 'Abobo',
  'Bingerville', 'Anyama', 'Songon', 'Grand-Bassam', 'Dabou'
];