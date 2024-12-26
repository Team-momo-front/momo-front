import { useState } from 'react';
import Input from '../Input';

const JoinForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [nickname, setNickname] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordConfirmError, setPasswordConfirmError] = useState<string | null>(null);
  const [nicknameError, setNicknameError] = useState<string | null>(null);
  const [phoneNumberError, setPhoneNumberError] = useState<string | null>(null);

  const handleJoinSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setEmailError(null);
    setPasswordError(null);
    setPasswordConfirmError(null);
    setNicknameError(null);
    setPhoneNumberError(null);

    // TODO: validation code here
    // TODO: API 요청, joinSubmit logic
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="max-w-[538px] flex gap-x-6">
        <form className="w-[320px]" onSubmit={handleJoinSubmit}>
          <label htmlFor="email" className="font-bold text-lg mb-1">
            이메일
          </label>
          <Input
            id="email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일을 입력해주세요."
            required
            className={`mb-2 ${emailError && 'border-error border-2'}`}
          />
          <p className="mb-2 font-bold text-[12px] text-error">{emailError}</p>

          <label htmlFor="password" className="font-bold text-lg mt-[30px] mb-1">
            비밀번호
          </label>
          <Input
            id="password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력해주세요."
            required
            className={`mb-2 ${passwordError && 'border-error border-2'}`}
          />
          <p className="mb-2 font-bold text-[12px] text-error">{passwordError}</p>

          <label htmlFor="passwordConfirm" className="font-bold text-lg mt-[30px] mb-1">
            비밀번호 확인
          </label>
          <Input
            id="passwordConfirm"
            type="password"
            name="passwordConfirm"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            placeholder="비밀번호를 다시 한 번 입력해주세요."
            required
            className={`mb-2 ${passwordConfirmError && 'border-error border-2'}`}
          />
          <p className="mb-2 font-bold text-[12px] text-error">{passwordConfirmError}</p>

          <label htmlFor="nickname" className="font-bold text-lg mt-[30px] mb-1">
            닉네임
          </label>
          <Input
            id="nickname"
            type="text"
            name="nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="닉네임을 입력해주세요."
            required
            className={`mb-2 ${nicknameError && 'border-error border-2'}`}
          />
          <p className="mb-2 font-bold text-[12px] text-error">{nicknameError}</p>

          <label htmlFor="phone-number" className="font-bold text-lg mt-[30px] mb-1">
            휴대폰 번호
          </label>
          <Input
            id="phone-number"
            type="tel"
            name="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="010-1234-5678"
            required
            className={`mb-2 ${phoneNumberError && 'border-error border-2'}`}
          />
          <p className="mb-2 font-bold text-[12px] text-error">{phoneNumberError}</p>

          {!emailError && !passwordError && !passwordConfirmError && !nicknameError && !phoneNumberError && (
            <div className="w-full flex justify-center items-center">
              <button
                type="submit"
                className="w-[140px] h-[30px] mt-[30px] items-center bg-primary rounded-md font-bold text-white text-[13.5px]">
                다음 단계로 넘어가기
              </button>
            </div>
          )}
        </form>

        <button
          type="button"
          // TODO: onClick={handleEmailValidation}
          className="mt-10 w-[90px] h-[30px] items-center bg-primary rounded-md font-bold text-white text-[13.5px]">
          이메일 인증
        </button>
      </div>
    </div>
  );
};

export default JoinForm;
