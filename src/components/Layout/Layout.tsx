import { Outlet } from 'react-router-dom';
import ChatFloatingBtn from '../Chat/ChatFloatingBtn';
import Header from '../Header/Header';

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <ChatFloatingBtn />
    </>
  );
};

export default Layout;
