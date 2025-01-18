import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios';

const KakaoLogin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');

    const fetchAccessToken = async () => {
      try {
        const response = await axios.post('/api/v1/oauth/kakao/callback', {
          code: code,
        });

        localStorage.setItem('accessToken', response.data.accessToken);

        navigate('/');
      } catch (err) {
        if (err instanceof AxiosError) {
          console.log('로그인 실패:', err);
          navigate('/login');
        }
      }
    };

    fetchAccessToken();
  }, []);

  return <></>;
};

export default KakaoLogin;
