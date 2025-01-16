import { atom } from 'recoil';
import { User, UserLoginType } from '../types/User';
import { ActiveState } from '../types/Post';
import { Chat } from '../types/Chat';

// 로그인
export const accessTokenState = atom<string | null>({
  key: 'accessTokenState',
  default: null,
});

export const userLoginTypeState = atom<UserLoginType>({
  key: 'userLoginTypeState',
  default: null,
});

// 마이페이지 & 유저
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
    userId: '',
    status: '',
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
    userId: '',
    status: '',
  },
});

export const isActiveState = atom<ActiveState>({
  key: 'isActiveState',
  default: 'isHosted',
});

// 채팅
export const isChatModalOpenState = atom<boolean>({
  key: 'isChatModalOpenState',
  default: false,
});

export const isChatListOpenState = atom<boolean>({
  key: 'isChatListOpenState',
  default: true,
});

export const isChatRoomOpenState = atom<boolean>({
  key: 'isChatRoomOpenState',
  default: false,
});

export const isViewParticipantListOpenState = atom<boolean>({
  key: 'isViewParticipantListOpenState',
  default: false,
});

export const selectedChatState = atom<Chat | null>({
  key: 'selectedChatState',
  default: null,
});
