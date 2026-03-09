import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './features/auth/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import LoginPage from './features/auth/LoginPage';
import DashboardLayout from './layouts/DashboardLayout';

import DashboardPage from './features/dashboard/DashboardPage';
import RFOManagementPage from './features/rfo/RFOManagementPage';
import ClientManagementPage from './features/clients/ClientManagementPage';
import TeamManagementPage from './features/team/TeamManagementPage';
import UserManagementPage from './features/users/UserManagementPage';
import ProfilePage from './features/profile/ProfilePage';
import StarlinkManagementPage from './features/starlink/StarlinkManagementPage';
// Protected Route Wrapper
const ProtectedRoute = () => {
  const { session, isLoading } = useAuth();
  if (isLoading) return (
    <div className="h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-gray-500 dark:text-gray-400">Memuat sesi...</p>
      </div>
    </div>
  );
  return session ? <Outlet /> : <Navigate to="/login" replace />;
};

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<DashboardLayout />}>
                <Route index element={<DashboardPage />} />
                <Route path="dashboard" element={<DashboardPage />} />
                <Route path="rfo" element={<RFOManagementPage />} />
                <Route path="clients" element={<ClientManagementPage />} />
                <Route path="team" element={<TeamManagementPage />} />
                <Route path="users" element={<UserManagementPage />} />
                <Route path="starlink" element={<StarlinkManagementPage />} />
                <Route path="profile" element={<ProfilePage />} />
              </Route>
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
