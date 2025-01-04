import logo from '../../assets/svg/logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import { FaBell } from 'react-icons/fa6';
import { useState } from 'react';

const Header = () => {
  // TODO: API 연결 후 전역 상태관리
  const [isLogined, setIsLogined] = useState(true);

  const navigate = useNavigate();

  const handleNavigateMypage = () => {
    navigate('/mypage/my-info');
  };

  const handleLogout = () => {
    setIsLogined(false);
    navigate('/');
  };

  return (
    <div className="w-full h-[62px] border-b-[1px] border-gray-100 grid grid-cols-3 items-center">
      <div />
      <div className="flex justify-center items-center gap-2">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="logo" className="w-16" />
          <span className="font-inter font-bold text-xl text-gray-600">
            momo
          </span>
        </Link>
      </div>

      {isLogined ? (
        <div className="flex justify-end items-center gap-5 mr-6">
          <FaBell className="scale-150 fill-primary cursor-pointer" />
          <div className="dropdown dropdown-end dropdown-hover">
            <img
              tabIndex={0}
              src="/image/default_profile_image.webp"
              alt="profile image"
              className="w-[30px] h-[30px] object-cover p-[1px] border border-gray-600 rounded-full cursor-pointer"
            />
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-[1] w-[120px] p-2 shadow"
            >
              <li
                className="w-full items-center"
                onClick={handleNavigateMypage}
              >
                <a className="text-sm hover:font-bold">마이페이지</a>
              </li>
              <li className="w-full items-center" onClick={handleLogout}>
                <a className="text-sm hover:font-bold flex justify-center w-full">
                  로그아웃
                </a>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="flex justify-end gap-3 mr-4">
          <Link to="/login">
            <button className="btn btn-sm font-inter font-medium btn-second">
              Login
            </button>
          </Link>
          <Link to="/join">
            <button className="btn btn-sm font-inter font-medium btn-second">
              Join
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
