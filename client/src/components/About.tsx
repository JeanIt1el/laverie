import React from 'react';
import { Users, Award, Heart, Shield, MapPin, Phone, Mail, Clock } from 'lucide-react';
import { teamMembers } from '../data/mockData';

const About: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            À propos de CleanCare
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Votre partenaire de confiance pour un service de nettoyage professionnel 
            à domicile depuis 2020. Excellence, qualité et respect de l'environnement.
          </p>
        </div>

        {/* Company Info */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-3xl p-12 text-white mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-6">CleanCare Côte d'Ivoire</h3>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Agence de nettoyage professionnelle spécialisée dans le service à domicile. 
                Nous offrons des prestations de qualité supérieure avec collecte et livraison 
                gratuite dans toute la région d'Abidjan.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <MapPin className="text-blue-300" size={24} />
                  <div>
                    <p className="font-semibold">Siège social</p>
                    <p className="text-blue-100">123 Boulevard Lagunaire, Cocody, Abidjan</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Phone className="text-blue-300" size={24} />
                  <div>
                    <p className="font-semibold">Téléphone</p>
                    <p className="text-blue-100">+225 01 02 03 04 05</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Mail className="text-blue-300" size={24} />
                  <div>
                    <p className="font-semibold">Email</p>
                    <p className="text-blue-100">contact@cleancare.ci</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Clock className="text-blue-300" size={24} />
                  <div>
                    <p className="font-semibold">Horaires</p>
                    <p className="text-blue-100">Lun-Sam: 7h00-19h00 | Dim: 9h00-17h00</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl transform rotate-3"></div>
              <img
                src="https://images.pexels.com/photos/6197119/pexels-photo-6197119.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Équipe CleanCare"
                className="relative rounded-2xl shadow-2xl w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Shield className="text-blue-600" size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Qualité Garantie</h3>
            <p className="text-gray-600">
              Nous garantissons un service irréprochable avec des produits professionnels 
              et des techniques éprouvées
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Heart className="text-green-600" size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Passion du Métier</h3>
            <p className="text-gray-600">
              Chaque vêtement est traité avec le plus grand soin et l'attention 
              qu'il mérite par nos experts
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Users className="text-purple-600" size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Service Client</h3>
            <p className="text-gray-600">
              Une équipe locale dédiée à votre écoute pour un service 
              personnalisé et adapté à vos besoins
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Award className="text-orange-600" size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Excellence</h3>
            <p className="text-gray-600">
              Reconnus pour notre expertise et notre engagement qualité 
              par plus de 1000 clients satisfaits
            </p>
          </div>
        </div>

        {/* Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              Notre Histoire
            </h3>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                <strong>CleanCare</strong> est née en 2020 d'une vision simple : révolutionner 
                le secteur du nettoyage à domicile en Côte d'Ivoire. Nos fondateurs ont 
                identifié un besoin croissant des familles modernes qui manquent de temps 
                pour s'occuper de leur linge tout en exigeant une qualité irréprochable.
              </p>
              <p>
                Basée à <strong>Abidjan</strong>, notre entreprise s'est rapidement imposée 
                comme la référence du nettoyage professionnel à domicile grâce à notre 
                approche innovante combinant technologie moderne, produits écologiques 
                et service client exceptionnel.
              </p>
              <p>
                Aujourd'hui, nous sommes fiers de servir plus de <strong>1000 clients 
                satisfaits</strong> dans <strong>15 quartiers d'Abidjan</strong> et 
                continuons d'innover pour offrir le meilleur service possible à nos 
                clients fidèles.
              </p>
              <p>
                Notre mission : <em>"Simplifier votre quotidien en prenant soin de votre 
                linge avec l'expertise et la passion qui nous caractérisent."</em>
              </p>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl transform rotate-3"></div>
            <img
              src="https://images.pexels.com/photos/5591581/pexels-photo-5591581.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Nos installations modernes"
              className="relative rounded-2xl shadow-2xl w-full h-96 object-cover"
            />
          </div>
        </div>

        {/* Team */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Notre Équipe Dirigeante
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow">
                <div className="relative mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto object-cover shadow-lg"
                  />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">
                  {member.name}
                </h4>
                <p className="text-blue-600 font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-gray-600 text-sm">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="bg-blue-600 rounded-3xl p-12 text-white">
          <h3 className="text-3xl font-bold text-center mb-12">
            CleanCare en Chiffres
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">1000+</div>
              <div className="text-blue-100">Clients Satisfaits</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">15</div>
              <div className="text-blue-100">Quartiers Desservis</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">98%</div>
              <div className="text-blue-100">Taux de Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">4 ans</div>
              <div className="text-blue-100">D'Expérience</div>
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className="mt-20">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Nos Certifications et Partenaires
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="text-green-600" size={32} />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Certification Qualité</h4>
              <p className="text-gray-600 text-sm">Certifié ISO 9001 pour la qualité de nos services</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="text-blue-600" size={32} />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Éco-Responsable</h4>
              <p className="text-gray-600 text-sm">Produits biodégradables et respect de l'environnement</p>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="text-purple-600" size={32} />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Prix d'Excellence</h4>
              <p className="text-gray-600 text-sm">Meilleur service client 2023 - Chambre de Commerce</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;