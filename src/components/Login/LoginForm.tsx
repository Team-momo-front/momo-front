import { Link, useNavigate } from 'react-router-dom';
import { RiKakaoTalkFill } from 'react-icons/ri';
import Input from '../Input';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import LoadingSpinner from '../LoadingSpinner';
import { emailLogin } from '../../api/uesrs';

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState<string | null>(null);

  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: () => emailLogin(formData),
    onSuccess: data => {
      if (data && data.accessToken) {
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('userId', data.userId.toString());
      }

      localStorage.setItem('loginType', 'email');
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  if (isPending) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <LoadingSpinner />
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
          value={formData.email}
          onChange={handleChange}
          placeholder="이메일을 입력해주세요."
          required
        />
        <Input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
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
          <p className="w-[538px] mb-2 font-bold text-[12px] text-error text-center">
            {loginError}
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginForm;
