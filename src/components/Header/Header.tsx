import { useMutation } from '@tanstack/react-query';
import { FaBell } from 'react-icons/fa6';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/svg/logo.svg';
import useMyProfile from '../../hooks/useMyProfile';
import useNotifications from '../../hooks/useNotifications';
import LoadingSpinner from '../LoadingSpinner';
import { AxiosError } from 'axios';
import ProfileRedirectModal from '../MyPage/ProfileRedirectModal';
import { logout } from '../../api/uesrs';

const Header = () => {
  const { data: userProfileData, error } = useMyProfile();
  const profileImageUrl = userProfileData?.profileImage;
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('accessToken');

  const handleNavigateMypage = () => {
    navigate('/mypage/my-profile');
  };

  const { mutate: handleLogout, isPending: isLogoutPending } = useMutation({
    mutationFn: logout,
    onSuccess: data => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('loginType');
      localStorage.removeItem('userId');

      navigate('/');
      alert(data.message);
    },
    onError: err => {
      alert(err.message);
      console.error('로그아웃 실패:', err);
    },
  });

  const { notifications, deleteNotification, deleteAllNotifications } =
    useNotifications(accessToken);

  const hasNotification = notifications.length > 0;

  if (isLogoutPending) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error && error instanceof AxiosError) {
    if (error.status === 403) {
      return <ProfileRedirectModal />;
    }
  }

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
            <ul className="menu dropdown-content absolute -right-10 bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
              {hasNotification ? (
                notifications.map(notification => (
                  <li key={notification.id} className="group">
                    <a className="text-xs group-hover:font-bold">
                      {notification.content}
                      <button
                        className="ml-auto hover:font-bold hover:text-primary"
                        onClick={() => deleteNotification(notification.id)}
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
                  onClick={() => deleteAllNotifications()}
                >
                  모두 지우기
                </button>
              </div>
            </ul>
          </div>

          <div className="dropdown dropdown-end dropdown-hover">
            <img
              src={profileImageUrl || '/image/default_profile_image.webp'}
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
              <li
                className="w-full items-center"
                onClick={() => handleLogout()}
              >
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
