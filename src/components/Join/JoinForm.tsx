import { useState } from 'react';
import JoinField from './JoinField.tsx';
import {
  validateEmail,
  validatePassword,
  validatePasswordConfirm,
  validateNickname,
  validatePhoneNumber,
  handleValidation,
} from './validation';
import { JoinErrorMessages } from '../../types/JoinErrorMessages.ts';
import { formatPhoneNumber } from '../../utils/formatPhoneNumber.ts';

type Form = {
  email: string;
  emailConfirmCode: string;
  password: string;
  passwordConfirm: string;
  nickname: string;
  phoneNumber: string;
};

const JoinForm = () => {
  const [form, setForm] = useState<Form>({
    email: '',
    emailConfirmCode: '',
    password: '',
    passwordConfirm: '',
    nickname: '',
    phoneNumber: '',
  });

  const [errors, setErrors] = useState<JoinErrorMessages>({
    emailError: null,
    emailConfirmCodeError: null,
    passwordError: null,
    passwordConfirmError: null,
    nicknameError: null,
    phoneNumberError: null,
  });

  // TODO: 이메일 인증 실패, 중복값 검사(이메일, 닉네임, 전화 번호), 서버 통신 오류 에러 처리
  // const [joinError, setJoinError] = useState<string | null>(null);
  const [isInputDisabled, setIsInputDisabled] = useState(true);
  const [emailConfirmCodeStatus, setEmailConfirmCodeStatus] = useState<
    'success' | 'error' | null
  >(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm(prev => ({
      ...prev,
      [name]: name === 'phoneNumber' ? formatPhoneNumber(value) : value,
    }));
  };

  const clearErrors = () => {
    setErrors({
      emailError: null,
      emailConfirmCodeError: null,
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
      emailConfirmCodeError: null,
      passwordError: validatePassword(form.password),
      passwordConfirmError: validatePasswordConfirm(
        form.password,
        form.passwordConfirm
      ),
      nicknameError: validateNickname(form.nickname),
      phoneNumberError: validatePhoneNumber(form.phoneNumber),
    });
  };

  const handleEmailValidation = async () => {
    console.log('인증 코드 요청');
    // TODO: API 통신
    // test: 버튼 클릭 이벤트 하드 코딩
    const successResponse = { success: true };

    try {
      const data = successResponse;
      // TODO: "인증 코드 발송이 완료되었습니다." 화면에 출력 필요
      if (data.success) {
        setIsInputDisabled(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEmailConfirmCodeValidation = () => {
    // test
    const validCode = '1234';

    if (form.emailConfirmCode === validCode) {
      setEmailConfirmCodeStatus('success');
    } else {
      setEmailConfirmCodeStatus('error');
    }
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
          {/* TODO: 이메일 인증 코드 & 상태 보여주는 창 추가 */}
          <JoinField
            id="emailConfirmCode"
            name="emailConfirmCode"
            label="인증 코드"
            type="text"
            value={form.emailConfirmCode}
            onChange={e => {
              handleChange(e);
            }}
            onBlur={handleEmailConfirmCodeValidation}
            error={errors.emailConfirmCodeError}
            placeholder="인증 코드를 입력해주세요."
            required
            disabled={isInputDisabled}
            emailConfirmCodeStatus={emailConfirmCodeStatus}
          />
          <JoinField
            id="password"
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
            id="passwordConfirm"
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
            id="nickname"
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
            id="phoneNumber"
            name="phoneNumber"
            label="휴대폰 번호"
            type="tel"
            value={form.phoneNumber}
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
            <button
              type="submit"
              disabled={isDisabled}
              className={`btn btn-sm mt-5 font-bold text-sm ${
                isDisabled ? 'btn-disabled' : 'btn-primary'
              }`}
            >
              다음 단계로 넘어가기
            </button>
          </div>
        </form>

        <button
          type="button"
          // TODO:
          onClick={handleEmailValidation}
          className="mt-9 btn btn-sm btn-primary font-bold text-sm"
        >
          이메일 인증
        </button>
      </div>
    </div>
  );
};

export default JoinForm;
