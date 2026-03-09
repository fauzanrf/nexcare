import React, { useState } from 'react';
import { X, Wifi, Shield, Mail, Lock, Server, Building2, Hash } from 'lucide-react';
import { cn } from '../../lib/utils';

export function StarlinkDetailModal({ data, onClose, hidePasswords }) {
  if (!data) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-2xl overflow-hidden flex flex-col shadow-2xl animate-in zoom-in-95 duration-200">

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-700 bg-purple-50/50 dark:bg-purple-900/10">
          <div className="flex items-center gap-4">
            <div className="bg-purple-100 dark:bg-purple-900/40 p-3 rounded-xl border border-purple-200 dark:border-purple-700">
              <Wifi className="w-6 h-6 text-purple-700 dark:text-purple-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Detail Akun Starlink</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-mono mt-0.5">{data.accountNumber || data.id}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-400 hover:text-gray-600"
          >
            <X size={22} />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 space-y-8 overflow-y-auto max-h-[70vh]">

          {/* Client info */}
          {data.client && (
            <div className="bg-gray-50 dark:bg-gray-700/40 rounded-xl p-4 flex items-center gap-3">
              <Building2 className="text-purple-500 flex-shrink-0" size={20} />
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider font-semibold mb-0.5">Client</p>
                <p className="font-semibold text-gray-900 dark:text-gray-100">{data.client.name}</p>
                <p className="text-xs font-mono text-purple-600 dark:text-purple-400">{data.client.cidIw}</p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-7">
            <InfoItem label="No. Account" value={data.accountNumber} icon={<Hash className="w-4 h-4" />} />
            <StatusItem label="Status Starlink" status={data.status} />

            <InfoItem label="Email Starlink" value={data.emailStarlink} icon={<Mail className="w-4 h-4" />} />
            <InfoItem
              label="Password Starlink"
              value={hidePasswords ? '••••••••' : data.passwordStarlink}
              icon={<Lock className="w-4 h-4" />}
              isPassword={!hidePasswords}
            />

            <InfoItem label="Email Hosting" value={data.emailHosting} icon={<Server className="w-4 h-4" />} />
            <InfoItem
              label="Password Hosting"
              value={hidePasswords ? '••••••••' : data.passwordHosting}
              icon={<Lock className="w-4 h-4" />}
              isPassword={!hidePasswords}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/20 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
          >
            Tutup
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
        "text-base font-medium text-gray-800 dark:text-gray-100",
        isPassword && "font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded w-fit text-sm"
      )}>
        {value || '-'}
      </span>
    </div>
  );
}

function StatusItem({ label, status }) {
  const isActive = status?.toLowerCase() === 'active';
  return (
    <div className="flex flex-col space-y-1.5">
      <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-1">{label}</span>
      <span className={cn(
        "px-3 py-1 rounded-full text-xs font-bold w-fit uppercase border",
        isActive
          ? "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
          : "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800"
      )}>
        {status}
      </span>
    </div>
  );
}
