import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';
import { useMutation } from '@tanstack/react-query';
import LoadingSpinner from '../LoadingSpinner';

const KakaoLogin = () => {
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: async (code: string) => {
      const response = await axiosInstance.post(
        '/api/v1/oauth/kakao/callback',
        {
          code: code,
        }
      );
      return response.data;
    },
    onSuccess: data => {
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('userId', data.userId);
      localStorage.setItem('loginType', 'kakao');
      console.log(data);
      navigate('/');
    },
    onError: () => {
      navigate('/login');
    },
  });

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');
    if (code) {
      mutate(code);
    }
  }, []);

  if (isPending) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <LoadingSpinner />
      </div>
    );
  }

  return <></>;
};

export default KakaoLogin;
