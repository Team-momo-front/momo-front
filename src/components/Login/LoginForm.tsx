import { Link, useNavigate } from 'react-router-dom';
import { RiKakaoTalkFill } from 'react-icons/ri';
import Input from '../Input';
import axios, { AxiosError } from 'axios';
import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { isLoginUserState } from '../../states/recoilState';

const LoginForm = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const setIsLoginUser = useSetRecoilState(isLoginUserState);

  const navigate = useNavigate();

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://54.180.112.35:8080/api/v1/users/login',
        { email: email, password: password }
      );

      console.log(response.data);

      if (response.data && response.data.accessToken) {
        console.log(response.data.accessToken);
        localStorage.setItem('accessToken', response.data.accessToken);
        setIsLoginUser(response.data.accessToken);
      }

      navigate('/');
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response && err.response.status === 400) {
          setLoginError(err.response.data.message);
        }
        if (err.response && err.response.status === 404) {
          setLoginError(err.response.data.message);
        }
      }
    }
  };

  const handleKakaoLogin = () => {
    const clientId = '27bbfdb96e3f9b77e112ca662ac84480';
    // const redirectUri = 'http://54.180.112.35:8080/api/v1/oauth/kakao/callback';
    const redirectUri = 'http://localhost:5173/kakao/callback';
    const kakaoLoginUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;

    window.location.href = kakaoLoginUrl;
  };

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
