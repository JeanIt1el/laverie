import React, { useState } from 'react';
import { CreditCard, DollarSign, Calendar, User, Filter, TrendingUp } from 'lucide-react';
import { mockPayments } from '../../data/mockData';
import { Payment } from '../../types';

interface PaymentsModuleProps {
  isDarkMode: boolean;
}

export default function PaymentsModule({ isDarkMode }: PaymentsModuleProps) {
  const [payments, setPayments] = useState<Payment[]>(mockPayments);
  const [filterStatus, setFilterStatus] = useState<'all' | 'paye' | 'en-attente' | 'en-retard'>('all');

  const filteredPayments = payments.filter(payment => 
    filterStatus === 'all' || payment.status === filterStatus
  );

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-3 py-1 text-xs font-medium rounded-full";
    switch (status) {
      case 'paye':
        return `${baseClasses} ${isDarkMode ? 'bg-emerald-900/50 text-emerald-400' : 'bg-emerald-100 text-emerald-800'}`;
      case 'en-attente':
        return `${baseClasses} ${isDarkMode ? 'bg-yellow-900/50 text-yellow-400' : 'bg-yellow-100 text-yellow-800'}`;
      case 'en-retard':
        return `${baseClasses} ${isDarkMode ? 'bg-red-900/50 text-red-400' : 'bg-red-100 text-red-800'}`;
      default:
        return `${baseClasses} ${isDarkMode ? 'bg-slate-700 text-slate-400' : 'bg-gray-100 text-gray-800'}`;
    }
  };

  const getMethodIcon = (method: string) => {
    switch (method) {
      case 'virement':
        return '🏦';
      case 'especes':
        return '💵';
      case 'cheque':
        return '📄';
      case 'mobile-money':
        return '📱';
      default:
        return '💰';
    }
  };

  const getMethodLabel = (method: string) => {
    const labels = {
      'virement': 'Virement',
      'especes': 'Espèces',
      'cheque': 'Chèque',
      'mobile-money': 'Mobile Money'
    };
    return labels[method as keyof typeof labels] || method;
  };

  const formatCurrency = (amount: number, currency: string) => {
    return currency === 'MGA' ? `${amount.toLocaleString()} Ar` : `${amount} €`;
  };

  const totalPaid = payments.filter(p => p.status === 'paye').reduce((sum, p) => sum + p.amount, 0);
  const totalPending = payments.filter(p => p.status === 'en-attente').reduce((sum, p) => sum + p.amount, 0);
  const totalOverdue = payments.filter(p => p.status === 'en-retard').reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-2xl font-bold transition-colors ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Gestion des Paiements
          </h2>
          <p className={`transition-colors ${
            isDarkMode ? 'text-slate-400' : 'text-gray-600'
          }`}>
            Suivez et gérez toutes les transactions financières
          </p>
        </div>
        <button className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all flex items-center space-x-2">
          <DollarSign className="w-4 h-4" />
          <span>Enregistrer Paiement</span>
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={`rounded-xl shadow-sm border p-6 transition-colors ${
          isDarkMode 
            ? 'bg-slate-800 border-slate-700' 
            : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium transition-colors ${
                isDarkMode ? 'text-slate-400' : 'text-gray-600'
              }`}>
                Total Payé
              </p>
              <p className="text-2xl font-bold text-emerald-500">{formatCurrency(totalPaid, 'MGA')}</p>
            </div>
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
              isDarkMode ? 'bg-emerald-900/50' : 'bg-emerald-100'
            }`}>
              <TrendingUp className="w-6 h-6 text-emerald-500" />
            </div>
          </div>
        </div>
        
        <div className={`rounded-xl shadow-sm border p-6 transition-colors ${
          isDarkMode 
            ? 'bg-slate-800 border-slate-700' 
            : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium transition-colors ${
                isDarkMode ? 'text-slate-400' : 'text-gray-600'
              }`}>
                En Attente
              </p>
              <p className="text-2xl font-bold text-yellow-500">{formatCurrency(totalPending, 'MGA')}</p>
            </div>
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
              isDarkMode ? 'bg-yellow-900/50' : 'bg-yellow-100'
            }`}>
              <Calendar className="w-6 h-6 text-yellow-500" />
            </div>
          </div>
        </div>
        
        <div className={`rounded-xl shadow-sm border p-6 transition-colors ${
          isDarkMode 
            ? 'bg-slate-800 border-slate-700' 
            : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium transition-colors ${
                isDarkMode ? 'text-slate-400' : 'text-gray-600'
              }`}>
                En Retard
              </p>
              <p className="text-2xl font-bold text-red-500">{formatCurrency(totalOverdue, 'MGA')}</p>
            </div>
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
              isDarkMode ? 'bg-red-900/50' : 'bg-red-100'
            }`}>
              <CreditCard className="w-6 h-6 text-red-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Payments List */}
      <div className={`rounded-xl shadow-sm border p-6 transition-colors ${
        isDarkMode 
          ? 'bg-slate-800 border-slate-700' 
          : 'bg-white border-gray-200'
      }`}>
        <div className="flex items-center justify-between mb-6">
          <h3 className={`text-lg font-semibold transition-colors ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Paiements Récents
          </h3>
          <div className="flex items-center space-x-4">
            <Filter className={`w-4 h-4 transition-colors ${
              isDarkMode ? 'text-slate-400' : 'text-gray-400'
            }`} />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className={`px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors ${
                isDarkMode 
                  ? 'bg-slate-700 border-slate-600 text-white' 
                  : 'bg-white border-gray-200 text-gray-900'
              }`}
            >
              <option value="all">Tous les statuts</option>
              <option value="paye">Payé</option>
              <option value="en-attente">En Attente</option>
              <option value="en-retard">En Retard</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`border-b transition-colors ${
                isDarkMode ? 'border-slate-700' : 'border-gray-200'
              }`}>
                <th className={`text-left py-3 px-4 font-medium transition-colors ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Client
                </th>
                <th className={`text-left py-3 px-4 font-medium transition-colors ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Montant
                </th>
                <th className={`text-left py-3 px-4 font-medium transition-colors ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Méthode
                </th>
                <th className={`text-left py-3 px-4 font-medium transition-colors ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Statut
                </th>
                <th className={`text-left py-3 px-4 font-medium transition-colors ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Date
                </th>
                <th className={`text-left py-3 px-4 font-medium transition-colors ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Échéance
                </th>
                <th className={`text-left py-3 px-4 font-medium transition-colors ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((payment) => (
                <tr key={payment.id} className={`border-b transition-colors ${
                  isDarkMode 
                    ? 'border-slate-700 hover:bg-slate-700/50' 
                    : 'border-gray-100 hover:bg-gray-50'
                }`}>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      <span className={`font-medium transition-colors ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        {payment.clientName}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`text-lg font-semibold transition-colors ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {formatCurrency(payment.amount, payment.currency)}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{getMethodIcon(payment.method)}</span>
                      <span className={`transition-colors ${
                        isDarkMode ? 'text-slate-400' : 'text-gray-600'
                      }`}>
                        {getMethodLabel(payment.method)}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={getStatusBadge(payment.status)}>
                      {payment.status}
                    </span>
                  </td>
                  <td className={`py-4 px-4 transition-colors ${
                    isDarkMode ? 'text-slate-400' : 'text-gray-600'
                  }`}>
                    {new Date(payment.date).toLocaleDateString('fr-FR')}
                  </td>
                  <td className={`py-4 px-4 transition-colors ${
                    isDarkMode ? 'text-slate-400' : 'text-gray-600'
                  }`}>
                    {new Date(payment.dueDate).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded text-sm transition-colors">
                        Voir
                      </button>
                      {payment.status !== 'paye' && (
                        <button className="px-3 py-1 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded text-sm hover:shadow-lg transition-all">
                          Marquer Payé
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}