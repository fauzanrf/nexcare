import { Bell, Menu, CheckCircle } from 'lucide-react';
import { useAuth } from '../features/auth/AuthContext';
import { useLocation } from 'react-router-dom';

export function Header({ onMenuClick }) {
  const { session } = useAuth();
  const location = useLocation();

  const getTitle = () => {
    switch(location.pathname) {
      case '/': return 'Dashboard';
      case '/rfo': return 'RFO Management';
      case '/settings': return 'Settings';
      default: return 'Dashboard';
    }
  };

  return (
    <header className="h-20 bg-white/50 backdrop-blur-sm sticky top-0 z-10 px-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-md"
        >
          <Menu size={20} />
        </button>
        <div className="flex items-center gap-2">
           {/* Simple colored shape logo for header if needed, or just text */}
           <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center text-white md:hidden">
              <span className="font-bold">N</span>
           </div>
           <h2 className="text-xl font-bold text-gray-800 hidden md:block">{getTitle()}</h2>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex flex-col items-end hidden sm:flex">
             <span className="text-sm font-medium text-gray-900">
                {session?.name || 'Admin'}
             </span>
             <span className="text-xs text-gray-500">
                {session?.position || 'NOC2'}
             </span>
        </div>
        
        <div className="relative">
          <Bell size={20} className="text-gray-500 hover:text-gray-700 cursor-pointer" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
        </div>

        <img 
          src={`https://ui-avatars.com/api/?name=${session?.name || 'Admin'}&background=9333ea&color=fff`} 
          alt="Profile" 
          className="w-10 h-10 rounded-full border-2 border-purple-100"
        />
      </div>
    </header>
  );
}
