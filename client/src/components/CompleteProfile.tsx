// src/components/CompleteProfile.tsx
import React, { useState } from 'react';

interface Props {
  email: string;
  onComplete: (data: any) => void;
}

const CompleteProfile: React.FC<Props> = ({ email, onComplete }) => {
  const [formData, setFormData] = useState({
    nom_client: '',
    prenom_client: '',
    phone_client: '',
    adresse_client: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:8000/api/auth/complete-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, ...formData }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || 'Erreur');
      }

      const data = await response.json();
      onComplete(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Complétez votre profil</h2>
        {error && (
          <div className="p-3 mb-4 bg-red-100 text-red-700 rounded-lg text-sm">{error}</div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              disabled
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100"
            />
          </div>
          <input
            name="prenom_client"
            placeholder="Prénom"
            value={formData.prenom_client}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
          />
          <input
            name="nom_client"
            placeholder="Nom"
            value={formData.nom_client}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
          />
          <input
            name="phone_client"
            placeholder="Téléphone"
            value={formData.phone_client}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
          />
          <input
            name="adresse_client"
            placeholder="Adresse"
            value={formData.adresse_client}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg mt-6 hover:bg-blue-700"
          >
            {loading ? 'Enregistrement...' : 'Envoyer le code'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CompleteProfile;