import { Outlet, useLocation } from 'react-router-dom';
import ChatFloatingBtn from '../Chat/ChatFloatingBtn';
import Header from '../Header/Header';
import { useEffect, useState } from 'react';

const Layout = () => {
  const location = useLocation();
  const [renderChatBtn, setRenderChatBtn] = useState(false);

  // 채팅버튼이 보이면 안되는 주소
  useEffect(() => {
    if (
      location.pathname === '/login' ||
      location.pathname === '/join' ||
      location.pathname === '/create-profile' ||
      location.pathname === '/verify-email-code' ||
      location.pathname === '/reset-password' ||
      location.pathname === '/reset-password/callback' ||
      location.pathname === '/kakao/callback'
    ) {
      setRenderChatBtn(false);
    } else {
      setRenderChatBtn(true);
    }
  }, [location]);

  return (
    <>
      <Header />
      <Outlet />
      {renderChatBtn && <ChatFloatingBtn />}
    </>
  );
};

export default Layout;
