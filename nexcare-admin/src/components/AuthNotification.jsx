import React from 'react';
import { cn } from '../lib/utils';
import logo from '../assets/logo.svg';

export function AuthNotification({ type, message, isVisible }) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="flex flex-col items-center space-y-6 animate-in zoom-in-95 slide-in-from-bottom-10 duration-500">
        <div className="relative">
            <div className="absolute inset-0 bg-purple-200 rounded-full blur-xl opacity-50 animate-pulse"></div>
            <img 
                src={logo} 
                alt="Logo" 
                className="w-24 h-24 relative z-10 animate-bounce" 
                style={{ animationDuration: '2s' }}
            />
        </div>
        
        <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
                {type === 'login' ? 'Welcome Back!' : 'See You Soon!'}
            </h2>
            <p className="text-gray-500 text-lg font-medium">{message}</p>
        </div>

        <div className="flex gap-2 mt-4">
            <div className="w-2 h-2 rounded-full bg-purple-600 animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 rounded-full bg-purple-600 animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 rounded-full bg-purple-600 animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
}
