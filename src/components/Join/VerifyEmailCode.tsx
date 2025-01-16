import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import JoinField from './JoinField';

const VerifyEmailCode = () => {
  const [emailConfirmCode, setEmailConfirmCode] = useState<string>('');
  const [emailConfirmCodeError, setEmailConfirmCodeError] = useState<
    string | null
  >(null);

  const navigate = useNavigate();

  const handleEmailConfirmCodeValidation = async () => {
    try {
      const response = await axios.post(
        'http://54.180.112.35:8080/api/v1/users/signup/verify',
        null,
        {
          params: {
            code: emailConfirmCode,
          },
        }
      );

      console.log(response.data);

      navigate('/create-profile');
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response && err.response.status === 400) {
          setEmailConfirmCodeError(err.response.data.message);
        } else {
          setEmailConfirmCodeError('서버와의 연결에 문제가 발생했습니다.');
        }
      }
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="max-w-[538px] flex gap-x-6">
        <div className="w-[320px] flex flex-col gap-4">
          <JoinField
            name="emailConfirmCode"
            label="인증 코드"
            type="text"
            value={emailConfirmCode}
            onChange={e => {
              setEmailConfirmCode(e.target.value);
            }}
            onBlur={handleEmailConfirmCodeValidation}
            error={emailConfirmCodeError}
            placeholder="인증 코드를 입력해주세요."
            required
          />

          <button
            type="button"
            className="mt-7 btn btn-primary font-bold text-sm"
            onClick={handleEmailConfirmCodeValidation}
          >
            이메일 인증
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailCode;
