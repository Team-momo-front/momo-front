import { useState } from 'react';
import { Link } from 'react-router-dom';
import JoinField from './JoinField';

const VerifyEmailCode = () => {
  const [emailConfirmCode, setEmailConfirmCode] = useState<string>('');
  const [emailConfirmCodeError, setEmailConfirmCodeError] = useState<
    string | null
  >(null);
  const [emailConfirmCodeStatus, setEmailConfirmCodeStatus] = useState<
    'success' | 'error' | null
  >(null);

  const handleEmailValidation = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log('인증 코드 요청');
    // TODO: API 통신
    // 'http://54.180.112.35:8080/api/v1/users/signup/verify'
    // test: 버튼 클릭 이벤트 하드 코딩
    const successResponse = { success: true };

    try {
      console.log(successResponse);
    } catch (error) {
      console.error(error);
      setEmailConfirmCodeError(emailConfirmCodeStatus);
    }
  };

  const handleEmailConfirmCodeValidation = () => {
    // test
    const validCode = '1234';

    if (emailConfirmCode === validCode) {
      setEmailConfirmCodeStatus('success');
    } else {
      setEmailConfirmCodeStatus('error');
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="max-w-[538px] flex gap-x-6">
        <form
          className="w-[320px] flex flex-col gap-4"
          onSubmit={handleEmailValidation}
        >
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
            emailConfirmCodeStatus={emailConfirmCodeStatus}
          />
          <Link to={'/create-profile'}>
            <button
              type="button"
              className="mt-7 btn btn-primary font-bold text-sm"
            >
              이메일 인증
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default VerifyEmailCode;
