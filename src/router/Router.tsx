import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import ListPage from "../pages/ListPage";
import JoinPage from "../pages/JoinPage";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<ListPage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* 회원가입 페이지 */}
      <Route path="/join" element={<JoinPage />} />
    </Routes>
  );
};

export default Router;
