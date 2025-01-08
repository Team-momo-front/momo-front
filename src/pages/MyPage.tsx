import { Outlet } from 'react-router-dom';
import Nav from '../components/MyPage/Nav';
import Header from '../components/Header/Header';
import ChatFloatingBtn from '../components/Chat/ChatFloatingBtn';

const MyPage = () => {
  return (
    <>
      <Header />
      <Nav />
      <Outlet />
      <ChatFloatingBtn />
    </>
  );
};

export default MyPage;
