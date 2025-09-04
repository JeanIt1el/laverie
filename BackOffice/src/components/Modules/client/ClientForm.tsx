// src/pages/Clients/ClientForm.tsx
import React, { useState } from 'react';
import { ClientType } from '../../../types';

type ClientFormProps = {
  client?: ClientType;
  onSubmit: (data: {
    nom_client: string;
    prenom_client: string;
    email_client: string;
    phone_client: string;
    adresse_client: string;
  }) => void;
  loading?: boolean;
};

const ClientForm: React.FC<ClientFormProps> = ({ client, onSubmit, loading }) => {
  const [nom_client, setNom] = useState(client?.nom_client || '');
  const [prenom_client, setPrenom] = useState(client?.prenom_client || '');
  const [email_client, setEmail] = useState(client?.email_client || '');
  const [phone_client, setPhone] = useState(client?.phone_client?.toString() || '');
  const [adresse_client, setAdresse] = useState(client?.adresse_client || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      nom_client,
      prenom_client,
      email_client,
      phone_client,
      adresse_client,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Nom</label>
        <input type="text" value={nom_client} onChange={(e) => setNom(e.target.value)} required className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Prénom</label>
        <input type="text" value={prenom_client} onChange={(e) => setPrenom(e.target.value)} required className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input type="email" value={email_client} onChange={(e) => setEmail(e.target.value)} required className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Téléphone</label>
        <input type="text" value={phone_client} onChange={(e) => setPhone(e.target.value)} required className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Adresse</label>
        <input type="text" value={adresse_client} onChange={(e) => setAdresse(e.target.value)} required className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>
      <button type="submit" disabled={loading} className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50">
        {client ? 'Modifier' : 'Ajouter'}
      </button>
    </form>
  );
};

export default ClientForm;