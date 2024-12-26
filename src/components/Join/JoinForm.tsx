import Input from '../Input';

const JoinForm = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="max-w-[538px] flex gap-x-6">
        <form
          className="w-[320px]"
          // TODO: onSubmit={handleJoinSubmit}
        >
          <label htmlFor="email" className="font-bold text-lg mb-1">
            이메일
          </label>
          <Input id="email" type="email" name="email" placeholder="이메일을 입력해주세요." required />

          <label htmlFor="password" className="font-bold text-lg mt-[30px] mb-1">
            비밀번호
          </label>
          <Input id="password" type="password" name="password" placeholder="비밀번호를 입력해주세요." required />

          <label htmlFor="passwordConfirm" className="font-bold text-lg mt-[30px] mb-1">
            비밀번호 확인
          </label>
          <Input
            id="passwordConfirm"
            type="password"
            name="passwordConfirm"
            placeholder="비밀번호를 다시 한 번 입력해주세요."
            required
          />

          <label htmlFor="nickname" className="font-bold text-lg mt-[30px] mb-1">
            닉네임
          </label>
          <Input id="nickname" type="text" name="nickname" placeholder="닉네임을 입력해주세요." required />

          <label htmlFor="phonenumber" className="font-bold text-lg mt-[30px] mb-1">
            휴대폰 번호
          </label>
          <Input id="phonenumber" type="tel" name="tel" placeholder="010-1234-5678" required />

          <div className="w-full flex justify-center items-center">
            <button
              type="submit"
              className="w-[140px] h-[30px] mt-[30px] items-center bg-primary rounded-md font-bold text-white text-[13.5px]">
              다음 단계로 넘어가기
            </button>
          </div>
        </form>

        <button
          type="button"
          // TODO: onClick={handleEmailValidation}
          className="mt-10 w-[90px] h-[30px] items-center bg-primary rounded-md font-bold text-white text-[13.5px]">
          인증하기
        </button>
      </div>
    </div>
  );
};

export default JoinForm;
