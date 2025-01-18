import { Link, useNavigate } from 'react-router-dom';
import { RiKakaoTalkFill } from 'react-icons/ri';
import Input from '../Input';
import { AxiosError } from 'axios';
import { useState } from 'react';
import axiosInstance from '../../api/axiosInstance';
import { useMutation } from '@tanstack/react-query';

const LoginForm = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loginError, setLoginError] = useState<string | null>(null);

  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.post('/api/v1/users/login', {
        email: email,
        password: password,
      });
      return response.data;
    },
    onSuccess: data => {
      if (data && data.accessToken) {
        localStorage.setItem('accessToken', data.accessToken);
      }

      navigate('/');
    },
    onError: err => {
      if (err instanceof AxiosError) {
        if (err.response && err.response.status === 400) {
          setLoginError(err.response.data.message);
        }
        if (err.response && err.response.status === 404) {
          setLoginError(err.response.data.message);
        }
      } else {
        setLoginError('오류가 발생했습니다.');
      }
    },
  });

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate();
  };

  const handleKakaoLogin = () => {
    const clientId = import.meta.env.VITE_KAKAO_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_KAKAO_REDIRECT_URI;
    const kakaoLoginUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;

    window.location.href = kakaoLoginUrl;
  };

  if (isPending) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <span className="loading loading-spinner w-16 text-gray-600"></span>
      </div>
    );
  }

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <form
        className="w-[320px] h-[340px] flex flex-col items-center gap-4"
        onSubmit={e => handleLoginSubmit(e)}
      >
        <span className="font-bold text-2xl">로그인</span>
        <Input
          type="email"
          name="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="이메일을 입력해주세요."
          required
        />
        <Input
          type="password"
          name="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="비밀번호를 입력해주세요."
          required
        />

        <button
          type="submit"
          className="btn btn-block font-bold text-[16px] btn-primary"
        >
          로그인
        </button>
        <button
          type="button"
          className="relative btn btn-block font-bold text-[16px] btn-social"
          onClick={handleKakaoLogin}
        >
          <RiKakaoTalkFill className="absolute top-[14px] left-4 w-5 scale-150" />
          카카오로 시작하기
        </button>

        <div className="w-full flex justify-end">
          <Link to="/reset-password">
            <span className="font-bold text-sm cursor-pointer">
              비밀번호를 잊으셨나요?
            </span>
          </Link>
        </div>

        {loginError && (
          <p className="w-[538px] mb-2 font-bold text-[12px] text-error">
            {loginError}
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginForm;
