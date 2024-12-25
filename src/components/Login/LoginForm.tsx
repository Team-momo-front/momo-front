import kakaoIcon from '../../assets/svg/kakaoIcon.svg';

const LoginForm = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <form className="w-[320px] h-[340px] flex flex-col items-center">
        <span className="font-bold text-2xl mb-6">로그인</span>
        <input
          type="email"
          name="email"
          placeholder="이메일을 입력해주세요."
          required
          className="w-full h-[50px] mb-4 p-4 shadow-[0_4px_4px_1px_rgba(0,0,0,0.25)] rounded-[6px] font-bold text-sm placeholder-gray-500 outline-none"
        />
        <input
          type="password"
          name="password"
          placeholder="비밀번호를 입력해주세요."
          required
          className="w-full h-[50px] mb-4 p-4 shadow-[0_4px_4px_1px_rgba(0,0,0,0.25)] rounded-[6px] font-bold text-sm placeholder-gray-500 outline-none"
        />
        <button
          type="submit"
          // onSubmit={handleLoginSubmit}
          className="w-full h-12 mb-4 items-center bg-primary rounded-[6px] font-bold text-white ">
          로그인
        </button>
        <button
          type="button"
          className="relative w-full h-12 mb-4 items-center bg-[#fee501] rounded-[6px] font-bold text-black">
          <img src={kakaoIcon} alt="카카오로 시작하기" className="absolute top-[14px] left-4 w-5" />
          카카오로 시작하기
        </button>
        <div className="w-full flex justify-end">
          {/* Link to 비밀번호 재설정 page */}
          <span className="font-nanumGothic text-[16px]">비밀번호를 잊으셨나요?</span>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
