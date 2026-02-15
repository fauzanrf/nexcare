import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './features/auth/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import LoginPage from './features/auth/LoginPage';
import DashboardLayout from './layouts/DashboardLayout';

import DashboardPage from './features/dashboard/DashboardPage';
import RFOManagementPage from './features/rfo/RFOManagementPage';
import StarlinkManagementPage from './features/starlink/StarlinkManagementPage';
import ClientManagementPage from './features/clients/ClientManagementPage';
import TeamManagementPage from './features/team/TeamManagementPage';

// Protected Route Wrapper
const ProtectedRoute = () => {
  const { session, isLoading } = useAuth();

  if (isLoading) return <div className="h-screen flex items-center justify-center dark:bg-gray-900 dark:text-white">Loading...</div>;
  
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
                <Route path="starlink" element={<StarlinkManagementPage />} />
                <Route path="clients" element={<ClientManagementPage />} />
                <Route path="team" element={<TeamManagementPage />} />
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
