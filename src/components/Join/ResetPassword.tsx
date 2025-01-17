import { useState } from 'react';
import Input from '../Input';
import axiosInstance from '../../api/axiosInstance';
import { AxiosError } from 'axios';

const ResetPassword = () => {
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axiosInstance.post('/api/v1/users/password/change/link-send', {
        email: email,
      });

      setError(null);

      setSuccess(
        '입력하신 이메일로 비밀번호 재설정 링크가 발송되었습니다. 메일을 확인해주세요.'
      );
    } catch (err) {
      if (err instanceof AxiosError) {
        // TODO: 오류 코드 확인 필요
        setError('입력하신 이메일로 가입된 계정이 없습니다.');
      }
    }
  };

  const handleConfirmBtn = () => {
    setSuccess(null);
  };

  return (
    <div className="relative w-full h-screen flex justify-center items-center">
      <form
        onSubmit={e => handleResetPassword(e)}
        className="w-[320px] h-[340px] flex flex-col items-center gap-4"
      >
        <span className="font-bold text-2xl">비밀번호 재설정</span>
        <p className="text-sm text-center">
          가입하신 이메일 주소를 입력하시면
          <br />
          비밀번호 재설정 링크를 발송해드립니다.
        </p>
        <Input
          type="email"
          name="email"
          value={email}
          placeholder="이메일을 입력해주세요."
          onChange={e => setEmail(e.target.value)}
          required
        />

        {success && (
          <div
            role="alert"
            className="absolute w-[400px] bg-white alert flex flex-col gap-5"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="stroke-gray-400 h-6 w-6 shrink-0"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="w-full font-bold text-sm text-center">{success}</p>
            <div>
              <button
                className="btn btn-sm btn-primary"
                onClick={handleConfirmBtn}
              >
                확인
              </button>
            </div>
          </div>
        )}
        {error && (
          <p className="w-full font-bold text-sm text-error text-center">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={!!success}
          className="btn btn-block font-bold text-[16px] btn-primary border-none"
        >
          비밀번호 재설정 링크 받기
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
