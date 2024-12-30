import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <div className="mx-4 border-b">
      <div className="mt-16 w-[680px] m-auto">
        <span className="block font-bold text-lg mb-6">마이페이지</span>
        <ul className="flex gap-6 mb-4">
          <li className="font-bold text-[16px] text-gray-500 hover:text-primary">
            <Link to="/mypage/my-info" className="focus:text-primary">
              내 정보
            </Link>
          </li>
          {/* TODO: 각각 라우터 생성하고 경로 설정 */}
          <li className="font-bold text-[16px] text-gray-500 hover:text-primary focus:text-primary">
            <Link to="/" className="focus:text-primary">
              내 모임 관리
            </Link>
          </li>
          <li className="font-bold text-[16px] text-gray-500 hover:text-primary focus:text-primary">
            <Link to="/" className="focus:text-primary">
              비밀번호 변경
            </Link>
          </li>
          <li className="font-bold text-[16px] text-gray-500 hover:text-primary focus:text-primary">
            <Link to="/" className="focus:text-primary">
              회원 탈퇴
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

// header와 76px 떨어져있음

export default Nav;
