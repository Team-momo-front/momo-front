import { useState } from 'react';
import { Link } from 'react-router-dom';
import JoinField from './JoinField.tsx';
import {
  validateEmail,
  validatePassword,
  validatePasswordConfirm,
  validateNickname,
  validatePhoneNumber,
  handleValidation,
} from './validation';
import { JoinErrorMessages } from '../../types/Errors.ts';
import { formatPhoneNumber } from '../../utils/formatPhoneNumber.ts';
import axios, { AxiosError } from 'axios';

type Form = {
  email: string;
  // emailConfirmCode: string;
  password: string;
  passwordConfirm: string;
  nickname: string;
  phoneNumber: string;
};

const JoinForm = () => {
  const [form, setForm] = useState<Form>({
    email: '',
    // emailConfirmCode: '',
    password: '',
    passwordConfirm: '',
    nickname: '',
    phoneNumber: '',
  });

  const [errors, setErrors] = useState<JoinErrorMessages>({
    emailError: null,
    // emailConfirmCodeError: null,
    passwordError: null,
    passwordConfirmError: null,
    nicknameError: null,
    phoneNumberError: null,
  });

  // TODO: 이메일 인증 실패, 중복값 검사(이메일, 닉네임, 전화 번호), 서버 통신 오류 에러 처리
  // const [joinError, setJoinError] = useState<string | null>(null);
  // const [isInputDisabled, setIsInputDisabled] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm(prev => ({
      ...prev,
      [name]: name === 'phoneNumber' ? value.replace(/[^0-9]/g, '') : value,
    }));
  };

  const clearErrors = () => {
    setErrors({
      emailError: null,
      // emailConfirmCodeError: null,
      passwordError: null,
      passwordConfirmError: null,
      nicknameError: null,
      phoneNumberError: null,
    });
  };

  const setValidationErrors = () => {
    setErrors({
      emailError: validateEmail(form.email),
      // TODO: 인증 코드 유효성 검사 서버와 통신하여
      // validateEmailConfirmCode 구현 필요
      // emailConfirmCodeError: null,
      passwordError: validatePassword(form.password),
      passwordConfirmError: validatePasswordConfirm(
        form.password,
        form.passwordConfirm
      ),
      nicknameError: validateNickname(form.nickname),
      phoneNumberError: validatePhoneNumber(form.phoneNumber),
    });
  };

  const handleJoinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    clearErrors();
    setValidationErrors();

    // TODO: API 요청, joinSubmit logic
  };

  const isFormValid =
    form.email &&
    form.password &&
    form.passwordConfirm &&
    form.nickname &&
    form.phoneNumber;
  const isDisabled =
    !isFormValid || Object.values(errors).some(error => error !== null);

  const handleSignupRequest = async () => {
    try {
      const response = await axios.post(
        'http://54.180.112.35:8080/api/v1/users/signup',
        {
          email: form.email,
          password: form.password,
          nickname: form.nickname,
          phone: form.phoneNumber,
        }
      );

      console.log(response.data);
    } catch (err: unknown) {
      console.log(err);
      if (err instanceof AxiosError) {
        // 서버에서 응답한 오류 메시지 출력
        console.log('Error response:', err.response);
      } else {
        // 다른 오류 처리
        console.log('Error:', err);
      }
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="max-w-[538px] flex gap-x-6">
        <form
          className="w-[320px] flex flex-col gap-4"
          onSubmit={handleJoinSubmit}
        >
          <JoinField
            name="email"
            label="이메일"
            type="email"
            value={form.email}
            onChange={e => {
              handleChange(e);
            }}
            onBlur={e => {
              handleValidation(
                e.target.name,
                e.target.value,
                validateEmail,
                setErrors
              );
            }}
            error={errors.emailError}
            placeholder="이메일을 입력해주세요."
            required
          />

          <JoinField
            name="password"
            label="비밀번호"
            type="password"
            value={form.password}
            onChange={e => {
              handleChange(e);
            }}
            onBlur={e => {
              handleValidation(
                e.target.name,
                e.target.value,
                validatePassword,
                setErrors
              );
            }}
            error={errors.passwordError}
            placeholder="비밀번호를 입력해주세요."
            required
          />
          <JoinField
            name="passwordConfirm"
            label="비밀번호 확인"
            type="password"
            value={form.passwordConfirm}
            onChange={e => {
              handleChange(e);
            }}
            onBlur={e => {
              handleValidation(
                e.target.name,
                e.target.value,
                value => validatePasswordConfirm(form.password, value),
                setErrors
              );
            }}
            error={errors.passwordConfirmError}
            placeholder="비밀번호를 다시 한 번 입력해주세요."
            required
          />
          <JoinField
            name="nickname"
            label="닉네임"
            type="text"
            value={form.nickname}
            onChange={e => {
              handleChange(e);
            }}
            onBlur={e => {
              handleValidation(
                e.target.name,
                e.target.value,
                validateNickname,
                setErrors
              );
            }}
            error={errors.nicknameError}
            placeholder="닉네임을 입력해주세요."
            required
          />
          <JoinField
            name="phoneNumber"
            label="휴대폰 번호"
            type="tel"
            value={formatPhoneNumber(form.phoneNumber)}
            onChange={e => {
              handleChange(e);
            }}
            onBlur={e => {
              handleValidation(
                e.target.name,
                e.target.value,
                validatePhoneNumber,
                setErrors
              );
            }}
            error={errors.phoneNumberError}
            placeholder="휴대폰 번호를 입력해주세요."
            required
          />
          {/* {joinError && <p className="w-[538px] mb-2 font-bold text-[12px] text-error">{joinError}</p>} */}

          <div className="w-full flex justify-center items-center">
            <Link to="/verify-email-code">
              <button
                type="submit"
                disabled={isDisabled}
                className={`btn mt-5 font-bold text-sm ${
                  isDisabled ? 'btn-disabled' : 'btn-primary'
                }`}
                onClick={handleSignupRequest}
              >
                다음 단계로 넘어가기
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JoinForm;
