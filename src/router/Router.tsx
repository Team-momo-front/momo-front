import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import ListPage from "../pages/ListPage";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<ListPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
};

export default Router;
