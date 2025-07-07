import React from 'react';
import { TrendingUp, TrendingDown, Users, Calendar, CreditCard, Package } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  change: number;
  icon: React.ElementType;
  gradient: string;
  currency?: boolean;
  isDarkMode: boolean;
}

function StatsCard({ title, value, change, icon: Icon, gradient, currency = false, isDarkMode }: StatsCardProps) {
  const isPositive = change >= 0;
  
  const formatValue = (val: string | number) => {
    if (currency && typeof val === 'number') {
      return `${val.toLocaleString()} Ar`;
    }
    return val;
  };
  
  return (
    <div className={`rounded-xl shadow-sm border p-6 hover:shadow-md transition-all ${
      isDarkMode 
        ? 'bg-slate-800 border-slate-700 hover:shadow-slate-900/20' 
        : 'bg-white border-gray-200'
    }`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-r ${gradient}`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className={`text-sm font-medium transition-colors ${
              isDarkMode ? 'text-slate-400' : 'text-gray-600'
            }`}>
              {title}
            </p>
            <p className={`text-2xl font-bold transition-colors ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {formatValue(value)}
            </p>
          </div>
        </div>
        <div className={`flex items-center space-x-1 ${
          isPositive 
            ? 'text-emerald-500' 
            : 'text-red-500'
        }`}>
          {isPositive ? (
            <TrendingUp className="w-4 h-4" />
          ) : (
            <TrendingDown className="w-4 h-4" />
          )}
          <span className="text-sm font-medium">{Math.abs(change)}%</span>
        </div>
      </div>
    </div>
  );
}

interface StatsCardsProps {
  isDarkMode: boolean;
}

export default function StatsCards({ isDarkMode }: StatsCardsProps) {
  const stats = [
    {
      title: 'Total Clients',
      value: '127',
      change: 12.5,
      icon: Users,
      gradient: 'from-blue-500 to-indigo-600'
    },
    {
      title: 'Contrats Actifs',
      value: '89',
      change: 8.2,
      icon: Calendar,
      gradient: 'from-emerald-500 to-teal-600'
    },
    {
      title: 'Chiffre d\'Affaires',
      value: 45892000,
      change: 15.7,
      icon: CreditCard,
      gradient: 'from-purple-500 to-pink-600',
      currency: true
    },
    {
      title: 'Matériels Disponibles',
      value: '156',
      change: -2.1,
      icon: Package,
      gradient: 'from-orange-500 to-red-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <StatsCard key={index} {...stat} isDarkMode={isDarkMode} />
      ))}
    </div>
  );
}