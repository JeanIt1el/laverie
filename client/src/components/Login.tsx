// src/components/Login.tsx
import React, { useState } from 'react';
import { authService } from '../service/authService'; // ✅ 'services', pas 'service'
import { useDispatch } from 'react-redux';
import { setClient } from '../redux/Slice/ClientSlice';

const Login = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'email' | 'profile' | 'otp'>('email');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [profile, setProfile] = useState({
    nom_client: '',
    prenom_client: '',
    phone_client: '',
    adresse_client: '',
  });

  const dispatch = useDispatch(); // ✅ Ajout du dispatch

  // Étape 1 : Demande d'OTP
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await authService.requestOtp(email);

      if (result.requires_completion) {
        setStep('profile');
      } else {
        setStep('otp');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Étape 2 : Compléter le profil
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleCompleteProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await authService.completeProfile({ email, ...profile });
      setStep('otp');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Étape 3 : Vérifier le code
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // ✅ Récupère userData
      const userData = await authService.verifyOtp(email, otp);

      // ✅ Mets à jour le store Redux
      dispatch(setClient(userData));

      // ✅ Redirige
      window.location.href = '/account';
    } catch (err: any) {
      setError('Code incorrect');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      {step === 'email' && (
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Connexion</h2>
          {error && (
            <div className="p-3 mb-4 bg-red-100 text-red-700 rounded-lg text-sm">{error}</div>
          )}
          <form onSubmit={handleSendOtp}>
            <label className="block text-sm font-medium text-gray-700 mb-2">Votre email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg mt-4 hover:bg-blue-700"
            >
              {loading ? 'Envoi...' : 'Continuer'}
            </button>
          </form>
        </div>
      )}

      {step === 'profile' && (
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Complétez votre profil</h2>
          {error && (
            <div className="p-3 mb-4 bg-red-100 text-red-700 rounded-lg text-sm">{error}</div>
          )}
          <form onSubmit={handleCompleteProfile} className="space-y-4">
            <input
              name="prenom_client"
              placeholder="Prénom"
              value={profile.prenom_client}
              onChange={handleProfileChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            />
            <input
              name="nom_client"
              placeholder="Nom"
              value={profile.nom_client}
              onChange={handleProfileChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            />
            <input
              name="phone_client"
              placeholder="Téléphone"
              value={profile.phone_client}
              onChange={handleProfileChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            />
            <input
              name="adresse_client"
              placeholder="Adresse"
              value={profile.adresse_client}
              onChange={handleProfileChange}
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
      )}

      {step === 'otp' && (
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Vérification</h2>
          <p className="text-gray-600 mb-4">Un code a été envoyé à <strong>{email}</strong></p>
          {error && (
            <div className="p-3 mb-4 bg-red-100 text-red-700 rounded-lg text-sm">{error}</div>
          )}
          <form onSubmit={handleVerifyOtp}>
            <label className="block text-sm font-medium text-gray-700 mb-2">Code (6 chiffres)</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-3 rounded-lg mt-4 hover:bg-green-700"
            >
              {loading ? 'Vérification...' : 'Se connecter'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;