import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const token = localStorage.getItem('accessToken');

  if (!token) {
    alert('로그인 후 이용해주세요.');
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
