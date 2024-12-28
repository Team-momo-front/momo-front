import { Route, Routes } from 'react-router-dom';
import CreatePostPage from '../pages/CreatePostPage';
import JoinPage from '../pages/JoinPage';
import ListPage from '../pages/ListPage';
import LoginPage from '../pages/LoginPage';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<ListPage />} />
      <Route path="/create" element={<CreatePostPage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* 회원가입 페이지 */}
      <Route path="/join" element={<JoinPage />} />
    </Routes>
  );
};

export default Router;
