import React from 'react';
import { X, Wifi, Shield, Mail, Lock, Server } from 'lucide-react';
import { cn } from '../../lib/utils';

export function StarlinkDetailModal({ data, onClose }) {
  if (!data) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden flex flex-col shadow-2xl animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-purple-50/50">
          <div className="flex items-center gap-4">
            <div className="bg-purple-100 p-3 rounded-xl border border-purple-200">
              <Wifi className="w-6 h-6 text-purple-700" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">Starlink Detail</h2>
              <p className="text-sm text-gray-500 font-mono mt-1">{data.id}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            <InfoItem label="Starlink Name" value={data.name} icon={<Server className="w-4 h-4" />} />
            <StatusItem label="Status Starlink" status={data.status} />
            
            <InfoItem label="Starlink Email" value={data.email} icon={<Mail className="w-4 h-4" />} />
            <InfoItem label="Starlink Password" value={data.password} icon={<Lock className="w-4 h-4" />} isPassword />
            
            <InfoItem label="Password Email" value={data.passwordEmail} icon={<Lock className="w-4 h-4" />} isPassword />
            <div className="hidden md:block"></div> {/* Spacer */}

            <StatusItem label="OPT Status" status={data.optStatus} />
            <InfoItem label="OPT Quota" value={data.optQuota} icon={<Shield className="w-4 h-4" />} />
          </div>

        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function InfoItem({ label, value, icon, isPassword }) {
  return (
    <div className="flex flex-col space-y-1.5">
      <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold flex items-center gap-1.5">
        {icon} {label}
      </span>
      <span className={cn(
        "text-base font-medium text-gray-800",
        isPassword && "font-mono bg-gray-100 px-2 py-1 rounded w-fit text-sm"
      )}>
        {value}
      </span>
    </div>
  );
}

function StatusItem({ label, status }) {
  const isActive = status?.toLowerCase() === 'active';
  return (
    <div className="flex flex-col space-y-1.5">
      <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-1">
        {label}
      </span>
      <span className={cn(
        "px-3 py-1 rounded-full text-xs font-bold w-fit uppercase border",
        isActive 
          ? "bg-green-50 text-green-700 border-green-200" 
          : "bg-red-50 text-red-700 border-red-200"
      )}>
        {status}
      </span>
    </div>
  );
}
