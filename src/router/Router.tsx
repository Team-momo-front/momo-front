import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, Routes } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import AccountDeletion from '../components/MyPage/AccountDeletion';
import MyMeetings from '../components/MyPage/MyMeetings';
import MyProfile from '../components/MyPage/MyProfile';
import CreatePostPage from '../pages/CreatePostPage';
import CreateProfilePage from '../pages/CreateProfilePage';
import PostDetailPage from '../pages/DetailPage';
import JoinPage from '../pages/JoinPage';
import ListPage from '../pages/ListPage';
import LoginPage from '../pages/LoginPage';
import MyPage from '../pages/MyPage';
import ResetPasswordPage from '../pages/ResetPasswordPage';
import UserProfilePage from '../pages/UserProfilePage';
import ViewParticipantPage from '../pages/ViewParticipantPage';
import RedirectResetPassword from '../components/Join/RedirectResetPassword';

const queryClient = new QueryClient();
import VerifyEmailCode from '../components/Join/VerifyEmailCode';
import KakaoLogin from '../components/Login/KakaoLogin';
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute';

const Router = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route element={<Layout />}>
          {/* 메인페이지 - 모집글 리스트 */}
          <Route path="/" element={<ListPage />} />
          <Route path="/post/:id" element={<PostDetailPage />} />
          <Route
            path="/create"
            element={
              <ProtectedRoute>
                <CreatePostPage />
              </ProtectedRoute>
            }
          />
          {/* 로그인 & 회원가입 */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/join" element={<JoinPage />} />
          <Route path="/verify-email-code" element={<VerifyEmailCode />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route
            path="/reset-password/callback"
            element={<RedirectResetPassword />}
          />
          <Route path="/kakao/callback" element={<KakaoLogin />} />
          {/* 프로필 생성 */}
          <Route
            path="/create-profile"
            element={
              <ProtectedRoute>
                <CreateProfilePage />
              </ProtectedRoute>
            }
          />
          {/* 마이페이지 */}
          <Route
            path="/mypage"
            element={
              <ProtectedRoute>
                <MyPage />
              </ProtectedRoute>
            }
          >
            <Route path="my-profile" element={<MyProfile />} />
            <Route path="my-meetings" element={<MyMeetings />} />
            <Route path="account-deletion" element={<AccountDeletion />} />
          </Route>
          {/* 주최한 모임 -> 신청자 보기 페이지 */}
          <Route
            path="/view-applicant/:id"
            element={
              <ProtectedRoute>
                <ViewParticipantPage />
              </ProtectedRoute>
            }
          />

          {/* 주최한 모임 -> 신청자 보기 페이지 -> 신청자 프로필 보기 */}

          <Route
            path="/view-applicant/profile/:userId/:roomId"
            element={
              <ProtectedRoute>
                <UserProfilePage />
              </ProtectedRoute>
            }
          />
        </Route>
        {/* 채팅 유저 프로필 보기 */}

        <Route
          path="/chat/profile/:roomId/:userId"
          element={
            <ProtectedRoute>
              <UserProfilePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </QueryClientProvider>
  );
};

export default Router;
