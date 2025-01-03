import { atom } from 'recoil';
import { User } from '../types/User';
import { ActiveState } from '../types/Post';

export const isFormInvalidFormState = atom<boolean>({
  key: 'isValidUserFormState',
  default: false,
});

export const initialUserDataState = atom<User>({
  key: 'initialUserDataState',
  default: {
    id: 0,
    email: '',
    gender: '',
    birth: '',
    nickname: '',
    phoneNumber: '',
    mbti: '',
    introduction: '',
    profileImage: '',
  },
});

export const updatedUserDataState = atom<User>({
  key: 'updatedUserDataState',
  default: {
    id: 0,
    email: '',
    gender: '',
    birth: '',
    nickname: '',
    phoneNumber: '',
    mbti: '',
    introduction: '',
    profileImage: '',
  },
});

export const isActiveState = atom<ActiveState>({
  key: 'isActiveState',
  default: 'isHosted',
});
