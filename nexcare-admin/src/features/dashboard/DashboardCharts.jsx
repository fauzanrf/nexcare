import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { Card } from '../../components/Card';
import { db } from '../../lib/db';

export function DashboardCharts() {
  
  // 1. Process Starlink Status Data
  const starlinkActiveCount = db.starlinkData ? db.starlinkData.filter(i => i.status === 'Active').length : 0;
  const starlinkSuspendCount = db.starlinkData ? db.starlinkData.filter(i => i.status === 'Suspend').length : 0;

  const starlinkUtils = [
    { name: "Active", value: starlinkActiveCount, fill: "#9333ea" }, // Purple-600
    { name: "Suspend", value: starlinkSuspendCount, fill: "#ef4444" } // Red-500
  ];

  // 2. Process RFO Duration Data
  // Helper to parse strings like "1 Hour", "30 Minutes", "2.5 Hours" into minutes
  const parseDuration = (str) => {
    if (!str) return 0;
    const lower = str.toLowerCase();
    let minutes = 0;
    
    if (lower.includes('hour')) {
        const val = parseFloat(lower);
        minutes = val * 60;
    } else if (lower.includes('minute')) {
        const val = parseFloat(lower);
        minutes = val;
    }
    return Math.round(minutes);
  };

  const rfoDurationData = db.rfoData.map(rfo => ({
    name: rfo.id, // Using ID or Client Name
    duration: parseDuration(rfo.durationInterruption),
    fullDuration: rfo.durationInterruption
  })).slice(0, 7); // Show max 7 for readability

  // Sort by duration descending? Or just keep recent? Let's keep recent.
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Bar Chart - RFO Duration */}
      <Card>
        <h3 className="text-lg font-bold text-gray-800 mb-6">RFO Duration (Minutes)</h3>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={rfoDurationData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }} barSize={40}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
              <XAxis 
                dataKey="name" 
                tick={{fill: '#6b7280', fontSize: 11}} 
                tickLine={false}
                axisLine={false}
                dy={10}
              />
              <YAxis 
                tick={{fill: '#6b7280', fontSize: 12}} 
                tickLine={false}
                axisLine={false}
              />
              <Tooltip 
                cursor={{fill: '#f3f4f6'}}
                contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                formatter={(value, name, props) => [`${value} Min`, "Duration"]}
                labelStyle={{fontWeight: 'bold', color: '#374151'}}
              />
              <Bar 
                dataKey="duration" 
                name="Duration (Minutes)"
                radius={[4, 4, 0, 0]} 
                animationDuration={1500}
                fill="#8b5cf6"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Pie Chart - Starlink Status */}
      <Card>
        <h3 className="text-lg font-bold text-gray-800 mb-6">Starlink Status Overview</h3>
        <div className="h-80 w-full flex items-center justify-center relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={starlinkUtils}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {starlinkUtils.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip 
                 contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
              />
              <Legend 
                verticalAlign="middle" 
                align="right"
                layout="vertical"
                iconType="circle"
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
