import { Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';

const Router = () => {
  return (
    <Routes>
      {/* 메인 페이지 - 모집글 조회 페이지 */}
      {/* <Route path="/" element={} /> */}

      {/* 로그인 페이지 */}
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
};

export default Router;
