import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
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
import axiosInstance from '../../api/axiosInstance.ts';
import { useMutation } from '@tanstack/react-query';

type Form = {
  email: string;
  password: string;
  passwordConfirm: string;
  nickname: string;
  phoneNumber: string;
};

const JoinForm = () => {
  const [form, setForm] = useState<Form>({
    email: '',
    password: '',
    passwordConfirm: '',
    nickname: '',
    phoneNumber: '',
  });

  const [errors, setErrors] = useState<JoinErrorMessages>({
    emailError: null,
    passwordError: null,
    passwordConfirmError: null,
    nicknameError: null,
    phoneNumberError: null,
  });

  const [joinError, setJoinError] = useState<string | null>(null);

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
      passwordError: null,
      passwordConfirmError: null,
      nicknameError: null,
      phoneNumberError: null,
    });
  };

  const setValidationErrors = () => {
    setErrors({
      emailError: validateEmail(form.email),
      passwordError: validatePassword(form.password),
      passwordConfirmError: validatePasswordConfirm(
        form.password,
        form.passwordConfirm
      ),
      nicknameError: validateNickname(form.nickname),
      phoneNumberError: validatePhoneNumber(form.phoneNumber),
    });
  };

  const joinUser = async () => {
    const response = await axiosInstance.post('/api/v1/users/signup', {
      email: form.email,
      password: form.password,
      nickname: form.nickname,
      phone: form.phoneNumber.replace(/[^0-9]/g, ''),
    });
    return response.data;
  };

  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: joinUser,
    onSuccess: data => {
      alert(data);
      navigate('/verify-email-code');
    },
    onError: err => {
      if (err instanceof AxiosError) {
        if (err.response && err.response.status === 409) {
          const field = err.response.data.field;
          setJoinError(`이미 사용 중인 ${field}입니다.`);
        }
        if (err.response && err.response.status === 400) {
          setJoinError(err.response.data.message);
        }
      }
    },
  });

  const handleJoinSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearErrors();
    setValidationErrors();
    mutate();
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
      {isPending ? (
        <div className="flex justify-center items-center gap-4 w-[440px]">
          <span className="loading loading-spinner w-16 text-gray-600"></span>
        </div>
      ) : (
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

            {joinError && (
              <p className="w-[538px] mb-2 font-bold text-[12px] text-error">
                {joinError}
              </p>
            )}

            <div className="w-full flex justify-center items-center">
              <button
                type="submit"
                disabled={isDisabled}
                className={`btn mt-5 font-bold text-sm ${
                  isDisabled ? 'btn-disabled' : 'btn-primary'
                }`}
              >
                다음 단계로 넘어가기
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default JoinForm;
