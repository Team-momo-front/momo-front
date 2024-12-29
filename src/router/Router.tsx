import { Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import ListPage from '../pages/ListPage';
import JoinPage from '../pages/JoinPage';
import ResetPasswordPage from '../pages/ResetPasswordPage';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<ListPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/join" element={<JoinPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
    </Routes>
  );
};

export default Router;
