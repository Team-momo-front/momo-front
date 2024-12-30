import { Outlet } from 'react-router-dom';
import Nav from '../components/MyPage/Nav';
import Header from '../components/Header/Header';

const MyPage = () => {
  return (
    <>
      <Header />
      <Nav />
      <div className="w-fit">
        <Outlet />
      </div>
    </>
  );
};

export default MyPage;
