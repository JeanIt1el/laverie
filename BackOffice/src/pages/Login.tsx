// src/pages/users/userForm.tsx
import React, { useState } from 'react';
import { Login } from '../types';

type userFormProps = {
  user?: Login;
  onSubmit: (data: {
    prenom_user: string;
    email_user: string;
    pass_user: string;
  }) => void;
  loading?: boolean;
};

const userForm: React.FC<userFormProps> = ({ user, onSubmit, loading }) => {
  const [prenom_user, setPrenom] = useState(user?.prenom_user || '');
  const [email_user, setEmail] = useState(user?.email_user || '');
  const [pass_user, setPass] = useState(user?.pass_user || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      prenom_user,
      email_user,
      pass_user,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Prénom</label>
        <input type="text" value={prenom_user} onChange={(e) => setPrenom(e.target.value)} required className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input type="email" value={email_user} onChange={(e) => setEmail(e.target.value)} required className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Mot de passe</label>
        <input type="password" value={pass_user} onChange={(e) => setPass(e.target.value)} required className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>
      <button type="submit" disabled={loading} className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50">
        {user ? 'Modifier' : 'Ajouter'}
      </button>
    </form>
  );
};

export default userForm;
