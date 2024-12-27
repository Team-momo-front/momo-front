import { JoinErrorMessages } from '../types/types.ts';

export const validateEmail = (email: string): string | null => {
  const validEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!validEmail.test(email)) {
    return '이메일 형식이 올바르지 않습니다.';
  }
  return null;
};

export const validatePassword = (password: string): string | null => {
  const validPassword = /^[A-Za-z0-9!@#$%^&*]{8,16}$/;

  if (!validPassword.test(password)) {
    return '비밀번호는 영문, 숫자, 특수문자를 조합하여 8~16자 내외로 입력해주세요.';
  }
  return null;
};

export const validatePasswordConfirm = (password: string, passwordConfirm: string): string | null => {
  if (password !== passwordConfirm) {
    return '비밀번호가 일치하지 않습니다.';
  }
  return null;
};

export const validateNickname = (nickname: string): string | null => {
  const validNickname = /^[a-zA-Z가-힣0-9]{2,10}$/;

  if (!validNickname.test(nickname)) {
    return '닉네임은 영문, 한글, 숫자를 포함해 2~10자 내외로 입력해주세요.';
  }
  return null;
};

export const validatePhoneNumber = (phoneNumber: string): string | null => {
  const validPhoneNumber = /\d{3}-\d{4}-\d{4}/;

  if (!validPhoneNumber.test(phoneNumber)) {
    return '휴대폰 번호의 형식이 올바르지 않습니다.';
  }
  return null;
};

export const handleValidation = (
  name: string,
  value: string,
  validator: (input: string) => string | null,
  setErrors: React.Dispatch<React.SetStateAction<JoinErrorMessages>>
) => {
  setErrors((prevErrors) => ({
    ...prevErrors,
    [`${name}Error`]: value ? validator(value) : null,
  }));
};
