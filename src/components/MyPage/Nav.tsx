import { NavLink } from 'react-router-dom';

const Nav = () => {
  return (
    <div className="mx-4 border-b">
      <div className="mt-16 w-[680px] m-auto">
        <span className="block font-bold text-[20px] mb-6 cursor-default">
          마이페이지
        </span>
        <ul className="flex gap-6 mb-4">
          <li className="font-bold text-[16px] hover:text-primary">
            <NavLink
              to="/mypage/my-info"
              className={({ isActive }) =>
                isActive ? 'text-primary' : 'text-gray-500 focus:text-primary'
              }
            >
              내 정보
            </NavLink>
          </li>
          {/* TODO: 각각 라우터 생성하고 경로 설정 */}
          <li className="font-bold text-[16px] hover:text-primary">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? 'text-primary' : 'text-gray-500 focus:text-primary'
              }
            >
              내 모임 관리
            </NavLink>
          </li>
          <li className="font-bold text-[16px] hover:text-primary">
            <NavLink
              to="/mypage/change-password"
              className={({ isActive }) =>
                isActive ? 'text-primary' : 'text-gray-500 focus:text-primary'
              }
            >
              비밀번호 변경
            </NavLink>
          </li>
          <li className="font-bold text-[16px] hover:text-primary">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? 'text-primary' : 'text-gray-500 focus:text-primary'
              }
            >
              회원 탈퇴
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Nav;
