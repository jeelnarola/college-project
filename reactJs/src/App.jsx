import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import AdminDashboard from './pages/admin/AdminDashboard';
import TrainerDashboard from './pages/trainer/TrainerDashboard';
import MemberDashboard from './pages/member/MemberDashboard';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import MainLayout from './layouts/MainLayout';

function App() {
  const currentTheme = useSelector((state) => state.theme.currentTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme);
  }, [currentTheme]);

  return (
    <Router>
      <AuthProvider>
        <div className="app-container font-sans text-base-content">
          <Routes>
            <Route path="/login" element={<Login />} />

            {/* Redirect root to login for now */}
            <Route path="/" element={<Navigate to="/login" replace />} />

            {/* Application Routes wrapped in MainLayout */}
            <Route element={<MainLayout />}>
              {/* Admin Routes */}
              <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
              </Route>

              {/* Trainer Routes */}
              <Route element={<ProtectedRoute allowedRoles={['trainer']} />}>
                <Route path="/trainer/dashboard" element={<TrainerDashboard />} />
              </Route>

              {/* Member Routes */}
              <Route element={<ProtectedRoute allowedRoles={['member']} />}>
                <Route path="/member/dashboard" element={<MemberDashboard />} />
              </Route>
            </Route>

            {/* Catch all - Redirect to login */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
