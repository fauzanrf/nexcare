import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { Card } from '../../components/Card';
import { Calendar, User } from 'lucide-react';
import api from '../../lib/api';

export function DashboardCharts() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get('/dashboard/stats').then(({ data }) => setStats(data)).catch(() => { });
  }, []);

  const starlinkUtils = [
    { name: 'Aktif', value: stats?.starlinkActive ?? 0, fill: '#9333ea' },
    { name: 'Suspend', value: stats?.starlinkSuspend ?? 0, fill: '#ef4444' },
  ];

  const rfoBar = [
    { name: 'Pending', value: stats?.rfoPending ?? 0, fill: '#eab308' },
    { name: 'Approved', value: stats?.rfoApproved ?? 0, fill: '#22c55e' },
  ];

  const upcomingVisits = stats?.upcomingVisits ?? [];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart - RFO Stats */}
        <Card>
          <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-6">Statistik RFO</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={rfoBar} margin={{ top: 10, right: 30, left: 0, bottom: 5 }} barSize={60}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="name" tick={{ fill: '#6b7280', fontSize: 13 }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fill: '#6b7280', fontSize: 12 }} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="value" radius={[6, 6, 0, 0]} animationDuration={1000}>
                  {rfoBar.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Pie Chart - Starlink */}
        <Card>
          <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-6">Status Starlink</h3>
          <div className="h-72 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={starlinkUtils} cx="50%" cy="50%" innerRadius={65} outerRadius={105} paddingAngle={5} dataKey="value" stroke="none">
                  {starlinkUtils.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Legend verticalAlign="middle" align="right" layout="vertical" iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Upcoming Team Visits */}
      <Card>
        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">Jadwal Team Visit Mendatang</h3>
        {upcomingVisits.length === 0 ? (
          <p className="text-gray-400 dark:text-gray-500 text-sm text-center py-6">Belum ada jadwal team visit.</p>
        ) : (
          <div className="divide-y divide-gray-100 dark:divide-gray-700">
            {upcomingVisits.map((visit) => (
              <div key={visit.id} className="py-3 flex items-center gap-4">
                <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
                  <Calendar size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-800 dark:text-gray-100 truncate">{visit.title}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{visit.scheduledDate} {visit.scheduledTime || ''} — {visit.location || 'Lokasi belum ditentukan'}</p>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                  <User size={13} />
                  <span>{visit.assignedToName || 'Belum ditugaskan'}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
