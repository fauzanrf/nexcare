import React from 'react';
import { X, User, Mail, Lock, Briefcase, FileSignature, Image as ImageIcon } from 'lucide-react';
import { cn } from '../../lib/utils';

export function TeamDetailModal({ data, onClose }) {
  if (!data) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden flex flex-col shadow-2xl animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-purple-50/50">
          <div className="flex items-center gap-4">
            <div className="bg-purple-100 p-3 rounded-xl border border-purple-200">
              <User className="w-6 h-6 text-purple-700" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">Team Member Detail</h2>
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
          
          <div className="flex flex-col items-center mb-6">
             <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-purple-100 mb-3">
                <img src={data.profilePicture || `https://ui-avatars.com/api/?name=${data.name}`} alt="Profile" className="w-full h-full object-cover" />
             </div>
             <h3 className="text-xl font-bold text-gray-900">{data.name}</h3>
             <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-50 text-purple-700 mt-2 border border-purple-100">
                {data.position}
             </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            <InfoItem label="Email Address" value={data.email} icon={<Mail className="w-4 h-4" />} />
            <InfoItem label="Password" value={data.password} icon={<Lock className="w-4 h-4" />} isPassword />
            
            <div className="md:col-span-2 space-y-2">
                <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold flex items-center gap-1.5">
                    <FileSignature className="w-4 h-4" /> Signature
                </span>
                <div className="h-24 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                    <img src={data.signature} alt="Signature" className="h-full object-contain opacity-80" />
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
