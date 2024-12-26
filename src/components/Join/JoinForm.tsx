import { useState } from 'react';
import Input from '../Input';
import {
  validateEmail,
  validatePassword,
  validatePasswordConfirm,
  validateNickname,
  validatePhoneNumber,
  handleValidation,
} from './validation';

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
  // TODO: 이메일 인증 실패, 중복값 검사(이메일, 닉네임, 전화 번호), 서버 통신 오류 에러 처리
  // const [joinError, setJoinError] = useState<string | null>(null);

  const handleJoinSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setEmailError(null);
    setPasswordError(null);
    setPasswordConfirmError(null);
    setNicknameError(null);
    setPhoneNumberError(null);

    const emailValidationError = validateEmail(email);
    const passwordValidationError = validatePassword(password);
    const passwordConfirmValidationError = validatePasswordConfirm(password, passwordConfirm);
    const nicknameValidationError = validateNickname(nickname);
    const phoneNumberValidationError = validatePhoneNumber(phoneNumber);

    setEmailError(emailValidationError);
    setPasswordError(passwordValidationError);
    setPasswordConfirmError(passwordConfirmValidationError);
    setNicknameError(nicknameValidationError);
    setPhoneNumberError(phoneNumberValidationError);

    // if (
    //   emailValidationError ||
    //   passwordValidationError ||
    //   passwordConfirmValidationError ||
    //   nicknameValidationError ||
    //   phoneNumberValidationError
    // ) {
    //   return;
    // }

    console.log('submit');

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
            onChange={(e) => {
              setEmail(e.target.value);
              handleValidation(e.target.value, validateEmail, setEmailError);
            }}
            // REVIEW: 유효성 검사에 대한 에러를 보여주는 이벤트를 onChange와 onBlur 중 어떤 걸로 처리할 지 고민
            // onBlur={(e) => handleValidation(e.target.value, validateEmail, setEmailError)}
            placeholder="이메일을 입력해주세요."
            required
            className={`mb-2 ${emailError && 'border-error border-2'}`}
          />
          <p className="w-[538px] mb-2 font-bold text-[12px] text-error">{emailError}</p>

          <label htmlFor="password" className="font-bold text-lg mt-[30px] mb-1">
            비밀번호
          </label>
          <Input
            id="password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              handleValidation(e.target.value, validatePassword, setPasswordError);
            }}
            placeholder="비밀번호를 입력해주세요."
            required
            className={`mb-2 ${passwordError && 'border-error border-2'}`}
          />
          <p className="w-[538px] mb-2 font-bold text-[12px] text-error">{passwordError}</p>

          <label htmlFor="passwordConfirm" className="font-bold text-lg mt-[30px] mb-1">
            비밀번호 확인
          </label>
          <Input
            id="passwordConfirm"
            type="password"
            name="passwordConfirm"
            value={passwordConfirm}
            onChange={(e) => {
              setPasswordConfirm(e.target.value);
              handleValidation(
                e.target.value,
                (value) => validatePasswordConfirm(password, value),
                setPasswordConfirmError
              );
            }}
            placeholder="비밀번호를 다시 한 번 입력해주세요."
            required
            className={`mb-2 ${passwordConfirmError && 'border-error border-2'}`}
          />
          <p className="w-[538px] mb-2 font-bold text-[12px] text-error">{passwordConfirmError}</p>

          <label htmlFor="nickname" className="font-bold text-lg mt-[30px] mb-1">
            닉네임
          </label>
          <Input
            id="nickname"
            type="text"
            name="nickname"
            value={nickname}
            onChange={(e) => {
              setNickname(e.target.value);
              handleValidation(e.target.value, validateNickname, setNicknameError);
            }}
            placeholder="닉네임을 입력해주세요."
            required
            className={`mb-2 ${nicknameError && 'border-error border-2'}`}
          />
          <p className="w-[538px] mb-2 font-bold text-[12px] text-error">{nicknameError}</p>

          <label htmlFor="phone-number" className="font-bold text-lg mt-[30px] mb-1">
            휴대폰 번호
          </label>
          <Input
            id="phone-number"
            type="tel"
            name="tel"
            value={phoneNumber}
            onChange={(e) => {
              setPhoneNumber(e.target.value);
              handleValidation(e.target.value, validatePhoneNumber, setPhoneNumberError);
            }}
            placeholder="010-1234-5678"
            required
            className={`mb-2 ${phoneNumberError && 'border-error border-2'}`}
          />
          <p className="w-[538px] mb-2 font-bold text-[12px] text-error">{phoneNumberError}</p>
          {/* {joinError && <p className="w-[538px] mb-2 font-bold text-[12px] text-error">{joinError}</p>} */}

          {email &&
            password &&
            passwordConfirm &&
            nickname &&
            phoneNumber &&
            !emailError &&
            !passwordError &&
            !passwordConfirmError &&
            !nicknameError &&
            !phoneNumberError && (
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
