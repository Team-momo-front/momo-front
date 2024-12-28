import kakaoIcon from '../../assets/svg/kakaoIcon.svg';
import Input from '../Input';

const LoginForm = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <form className="w-[320px] h-[340px] flex flex-col items-center">
        <span className="font-bold text-2xl mb-6">로그인</span>

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
          className="btn btn-block mb-4 font-bold text-lg btn-primary"
        >
          로그인
        </button>
        <button
          type="button"
          className="relative btn btn-block mb-4 rounded-md font-bold text-lg btn-social"
        >
          <img
            src={kakaoIcon}
            alt="카카오로 시작하기"
            className="absolute top-[14px] left-4 w-5"
          />
          카카오로 시작하기
        </button>

        <div className="w-full flex justify-end">
          {/* TODO: Link to 비밀번호 재설정 page */}
          <span className="font-bold text-[16px] cursor-pointer">
            비밀번호를 잊으셨나요?
          </span>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
