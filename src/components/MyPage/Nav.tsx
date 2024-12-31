import { NavLink } from 'react-router-dom';

const navItems = [
  { path: '/mypage/my-info', title: '내 정보' },
  { path: '/', title: '내 모임 관리' },
  { path: '/', title: '비밀번호 변경' },
  { path: '/', title: '회원 탈퇴' },
];

const Nav = () => {
  return (
    <div className="mx-4 border-b">
      <div className="mt-16 w-[680px] m-auto">
        <span className="block font-bold text-[20px] mb-6 cursor-default">
          마이페이지
        </span>
        <ul className="flex gap-6 mb-4">
          {navItems.map(({ path, title }) => (
            <li className="font-bold text-[16px] hover:text-primary">
              <NavLink
                to={path}
                className={({ isActive }) =>
                  isActive ? 'text-primary' : 'text-gray-500 focus:text-primary'
                }
              >
                {title}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Nav;
