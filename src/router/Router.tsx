import { Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import ListPage from '../pages/ListPage';
import JoinPage from '../pages/JoinPage';
import ResetPasswordPage from '../pages/ResetPasswordPage';
import CreatePostPage from '../pages/CreatePostPage';
import CreateProfilePage from '../pages/CreateProfilePage';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<ListPage />} />
      <Route path="/create" element={<CreatePostPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/join" element={<JoinPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/create-profile" element={<CreateProfilePage />} />
    </Routes>
  );
};

export default Router;
