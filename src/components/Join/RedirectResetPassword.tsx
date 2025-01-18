import { useState } from 'react';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';
import JoinField from './JoinField';
import {
  handleValidation,
  validatePassword,
  validatePasswordConfirm,
} from './validation';
import { passwordErrorMessages } from '../../types/Errors';

const RedirectResetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');
  const [errors, setErrors] = useState<passwordErrorMessages>({
    passwordError: null,
    passwordConfirmError: null,
  });

  const setValidationErrors = () => {
    setErrors({
      passwordError: validatePassword(password),
      passwordConfirmError: validatePasswordConfirm(password, passwordConfirm),
    });
  };

  const token = new URL(window.location.href).searchParams.get('token');

  const fetchAccessToken = async () => {
    try {
      await axiosInstance.post('/api/v1/users/password/change', {
        token: token,
        newPassword: password,
      });

      alert('비밀번호가 변경되었습니다. 다시 로그인해주세요.');
      setValidationErrors();
      navigate('/login');
    } catch (err) {
      if (err instanceof AxiosError) {
        console.log(err.message);
      }
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="max-w-[538px] flex gap-x-6">
        <form className="w-[320px] flex flex-col gap-4">
          <JoinField
            name="password"
            label="비밀번호"
            type="password"
            value={password}
            onChange={e => {
              setPassword(e.target.value);
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
            placeholder="새로운 비밀번호를 입력해주세요."
            required
          />
          <JoinField
            name="passwordConfirm"
            label="비밀번호 확인"
            type="password"
            value={passwordConfirm}
            onChange={e => {
              setPasswordConfirm(e.target.value);
            }}
            onBlur={e =>
              handleValidation(
                e.target.name,
                e.target.value,
                value => validatePasswordConfirm(password, value),
                setErrors
              )
            }
            error={errors.passwordConfirmError}
            placeholder="새로운 비밀번호를 다시 한 번 입력해주세요."
            required
          />
          <button
            type="button"
            onClick={fetchAccessToken}
            disabled={!password || !passwordConfirm}
            className="btn btn-block font-bold text-[16px] btn-primary border-none"
          >
            비밀번호 재설정
          </button>
        </form>
      </div>
    </div>
  );
};

export default RedirectResetPassword;
