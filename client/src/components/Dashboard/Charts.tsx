import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { chartData } from '../../data/mockData';

export function ReservationChart() {
  return (
    <div className="rounded-xl shadow-sm border p-6 bg-white border-gray-200">
      <h3 className="text-lg font-semibold mb-4 text-gray-900">Évolution des Contrats</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData.reservations}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="name" stroke="#6b7280" />
          <YAxis stroke="#6b7280" />
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              color: '#111827'
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

export function RevenueChart() {
  const formatCurrency = (value: number) => `${(value / 1000000).toFixed(1)}M Ar`;

  return (
    <div className="rounded-xl shadow-sm border p-6 bg-white border-gray-200">
      <h3 className="text-lg font-semibold mb-4 text-gray-900">Chiffre d'Affaires (Ariary)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData.revenue}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="name" stroke="#6b7280" />
          <YAxis stroke="#6b7280" tickFormatter={formatCurrency} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              color: '#111827'
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

export function PaymentStatusChart() {
  return (
    <div className="rounded-xl shadow-sm border p-6 bg-white border-gray-200">
      <h3 className="text-lg font-semibold mb-4 text-gray-900">Statut des Paiements</h3>
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
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              color: '#111827'
            }}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="flex justify-center space-x-6 mt-4">
        {chartData.payments.map((entry, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
            <span className="text-sm text-gray-600">{entry.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
