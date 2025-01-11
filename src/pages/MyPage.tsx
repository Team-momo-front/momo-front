import { Outlet } from 'react-router-dom';
import Nav from '../components/MyPage/Nav';

const MyPage = () => {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
};

export default MyPage;
