import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#f3f4f6]">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-8">
           <Outlet />
           
           <footer className="mt-12 py-6 text-center border-t border-gray-200">
              <p className="text-sm text-gray-500 font-medium">
                This Design Made With <span className="text-red-500">♡</span> By Fauzan Rahadian Faris - Exclusive For PT InternetWork Indonesia
              </p>
           </footer>
        </main>
      </div>
    </div>
  );
}
