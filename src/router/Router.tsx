import { Route, Routes } from 'react-router-dom';
import AccountDeletion from '../components/MyPage/AccountDeletion';
import ChangePassword from '../components/MyPage/ChangePassword';
import MyInfo from '../components/MyPage/MyProfile';
import CreatePostPage from '../pages/CreatePostPage';
import CreateProfilePage from '../pages/CreateProfilePage';
import PostDetailPage from '../pages/DetailPage';
import JoinPage from '../pages/JoinPage';
import ListPage from '../pages/ListPage';
import LoginPage from '../pages/LoginPage';
import MyPage from '../pages/MyPage';
import ResetPasswordPage from '../pages/ResetPasswordPage';
import MyMeetings from '../components/MyPage/MyMeetings';
import ViewParticipantPage from '../pages/ViewParticipantPage';
import UserProfilePage from '../pages/UserProfilePage';
import Layout from '../components/Layout/Layout';
import VerifyEmailCode from '../components/Join/VerifyEmailCode';
import KakaoLogin from '../components/Login/KakaoLogin';

const Router = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* 메인페이지 - 모집글 리스트 */}
        <Route path="/" element={<ListPage />} />
        <Route path="/post/:id" element={<PostDetailPage />} />
        <Route path="/create" element={<CreatePostPage />} />
        {/* 로그인 & 회원가입 */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/join" element={<JoinPage />} />
        <Route path="/verify-email-code" element={<VerifyEmailCode />} />
        <Route path="/create-profile" element={<CreateProfilePage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/kakao/callback" element={<KakaoLogin />} />
        {/* 마이페이지 */}
        <Route path="/mypage" element={<MyPage />}>
          <Route path="my-info" element={<MyInfo />} />
          <Route path="my-meetings" element={<MyMeetings />} />
          <Route path="change-password" element={<ChangePassword />} />
          <Route path="account-deletion" element={<AccountDeletion />} />
        </Route>
        {/* 주최한 모임 -> 신청자 보기 페이지 */}
        <Route path="/view-applicant/:id" element={<ViewParticipantPage />} />
        {/* 주최한 모임 -> 신청자 보기 페이지 -> 신청자 프로필 보기 */}
        <Route
          path="/view-applicant/profile/:userId"
          element={<UserProfilePage />}
        />
      </Route>
      {/* 채팅 유저 프로필 보기 */}
      <Route
        path="/chat/profile/:roomId/:userId"
        element={<UserProfilePage />}
      />
    </Routes>
  );
};

export default Router;
