import React from 'react';
import { X, User, MapPin, Activity, Server, Phone, Hash } from 'lucide-react';
import { cn } from '../../lib/utils';

export function ClientDetailModal({ data, onClose }) {
  if (!data) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-2xl w-full max-w-3xl overflow-hidden flex flex-col shadow-2xl animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-purple-50/50">
          <div className="flex items-center gap-4">
            <div className="bg-purple-100 p-3 rounded-xl border border-purple-200">
              <User className="w-6 h-6 text-purple-700" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">Client Detail</h2>
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
        <div className="p-8 space-y-8 overflow-y-auto max-h-[80vh]">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            <div className="md:col-span-2">
                 <InfoItem label="Client Name" value={data.name} icon={<User className="w-4 h-4" />} isHighlight />
            </div>

            <InfoItem label="Client Bandwidth" value={data.bandwidth} icon={<Activity className="w-4 h-4" />} />
            <InfoItem label="Services" value={data.services} icon={<Server className="w-4 h-4" />} />
            
            <div className="md:col-span-2">
                <InfoItem label="Customer Address" value={data.address} icon={<MapPin className="w-4 h-4" />} />
            </div>

            <div className="md:col-span-2 border-t border-gray-100 pt-6 mt-2">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-6">Vendor Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <InfoItem label="Vendor Name" value={data.vendorName} />
                    <InfoItem label="Vendor CID" value={data.vendorCid} />
                    <InfoItem label="Vendor Bandwidth" value={data.vendorBandwidth} />
                </div>
            </div>

            <div className="md:col-span-2 border-t border-gray-100 pt-6 mt-2">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-6">Installation Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InfoItem label="Installation Name" value={data.installName} icon={<User className="w-4 h-4" />} />
                    <InfoItem label="Installation Phone" value={data.installPhone} icon={<Phone className="w-4 h-4" />} />
                </div>
            </div>
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

function InfoItem({ label, value, icon, isHighlight }) {
  return (
    <div className="flex flex-col space-y-1.5">
      <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold flex items-center gap-1.5">
        {icon} {label}
      </span>
      <span className={cn(
        "text-base font-medium text-gray-800",
        isHighlight && "text-lg font-bold text-purple-700"
      )}>
        {value}
      </span>
    </div>
  );
}
