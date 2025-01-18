import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import { Link } from 'react-router-dom';
import JoinField from './JoinField';

const VerifyEmailCode = () => {
  const [emailConfirmCode, setEmailConfirmCode] = useState<string>('');
  const [emailConfirmCodeError, setEmailConfirmCodeError] = useState<
    string | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleEmailConfirmCodeValidation = async () => {
    try {
      const response = await axios.post('/api/v1/users/signup/verify', null, {
        params: {
          code: emailConfirmCode,
        },
      });

      console.log(response.data);

      setIsModalOpen(true);
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

      {isModalOpen && (
        <dialog id="my_modal_5" className="modal modal-open sm:modal-middle ">
          <div className="modal-box flex flex-col items-center gap-2">
            {/* <GiPartyPopper className="py-3 w-[100px] h-[100px] fill-primary" /> */}
            <p className="py-3 font-bold">
              축하합니다! 회원가입이 완료되었습니다!
            </p>
            <Link to="/login">
              <button type="button" className="btn btn-primary">
                로그인 하러 가기
              </button>
            </Link>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default VerifyEmailCode;
