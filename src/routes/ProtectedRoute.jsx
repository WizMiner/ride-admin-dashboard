//src/routes/ProtectedRoute.jsx
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContextDefinition';
import Spinner from '../components/ui/Spinner.jsx';

const ProtectedRoute = ({
  children,
  allowedRoles,
  requireSuperAdmin = false,
}) => {
  const { auth } = useContext(AuthContext);

  if (auth.loading) return <Spinner />;
  if (!auth.isAuthenticated) return <Navigate to="/login" replace />;

  if (requireSuperAdmin && !auth.isSuperAdmin)
    return <Navigate to="/" replace />;
  if (allowedRoles && !allowedRoles.includes(auth.role))
    return <Navigate to="/" replace />;

  return children;
};

export default ProtectedRoute;
