import { Link } from 'react-router-dom';
import kakaoIcon from '../../assets/svg/kakaoIcon.svg';
import Input from '../Input';

const LoginForm = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <form className="w-[320px] h-[340px] flex flex-col items-center gap-4">
        <span className="font-bold text-2xl">로그인</span>

        <Input
          type="email"
          name="email"
          placeholder="이메일을 입력해주세요."
          required
        />
        <Input
          type="password"
          name="password"
          placeholder="비밀번호를 입력해주세요."
          required
        />

        <button
          type="submit"
          // TODO: onSubmit={handleLoginSubmit}
          className="btn btn-block font-bold text-[16px] btn-primary"
        >
          로그인
        </button>
        <button
          type="button"
          className="relative btn btn-block font-bold text-[16px] btn-social"
        >
          <img
            src={kakaoIcon}
            alt="카카오로 시작하기"
            className="absolute top-[14px] left-4 w-5"
          />
          카카오로 시작하기
        </button>

        <div className="w-full flex justify-end">
          <Link to="/reset-password">
            <span className="font-bold text-sm cursor-pointer">
              비밀번호를 잊으셨나요?
            </span>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
