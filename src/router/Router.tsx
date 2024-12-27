import { Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import JoinPage from '../pages/JoinPage';

const Router = () => {
  return (
    <Routes>
      {/* TODO: 메인 페이지 - 모집글 조회 페이지 추가하기 */}
      {/* <Route path="/" element={} /> */}

      {/* 로그인 페이지 */}
      <Route path="/login" element={<LoginPage />} />

      {/* 회원가입 페이지 */}
      <Route path="/join" element={<JoinPage />} />
    </Routes>
  );
};

export default Router;
