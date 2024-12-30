import { User } from '../types/User';

export const users: User[] = [
  {
    id: 1,
    profileImage: 'https://picsum.photos/200/300',
    email: 'user1@naver.com',
    nickname: 'user1',
    phoneNumber: '010-1234-1234',
    gender: 'male',
    birth: '1994-05-01',
    mbti: 'ENFJ',
    introduction: '안녕하세요.',
  },
  {
    id: 2,
    email: 'user2@naver.com',
    nickname: 'user2',
    phoneNumber: '010-7546-9760',
    gender: 'male',
    birth: '2004-02-04',
    mbti: 'ISTJ',
  },
  {
    id: 3,
    email: 'user3@naver.com',
    nickname: 'user3',
    phoneNumber: '010-4453-5865',
    gender: 'female',
    birth: '1999-07-15',
  },
  {
    id: 4,
    profileImage: 'https://picsum.photos/200/300',
    email: 'user4@naver.com',
    nickname: 'user4',
    phoneNumber: '010-2342-1356',
    gender: 'female',
    birth: '1997-10-16',
    introduction: '반갑습니다!',
  },
];
