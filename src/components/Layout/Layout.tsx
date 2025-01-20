import { Outlet } from 'react-router-dom';
import ChatFloatingBtn from '../Chat/ChatFloatingBtn';
import Header from '../Header/Header';

const Layout = () => {
  const token = localStorage.getItem('accessToken');

  return (
    <>
      <Header />
      <Outlet />
      {token && <ChatFloatingBtn />}
    </>
  );
};

export default Layout;
