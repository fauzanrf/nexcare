import React, { useEffect, useState } from 'react';
import { Users, Clock, CheckCircle, Satellite, Ban } from 'lucide-react';
import { Card } from '../../components/Card';
import api from '../../lib/api';

export function StatsCards() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/dashboard/stats')
      .then(({ data }) => setStats(data))
      .catch(() => { })
      .finally(() => setLoading(false));
  }, []);

  const cards = [
    { label: 'RFO Pending', value: stats?.rfoPending ?? '-', icon: Clock, color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300' },
    { label: 'RFO Approved', value: stats?.rfoApproved ?? '-', icon: CheckCircle, color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' },
    { label: 'Starlink Aktif', value: stats?.starlinkActive ?? '-', icon: Satellite, color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300' },
    { label: 'Starlink Suspend', value: stats?.starlinkSuspend ?? '-', icon: Ban, color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <Card key={i} className="flex items-center gap-4 hover:shadow-md transition-shadow cursor-default">
            <div className={`p-4 rounded-xl ${stat.color}`}>
              <Icon size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{stat.label}</p>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mt-1">
                {loading ? <span className="inline-block w-8 h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" /> : stat.value}
              </h3>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
