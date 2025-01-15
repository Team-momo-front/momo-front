export type JoinErrorMessages = {
  emailError: string | null;
  passwordError: string | null;
  passwordConfirmError: string | null;
  nicknameError: string | null;
  phoneNumberError: string | null;
};

export type passwordErrorMessages = Pick<
  JoinErrorMessages,
  'passwordError' | 'passwordConfirmError'
>;
