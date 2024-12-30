import { atom } from 'recoil';

export const isValidUserFormState = atom<boolean>({
  key: 'isValidUserFormState',
  default: false,
});
