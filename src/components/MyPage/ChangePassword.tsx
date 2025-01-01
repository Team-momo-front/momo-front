import { useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '../Input';
import {
  handleValidation,
  validatePassword,
  validatePasswordConfirm,
} from '../Join/validation';

export type passwordErrorMessages = {
  passwordError: string | null;
  passwordConfirmError: string | null;
};

const ChangePassword = () => {
  const [password, setPassword] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [errors, setErrors] = useState<passwordErrorMessages>({
    passwordError: null,
    passwordConfirmError: null,
  });

  const handleChangePassword = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    // TODO: 비밀번호 변경 요청

    setErrors({
      passwordError: null,
      passwordConfirmError: null,
    });
    setValidationErrors();
    setIsModalOpen(true);
  };

  const setValidationErrors = () => {
    setErrors({
      passwordError: validatePassword(password),
      passwordConfirmError: validatePasswordConfirm(password, passwordConfirm),
    });
  };

  return (
    <div className="w-full">
      <div className="w-[680px] m-auto flex items-center justify-center mt-[128px]">
        <form
          onSubmit={handleChangePassword}
          className="w-[320px] flex flex-col justify-center items-center gap-4"
        >
          <span className="font-bold text-xl mb-4">비밀번호 변경</span>
          <Input
            name="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onBlur={e => {
              handleValidation(
                e.target.name,
                e.target.value,
                validatePassword,
                setErrors
              );
            }}
            placeholder="변경할 비밀번호를 입력해주세요."
            className={`${
              errors.passwordError
                ? 'ring-error ring-1 border-error focus:ring-error focus:ring-1 focus:border-error'
                : 'border-1'
            } `}
            required
          />

          {errors.passwordError && (
            <p className="mt-1 font-bold text-[12px] text-error">
              {errors.passwordError}
            </p>
          )}

          <Input
            name="passwordConfirm"
            type="password"
            value={passwordConfirm}
            onChange={e => setPasswordConfirm(e.target.value)}
            onBlur={e => {
              handleValidation(
                e.target.name,
                e.target.value,
                value => validatePasswordConfirm(password, value),
                setErrors
              );
            }}
            placeholder="변경할 비밀번호를 다시 한 번 입력해주세요."
            className={`${
              errors.passwordConfirmError
                ? 'ring-error ring-1 border-error focus:ring-error focus:ring-1 focus:border-error'
                : 'border-1'
            } `}
            required
          />
          {errors.passwordConfirmError && (
            <p className="mt-1 font-bold text-[12px] text-error">
              {errors.passwordConfirmError}
            </p>
          )}
          <div className="w-full flex justify-end items-center">
            <button type="submit" className="btn btn-primary">
              비밀번호 변경
            </button>
          </div>
        </form>

        {isModalOpen && (
          <dialog id="my_modal_5" className="modal modal-open sm:modal-middle ">
            <div className="modal-box flex flex-col items-center gap-4">
              <p className="py-3 font-bold">비밀번호가 변경되었습니다.</p>
              <Link to="/login">
                <button type="button" className="btn btn-primary">
                  로그인 하러 가기
                </button>
              </Link>
            </div>
          </dialog>
        )}
      </div>
    </div>
  );
};

export default ChangePassword;
