import React, { useState, useEffect, useRef } from 'react';
import { Bell, Menu, Sun, Moon, UserCircle } from 'lucide-react';
import { useAuth } from '../features/auth/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../lib/api';

export function Header({ onMenuClick }) {
  const { session } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [notifs, setNotifs] = useState([]);
  const [showNotifs, setShowNotifs] = useState(false);
  const notifRef = useRef(null);

  const getTitle = () => {
    const map = { '/dashboard': 'Dashboard', '/rfo': 'RFO Management', '/starlink': 'Starlink', '/clients': 'Clients', '/team': 'Team Visit', '/profile': 'Profil Saya' };
    return map[location.pathname] || 'Dashboard';
  };

  const fetchNotifs = () => {
    if (!session) return;
    api.get('/notifications').then(({ data }) => setNotifs(data)).catch(() => { });
  };

  useEffect(() => {
    fetchNotifs();
    const interval = setInterval(fetchNotifs, 30000); // poll every 30s
    return () => clearInterval(interval);
  }, [session]);

  useEffect(() => {
    const handler = (e) => { if (notifRef.current && !notifRef.current.contains(e.target)) setShowNotifs(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const unreadCount = notifs.filter(n => !n.isRead).length;

  const markRead = async (id) => {
    await api.patch(`/notifications/${id}/read`);
    setNotifs(n => n.map(x => x.id === id ? { ...x, isRead: true } : x));
  };

  const markAllRead = async () => {
    await api.patch('/notifications/mark-all-read');
    setNotifs(n => n.map(x => ({ ...x, isRead: true })));
  };

  const avatarSrc = session?.avatarUrl
    ? `http://localhost:3001${session.avatarUrl}`
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(session?.name || 'User')}&background=9333ea&color=fff`;

  return (
    <header className="h-20 bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 sticky top-0 z-10 px-6 flex items-center justify-between transition-colors">
      <div className="flex items-center gap-4">
        <button onClick={onMenuClick} className="md:hidden p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors">
          <Menu size={20} />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center text-white md:hidden"><span className="font-bold">N</span></div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 hidden md:block">{getTitle()}</h2>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden sm:flex flex-col items-end">
          <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{session?.name || 'User'}</span>
          <span className="text-xs text-gray-500 dark:text-gray-400">{session?.role?.replace('_', ' ').toUpperCase()}</span>
        </div>

        <button onClick={toggleTheme} className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button onClick={() => setShowNotifs(v => !v)} className="relative p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-red-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center px-0.5">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>

          {showNotifs && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
                <h3 className="font-semibold text-gray-800 dark:text-gray-100 text-sm">Notifikasi</h3>
                {unreadCount > 0 && <button onClick={markAllRead} className="text-xs text-purple-600 dark:text-purple-400 hover:underline">Tandai semua dibaca</button>}
              </div>
              <div className="max-h-72 overflow-y-auto divide-y divide-gray-100 dark:divide-gray-700">
                {notifs.length === 0 ? (
                  <p className="text-center text-gray-400 dark:text-gray-500 text-sm py-8">Tidak ada notifikasi.</p>
                ) : notifs.map(n => (
                  <div key={n.id} onClick={() => markRead(n.id)} className={`px-4 py-3 cursor-pointer transition-colors ${n.isRead ? 'bg-white dark:bg-gray-800' : 'bg-purple-50 dark:bg-purple-900/20'} hover:bg-gray-50 dark:hover:bg-gray-700`}>
                    <p className="text-sm text-gray-800 dark:text-gray-200 leading-snug">{n.message}</p>
                    <p className="text-xs text-gray-400 mt-1">{new Date(n.createdAt).toLocaleString('id-ID')}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Avatar → go to profile */}
        <button onClick={() => navigate('/profile')} className="flex-shrink-0">
          <img src={avatarSrc} alt="Profile" className="w-10 h-10 rounded-full border-2 border-purple-100 dark:border-purple-900 hover:border-purple-400 transition-colors" />
        </button>
      </div>
    </header>
  );
}
