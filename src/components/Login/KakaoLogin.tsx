import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import { useSetRecoilState } from 'recoil';
import { accessTokenState, userLoginTypeState } from '../../states/recoilState';

const KakaoLogin = () => {
  const navigate = useNavigate();
  const setAccessToken = useSetRecoilState(accessTokenState);
  const setUserLoginType = useSetRecoilState(userLoginTypeState);

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');

    const fetchAccessToken = async () => {
      try {
        const response = await axios.post('/api/v1/oauth/kakao/callback', {
          code: code,
        });

        setAccessToken(response.data.accessToken);
        setUserLoginType('kakaoUser');

        console.log(response.data.accessToken);
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
