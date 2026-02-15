import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FileText, Settings, LogOut, Menu, X, Satellite, Users, UserCog } from 'lucide-react';
import logo from '../assets/logo.svg';
import { cn } from '../lib/utils';
import { useAuth } from '../features/auth/AuthContext';
import { AuthNotification } from './AuthNotification';

export function Sidebar({ isOpen, onClose }) {
  const { logout, session } = useAuth();
  const [showLogoutNotification, setShowLogoutNotification] = useState(false);
  
  const handleLogout = () => {
    setShowLogoutNotification(true);
    setTimeout(() => {
        logout();
    }, 2000);
  };

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: FileText, label: 'RFO Management', path: '/rfo' },
    { icon: Satellite, label: 'Starlink', path: '/starlink' },
    { icon: Users, label: 'Clients', path: '/clients' },
    // Only show Team Management for NOC2
    ...(session?.position === 'NOC2' ? [{ icon: UserCog, label: 'Team', path: '/team' }] : []), 
  ];

  return (
    <>
      <AuthNotification 
        isVisible={showLogoutNotification}
        type="logout"
        message="Logging you out safely..."
      />

      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 md:hidden" 
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside className={cn(
        "fixed md:relative z-30 w-64 h-screen bg-white border-r border-gray-100 flex flex-col transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        {/* Logo Area */}
        <div className="h-20 flex items-center px-6 border-b border-gray-50">
           <div className="flex items-center gap-3">
             <img src={logo} alt="Logo" className="w-8 h-8" />
             <div className="flex flex-col">
               <span className="font-bold text-gray-800 tracking-tight text-lg">NEXCARE</span>
               <span className="text-[10px] text-gray-500 uppercase tracking-wider">Connecting Data</span>
             </div>
           </div>
           <button onClick={onClose} className="md:hidden ml-auto text-gray-400">
             <X size={24} />
           </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => window.innerWidth < 768 && onClose()}
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive 
                  ? "bg-purple-50 text-purple-700" 
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <item.icon size={20} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-gray-50 space-y-1">
          <NavLink
            to="/settings"
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
              isActive 
                ? "bg-purple-50 text-purple-700" 
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            )}
           >
             <Settings size={20} />
             Settings
           </NavLink>
           <button
             onClick={handleLogout}
             className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
           >
             <LogOut size={20} />
             Logout
           </button>
        </div>
      </aside>
    </>
  );
}
