import { Users, Clock, Satellite, Ban } from 'lucide-react';
import { Card } from '../../components/Card';
import { db } from '../../lib/db';

export function StatsCards() {
  // Calculate specific stats based on user request
  const totalClients = db.clientData ? db.clientData.length : 0;
  const rfoPending = db.rfoData ? db.rfoData.filter(item => item.status === 'Pending').length : 0;
  const starlinkActive = db.starlinkData ? db.starlinkData.filter(item => item.status === 'Active').length : 0;
  const starlinkSuspend = db.starlinkData ? db.starlinkData.filter(item => item.status === 'Suspend').length : 0;

  const stats = [
    { 
        label: "Total Client", 
        value: totalClients, 
        icon: Users, 
        color: "bg-blue-100 text-blue-700" 
    },
    { 
        label: "RFO Pending", 
        value: rfoPending, 
        icon: Clock, 
        color: "bg-yellow-100 text-yellow-700" 
    },
    { 
        label: "Starlink Active", 
        value: starlinkActive, 
        icon: Satellite, 
        color: "bg-purple-100 text-purple-700" 
    },
    { 
        label: "Starlink Suspend", 
        value: starlinkSuspend, 
        icon: Ban, 
        color: "bg-red-100 text-red-700" 
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="flex items-center gap-4 hover:shadow-md transition-shadow cursor-default">
            <div className={`p-4 rounded-xl ${stat.color}`}>
              <Icon size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{stat.label}</p>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mt-1">{stat.value}</h3>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
