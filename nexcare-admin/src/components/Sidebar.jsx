import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FileText, LogOut, Users, UserCog, User, Shield, Wifi } from 'lucide-react';
import logo from '../assets/logo.svg';
import { cn } from '../lib/utils';
import { useAuth } from '../features/auth/AuthContext';
import { hasPermission, ROLE_LABELS } from '../lib/permissions';

export function Sidebar({ isOpen, onClose }) {
  const { logout, session } = useAuth();
  const role = session?.role;

  const handleLogout = async () => {
    await logout();
    window.location.href = '/login';
  };

  const allNavItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard', permission: 'view_all' },
    { icon: FileText, label: 'RFO Management', path: '/rfo', permission: 'view_rfo' },
    { icon: Users, label: 'Clients', path: '/clients', permission: 'view_client' },
    { icon: Wifi, label: 'Starlink', path: '/starlink', permission: 'view_client' },
    { icon: UserCog, label: 'Team Visit', path: '/team', permission: 'view_team_visit' },
    { icon: Shield, label: 'User Management', path: '/users', permission: 'manage_users' },
  ];

  const navItems = allNavItems.filter(item => hasPermission(role, item.permission));

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/50 z-20 md:hidden" onClick={onClose} />}

      <aside className={cn(
        "fixed md:relative z-30 w-64 h-screen bg-white dark:bg-gray-800 border-r border-gray-100 dark:border-gray-700 flex flex-col transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        {/* Logo */}
        <div className="h-20 flex items-center px-6 border-b border-gray-50 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Logo" className="w-8 h-8" onError={e => { e.target.style.display = 'none'; }} />
            <div className="flex flex-col">
              <span className="font-bold text-gray-800 dark:text-gray-100 tracking-tight text-lg">NEXCARE</span>
              <span className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wider">InternetWork</span>
            </div>
          </div>
        </div>

        {/* User Badge */}
        <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
              {session?.avatarUrl ? (
                <img src={`http://localhost:3001${session.avatarUrl}`} alt="" className="w-full h-full rounded-full object-cover" />
              ) : (
                <User size={18} className="text-purple-600 dark:text-purple-400" />
              )}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-gray-800 dark:text-gray-100 truncate">{session?.name || 'User'}</p>
              <p className="text-xs text-purple-600 dark:text-purple-400 font-medium">{ROLE_LABELS[role] || role}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => window.innerWidth < 768 && onClose()}
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100"
              )}
            >
              <item.icon size={20} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Bottom */}
        <div className="p-4 border-t border-gray-100 dark:border-gray-700 space-y-1">
          <NavLink
            to="/profile"
            onClick={() => window.innerWidth < 768 && onClose()}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
              isActive
                ? "bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
                : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
            )}
          >
            <User size={20} /> Profil Saya
          </NavLink>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          >
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>
    </>
  );
}
