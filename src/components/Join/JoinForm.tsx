import { useState } from 'react';
import JoinField from './JoinField.tsx';

type Form = {
  email: string;
  password: string;
  passwordConfirm: string;
  nickname: string;
  phoneNumber: string;
};

type ErrorMessages = {
  emailError: string | null;
  passwordError: string | null;
  passwordConfirmError: string | null;
  nicknameError: string | null;
  phoneNumberError: string | null;
};

const JoinForm = () => {
  const [form, setForm] = useState<Form>({
    email: '',
    password: '',
    passwordConfirm: '',
    nickname: '',
    phoneNumber: '',
  });

  const [errors, setErrors] = useState<ErrorMessages>({
    emailError: null,
    passwordError: null,
    passwordConfirmError: null,
    nicknameError: null,
    phoneNumberError: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleJoinSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setErrors({
      emailError: null,
      passwordError: null,
      passwordConfirmError: null,
      nicknameError: null,
      phoneNumberError: null,
    });

    // TODO: validation code here
    // TODO: API 요청, joinSubmit logic
  };

  const isFormValid = form.email && form.password && form.passwordConfirm && form.nickname && form.phoneNumber;
  const isDisabled = !isFormValid || Object.values(errors).some((error) => error !== null);

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="max-w-[538px] flex gap-x-6">
        <form className="w-[320px]" onSubmit={handleJoinSubmit}>
          <JoinField
            id="email"
            name="email"
            label="이메일"
            type="email"
            value={form.email}
            onChange={handleChange}
            error={errors.emailError}
            placeholder="이메일을 입력해주세요."
            required
          />
          <JoinField
            id="password"
            name="password"
            label="비밀번호"
            type="password"
            value={form.password}
            onChange={handleChange}
            error={errors.passwordError}
            placeholder="비밀번호를 입력해주세요."
            required
          />
          <JoinField
            id="passwordConfirm"
            name="passwordConfirm"
            label="비밀번호 확인"
            type="password"
            value={form.passwordConfirm}
            onChange={handleChange}
            error={errors.passwordConfirmError}
            placeholder="비밀번호를 다시 한 번 입력해주세요."
            required
          />
          <JoinField
            id="nickname"
            name="nickname"
            label="닉네임"
            type="text"
            value={form.nickname}
            onChange={handleChange}
            error={errors.nicknameError}
            placeholder="닉네임을 입력해주세요."
            required
          />
          <JoinField
            id="phoneNumber"
            name="phoneNumber"
            label="휴대폰 번호"
            type="tel"
            value={form.phoneNumber}
            onChange={handleChange}
            error={errors.phoneNumberError}
            placeholder="010-1234-5678"
            required
          />

          <div className="w-full flex justify-center items-center">
            <button
              type="submit"
              disabled={isDisabled}
              className={`w-[140px] h-[30px] mt-[30px] items-center rounded-md font-bold text-[13.5px] ${
                isDisabled ? 'bg-gray-400 text-gray-600' : 'bg-primary text-white'
              }`}>
              다음 단계로 넘어가기
            </button>
          </div>
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
