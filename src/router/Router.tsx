import { Route, Routes } from 'react-router-dom';
import AccountDeletion from '../components/MyPage/AccountDeletion';
import ChangePassword from '../components/MyPage/ChangePassword';
import MyInfo from '../components/MyPage/MyInfo';
import CreatePostPage from '../pages/CreatePostPage';
import CreateProfilePage from '../pages/CreateProfilePage';
import PostDetailPage from '../pages/DetailPage';
import JoinPage from '../pages/JoinPage';
import ListPage from '../pages/ListPage';
import LoginPage from '../pages/LoginPage';
import MyPage from '../pages/MyPage';
import ResetPasswordPage from '../pages/ResetPasswordPage';
import MyMeetings from '../components/MyPage/MyMeetings';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<ListPage />} />
      <Route path="/post/:id" element={<PostDetailPage />} />
      <Route path="/create" element={<CreatePostPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/join" element={<JoinPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/create-profile" element={<CreateProfilePage />} />
      <Route path="/mypage" element={<MyPage />}>
        <Route path="my-info" element={<MyInfo />} />
        <Route path="my-meetings" element={<MyMeetings />} />
        <Route path="change-password" element={<ChangePassword />} />
        <Route path="account-deletion" element={<AccountDeletion />} />
      </Route>
    </Routes>
  );
};

export default Router;
