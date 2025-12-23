import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ allowedRoles }) => {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (!allowedRoles.includes(user.role)) {
        // Redirect to their own dashboard if authorized but wrong role, or home
        if (user.role === 'admin') return <Navigate to="/admin/dashboard" replace />;
        if (user.role === 'trainer') return <Navigate to="/trainer/dashboard" replace />;
        if (user.role === 'member') return <Navigate to="/member/dashboard" replace />;
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
