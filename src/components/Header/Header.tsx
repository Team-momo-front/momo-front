import { useState } from 'react';
import { FaBell } from 'react-icons/fa6';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/svg/logo.svg';
import { notifications } from '../../mocks/notifications';
import { Notification } from '../../types/Notification';
import axios from 'axios';

const Header = () => {
  const navigate = useNavigate();
  const userLoginType = localStorage.getItem('loginUserType');
  const accessToken = localStorage.getItem('accessToken');

  const handleNavigateMypage = () => {
    navigate('/mypage/my-info');
  };

  const handleLogout = async () => {
    try {
      if (userLoginType === 'emailUser') {
        const response = await axios.delete('/api/v1/users/logout', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log(response.data);
        alert(response.data.message);

        localStorage.removeItem('accessToken');
        localStorage.removeItem('loginUserType');

        navigate('/');
      } else if (userLoginType === 'kakaoUser') {
        const response = await axios.delete('/api/v1/kakao/logout', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log(response.data);
        alert(response.data.message);

        localStorage.removeItem('accessToken');
        localStorage.removeItem('loginUserType');

        navigate('/');
      }
    } catch (err) {
      console.error('로그아웃 실패:', err);
    }
  };

  // TODO : 서버데이터 사용
  const [data, setData] = useState<Notification[] | []>(notifications);

  const handleDelete = (id: number) => {
    // TODO : 서버호출
    setData(prev => prev.filter(notification => notification.id !== id));
  };
  const handleDeleteAll = () => {
    // TODO : 서버호출
    setData([]);
  };

  const hasNotification = data.length > 0;

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

      {accessToken ? (
        <div className="flex justify-end items-center gap-5 mr-6">
          <div
            tabIndex={0}
            className="relative dropdown dropdown-hover dropdown-end"
          >
            <FaBell className="w-6 h-6 fill-primary cursor-pointer" />
            {hasNotification && (
              <div className="w-1.5 h-1.5 bg-red-500 rounded-full absolute top-0 right-0" />
            )}
            <div className="relative menu dropdown-content">
              <ul className="absolute -right-10 bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                {hasNotification ? (
                  data.map(notification => (
                    <li className="group">
                      <a className="text-xs group-hover:font-bold">
                        {notification.content}
                        <button
                          className="ml-auto hover:font-bold hover:text-primary"
                          onClick={() => handleDelete(notification.id)}
                        >
                          ✕
                        </button>
                      </a>
                    </li>
                  ))
                ) : (
                  <div className="text-xs m-2">알림이 없습니다</div>
                )}
                <div className="flex justify-end m-2">
                  <button
                    className="hover:font-bold text-xs"
                    onClick={handleDeleteAll}
                  >
                    모두 지우기
                  </button>
                </div>
              </ul>
            </div>
          </div>
          <div className="dropdown dropdown-end dropdown-hover">
            <img
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
