// src/pages/Paiement/PaymentsModule.tsx
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CreditCard, DollarSign, Calendar, User, TrendingUp } from 'lucide-react';
import { getAllPaiements } from '../../../Redux/AsyncThunk/PaiementThunk';
import { getPaiementState } from '../../../Redux/Slice/PaiementSlice';
import { AppDispatchType } from '../../../Redux/Store';
import { PaiementType } from '../../../types';
import PaiementAdd from './PaiementAdd';
import PaiementEdit from './PaiementEdit';

export default function PaymentsModule() {
  const dispatch = useDispatch<AppDispatchType>();
  const { datas: payments, action } = useSelector(getPaiementState);

  const [modalType, setModalType] = useState<'add' | 'edit' | null>(null);
  const [selectedPaiement, setSelectedPaiement] = useState<PaiementType | null>(null);

  useEffect(() => {
    dispatch(getAllPaiements());
  }, [dispatch]);

  const formatCurrency = (amount: number) => `${amount.toLocaleString()} Ar`;

  const getStatusBadge = (status: string) => {
    const base = "px-3 py-1 text-xs font-medium rounded-full";
    switch (status?.toLowerCase()) {
      case 'payé': return `${base} bg-green-100 text-green-800`;
      case 'en attente': return `${base} bg-yellow-100 text-yellow-800`;
      case 'en retard': return `${base} bg-red-100 text-red-800`;
      default: return `${base} bg-gray-100 text-gray-800`;
    }
  };

  const getMethodIcon = (method?: string) => {
    switch (method?.toLowerCase()) {
      case 'virement': return '🏦';
      case 'espèces': return '💵';
      case 'chèque': return '📄';
      case 'mobile money': return '📱';
      default: return '💳';
    }
  };

  const totalPaid = payments.filter(p => p.status === 'payé').reduce((sum, p) => sum + p.montant, 0);
  const totalPending = payments.filter(p => p.status === 'en attente').reduce((sum, p) => sum + p.montant, 0);
  const totalOverdue = payments.filter(p => p.status === 'en retard').reduce((sum, p) => sum + p.montant, 0);

  const openAddModal = () => setModalType('add');
  const openEditModal = (p: PaiementType) => {
    setSelectedPaiement(p);
    setModalType('edit');
  };
  const closeModal = () => {
    setModalType(null);
    setSelectedPaiement(null);
  };

  if (action.isLoading) return <div className="p-6">Chargement...</div>;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gestion des Paiements</h2>
          <p className="text-gray-600">Suivez et gérez toutes les transactions financières</p>
        </div>
        <button
          onClick={openAddModal}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
        >
          <DollarSign className="w-4 h-4" />
          <span>Enregistrer Paiement</span>
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: 'Total Payé', value: totalPaid, icon: TrendingUp },
          { title: 'En Attente', value: totalPending, icon: Calendar },
          { title: 'En Retard', value: totalOverdue, icon: CreditCard },
        ].map(({ title, value, icon: Icon }) => (
          <div key={title} className="rounded-xl shadow-sm border p-6 bg-white border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{title}</p>
                <p className="text-2xl font-bold text-blue-600">{formatCurrency(value)}</p>
              </div>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-blue-100">
                <Icon className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Payments List */}
      <div className="rounded-xl shadow-sm border p-6 bg-white border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Paiements Récents</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">Client</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Montant</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Méthode</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Statut</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Date</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      <span className="font-medium text-gray-900">
                        Réservation #{p.reservation?.id ?? 'N/A'}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4 font-semibold text-gray-900">{formatCurrency(p.montant)}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <span>{getMethodIcon(p.mode_paiement?.denomination_paie)}</span>
                      <span className="text-gray-600">{p.mode_paiement?.denomination_paie ?? 'N/A'}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={getStatusBadge(p.status)}>{p.status}</span>
                  </td>
                  <td className="py-4 px-4 text-gray-600">
                    {new Date(p.created_at).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="py-4 px-4">
                    <button
                      onClick={() => openEditModal(p)}
                      className="px-3 py-1 text-blue-500 hover:bg-blue-50 rounded text-sm transition-colors"
                    >
                      Modifier
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      {modalType === 'add' && <PaiementAdd onClose={closeModal} />}
      {modalType === 'edit' && selectedPaiement && (
        <PaiementEdit paiement={selectedPaiement} onClose={closeModal} />
      )}
    </div>
  );
}