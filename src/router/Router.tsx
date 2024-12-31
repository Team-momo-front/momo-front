import { Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import ListPage from '../pages/ListPage';
import JoinPage from '../pages/JoinPage';
import ResetPasswordPage from '../pages/ResetPasswordPage';
import CreatePostPage from '../pages/CreatePostPage';
import CreateProfilePage from '../pages/CreateProfilePage';
import MyPage from '../pages/MyPage';
import MyInfo from '../components/MyPage/MyInfo';
import ChangePassword from '../components/MyPage/ChangePassword';
import AccountDelection from '../components/MyPage/AccountDelection';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<ListPage />} />
      <Route path="/create" element={<CreatePostPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/join" element={<JoinPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/create-profile" element={<CreateProfilePage />} />
      <Route path="/mypage" element={<MyPage />}>
        <Route path="/mypage/my-info" element={<MyInfo />} />
        <Route path="/mypage/change-password" element={<ChangePassword />} />
        <Route
          path="/mypage/account-delection"
          element={<AccountDelection />}
        />
      </Route>
    </Routes>
  );
};

export default Router;
