import { useState } from 'react';

import JoinField from './JoinField.tsx';

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
          <JoinField
            id="email"
            label="이메일"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={emailError}
            placeholder="이메일을 입력해주세요."
            required
          />
          <JoinField
            id="password"
            label="비밀번호"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={passwordError}
            placeholder="비밀번호를 입력해주세요."
            required
          />
          <JoinField
            id="passwordConfirm"
            label="비밀번호 확인"
            type="password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            error={passwordConfirmError}
            placeholder="비밀번호를 다시 한 번 입력해주세요."
            required
          />
          <JoinField
            id="nickname"
            label="닉네임"
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            error={nicknameError}
            placeholder="닉네임을 입력해주세요."
            required
          />
          <JoinField
            id="phoneNumber"
            label="휴대폰 번호"
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            error={phoneNumberError}
            placeholder="010-1234-5678"
            required
          />

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
