import { atom } from 'recoil';

export const isValidUserFormState = atom<boolean>({
  key: 'isValidUserFormState',
  default: false,
});

export const profileImageURLState = atom<string | null>({
  key: 'profileImageURL',
  default: '../../public/image/default_profile_image.webp',
});
