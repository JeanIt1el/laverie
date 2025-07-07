import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { chartData } from '../../data/mockData';

interface ChartProps {
  isDarkMode: boolean;
}

export function ReservationChart({ isDarkMode }: ChartProps) {
  return (
    <div className={`rounded-xl shadow-sm border p-6 transition-colors ${
      isDarkMode 
        ? 'bg-slate-800 border-slate-700' 
        : 'bg-white border-gray-200'
    }`}>
      <h3 className={`text-lg font-semibold mb-4 transition-colors ${
        isDarkMode ? 'text-white' : 'text-gray-900'
      }`}>
        Évolution des Contrats
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData.reservations}>
          <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#374151' : '#f0f0f0'} />
          <XAxis dataKey="name" stroke={isDarkMode ? '#9CA3AF' : '#6b7280'} />
          <YAxis stroke={isDarkMode ? '#9CA3AF' : '#6b7280'} />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: isDarkMode ? '#1F2937' : 'white',
              border: `1px solid ${isDarkMode ? '#374151' : '#e5e7eb'}`,
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              color: isDarkMode ? '#F9FAFB' : '#111827'
            }}
          />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke="url(#colorGradient)" 
            strokeWidth={3}
            dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
          />
          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
          </defs>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function RevenueChart({ isDarkMode }: ChartProps) {
  const formatCurrency = (value: number) => {
    return `${(value / 1000000).toFixed(1)}M Ar`;
  };

  return (
    <div className={`rounded-xl shadow-sm border p-6 transition-colors ${
      isDarkMode 
        ? 'bg-slate-800 border-slate-700' 
        : 'bg-white border-gray-200'
    }`}>
      <h3 className={`text-lg font-semibold mb-4 transition-colors ${
        isDarkMode ? 'text-white' : 'text-gray-900'
      }`}>
        Chiffre d'Affaires (Ariary)
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData.revenue}>
          <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#374151' : '#f0f0f0'} />
          <XAxis dataKey="name" stroke={isDarkMode ? '#9CA3AF' : '#6b7280'} />
          <YAxis stroke={isDarkMode ? '#9CA3AF' : '#6b7280'} tickFormatter={formatCurrency} />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: isDarkMode ? '#1F2937' : 'white',
              border: `1px solid ${isDarkMode ? '#374151' : '#e5e7eb'}`,
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              color: isDarkMode ? '#F9FAFB' : '#111827'
            }}
            formatter={(value: number) => [`${value.toLocaleString()} Ar`, 'Chiffre d\'Affaires']}
          />
          <Bar dataKey="value" fill="url(#revenueGradient)" radius={[4, 4, 0, 0]} />
          <defs>
            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function PaymentStatusChart({ isDarkMode }: ChartProps) {
  return (
    <div className={`rounded-xl shadow-sm border p-6 transition-colors ${
      isDarkMode 
        ? 'bg-slate-800 border-slate-700' 
        : 'bg-white border-gray-200'
    }`}>
      <h3 className={`text-lg font-semibold mb-4 transition-colors ${
        isDarkMode ? 'text-white' : 'text-gray-900'
      }`}>
        Statut des Paiements
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData.payments}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={5}
            dataKey="value"
          >
            {chartData.payments.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ 
              backgroundColor: isDarkMode ? '#1F2937' : 'white',
              border: `1px solid ${isDarkMode ? '#374151' : '#e5e7eb'}`,
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              color: isDarkMode ? '#F9FAFB' : '#111827'
            }}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="flex justify-center space-x-6 mt-4">
        {chartData.payments.map((entry, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: entry.color }}></div>
            <span className={`text-sm transition-colors ${
              isDarkMode ? 'text-slate-400' : 'text-gray-600'
            }`}>
              {entry.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}