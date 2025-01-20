import { NavLink } from 'react-router-dom';

const navItems = [
  { path: 'my-profile', label: '내 정보' },
  { path: 'my-meetings', label: '내 모임 관리' },
  { path: 'account-deletion', label: '회원 탈퇴' },
];

const Nav = () => {
  return (
    <div className="mx-4 border-b">
      <div className="mt-16 w-[680px] m-auto">
        <span className="block font-bold text-[20px] mb-6 cursor-default">
          마이페이지
        </span>
        <ul className="flex gap-6 mb-4">
          {navItems.map(({ path, label }, index) => (
            <li
              key={index}
              className="font-bold text-[16px] hover:-translate-y-[2px] duration-150 ease-linear"
            >
              <NavLink
                to={path}
                className={({ isActive }) =>
                  isActive
                    ? 'text-primary'
                    : 'text-gray-500 focus:text-primary hover:text-primary'
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Nav;
