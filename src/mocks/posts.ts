import { Post } from '../types/Post';

export const posts: Post[] = [
  {
    id: '1',
    title: '맛집 탐방 한식 모임',
    meetingDate: '2025-01-01T18:30',
    location: '서울 강남구 테헤란로 123',
    participationCount: 10,
    approvedCount: 5,
    categories: ['한식'],
    content: '서울 강남구에서 맛있는 한식을 탐방하는 모임입니다.',
    thumbnail: 'image/korean_food_1.webp',
    place_name: '강남역',
    lat: 37.5665,
    lng: 126.978,
  },
  {
    id: '2',
    title: '디저트 카페 탐방 모임',
    meetingDate: '2025-01-05T14:00',
    location: '서울 마포구 연남동 240-8',
    participationCount: 8,
    approvedCount: 6,
    categories: ['디저트'],
    content:
      '연남동의 힙한 디저트 카페를 탐방하는 모임입니다. 연남동의 힙한 디저트 카페를 탐방하는 모임입니다. 연남동의 힙한 디저트 카페를 탐방하는 모임입니다. 연남동의 힙한 디저트 카페를 탐방하는 모임입니다. 연남동의 힙한 디저트 카페를 탐방하는 모임입니다. 연남동의 힙한 디저트 카페를 탐방하는 모임입니다.',
    thumbnail: 'image/korean_food_1.webp',
    place_name: '연남동',
    lat: 37.5665,
    lng: 126.978,
  },
  {
    id: '3',
    title: '서울 맛집 양식 모임',
    meetingDate: '2025-01-10T12:00',
    location: '서울 용산구 청파로 123',
    participationCount: 12,
    approvedCount: 9,
    categories: ['양식'],
    content: '서울 용산구에서 인기 있는 양식 레스토랑을 방문하는 모임입니다.',
    place_name: '서울역 공항철도',
    lat: 37.5665,
    lng: 126.978,
  },
  {
    id: '4',
    title: '부산 해운대 일식 모임',
    meetingDate: '2025-01-15T18:00',
    location: '부산 해운대구 123-4',
    participationCount: 15,
    approvedCount: 12,
    categories: ['일식'],
    content: '부산 해운대에서 맛있는 일식을 먹으며 즐거운 시간을 보내요.',
    thumbnail: 'image/korean_food_1.webp',
    place_name: '해운대역',
    lat: 37.5665,
    lng: 126.978,
  },
  {
    id: '5',
    title: '중식 모임 - 홍대 맛집',
    meetingDate: '2025-01-20T13:00',
    location: '서울 마포구 홍대입구 112-7',
    participationCount: 9,
    approvedCount: 7,
    categories: ['중식'],
    content:
      '홍대에서 인기 있는 중식 레스토랑을 탐방하는 모임입니다. 홍대에서 인기 있는 중식 레스토랑을 탐방하는 모임입니다. 홍대에서 인기 있는 중식 레스토랑을 탐방하는 모임입니다. 홍대에서 인기 있는 중식 레스토랑을 탐방하는 모임입니다. 홍대에서 인기 있는 중식 레스토랑을 탐방하는 모임입니다. 홍대에서 인기 있는 중식 레스토랑을 탐방하는 모임입니다.',
    place_name: '홍대입구역',
    lat: 37.5665,
    lng: 126.978,
  },
  {
    id: '6',
    title: '디저트 카페와 커피 모임',
    meetingDate: '2025-01-25T16:30',
    location: '서울 강남구 신사동 657-2',
    participationCount: 5,
    approvedCount: 4,
    categories: ['디저트', '기타'],
    content: '강남의 맛있는 디저트와 커피를 즐기며 소통하는 모임입니다.',
    thumbnail: 'image/korean_food_1.webp',
    place_name: '신사역',
    lat: 37.5665,
    lng: 126.978,
  },
  {
    id: '7',
    title: '양식 맛집 탐방 모임',
    meetingDate: '2025-02-01T12:30',
    location: '서울 종로구 인사동 25-3',
    participationCount: 7,
    approvedCount: 5,
    categories: ['양식'],
    content: '서울 종로구에서 맛있는 양식 레스토랑을 탐방하는 모임입니다.',
    thumbnail: 'image/korean_food_1.webp',
    place_name: '종로3가역',
    lat: 37.5665,
    lng: 126.978,
  },
  {
    id: '8',
    title: '서울 디저트 맛집 모임',
    meetingDate: '2025-02-05T14:00',
    location: '서울 서초구 방배동 223-5',
    participationCount: 10,
    approvedCount: 6,
    categories: ['디저트'],
    content: '서울 서초구에서 다양한 디저트 맛집을 탐방하는 모임입니다.',
    place_name: '방배역',
    lat: 37.5665,
    lng: 126.978,
  },
  {
    id: '9',
    title: '강남 맛집 탐방 - 중식 모임',
    meetingDate: '2025-02-10T17:30',
    location: '서울 강남구 역삼로 123',
    participationCount: 6,
    approvedCount: 5,
    categories: ['중식'],
    content: '강남에서 맛있는 중식 레스토랑을 탐방하며 즐거운 시간을 보세요.',
    thumbnail: 'image/korean_food_1.webp',
    place_name: '역삼역',
    lat: 37.5665,
    lng: 126.978,
  },
  {
    id: '10',
    title: '일식 고급 맛집 탐방 모임',
    meetingDate: '2025-02-15T19:00',
    location: '서울 송파구 가락로 57',
    participationCount: 8,
    approvedCount: 6,
    categories: ['일식'],
    content: '서울 송파구에서 고급 일식 레스토랑을 방문하는 모임입니다.',
    place_name: '가락시장역',
    lat: 37.5665,
    lng: 126.978,
  },
  {
    id: '11',
    title: '디저트 탐방 모임',
    meetingDate: '2025-03-01T15:00',
    location: '서울 강남구 논현로 98',
    participationCount: 7,
    approvedCount: 5,
    categories: ['디저트'],
    content: '서울 강남구에서 맛있는 디저트를 탐방하는 모임입니다.',
    thumbnail: 'image/korean_food_1.webp',
    place_name: '논현역',
    lat: 37.5665,
    lng: 126.978,
  },
  {
    id: '12',
    title: '한식 탐방 모임',
    meetingDate: '2025-03-05T19:00',
    location: '서울 종로구 세운상가 23',
    participationCount: 5,
    approvedCount: 4,
    categories: ['한식'],
    content: '서울 종로구의 숨겨진 한식 맛집을 탐방하는 모임입니다.',
    place_name: '청계천역',
    lat: 37.5665,
    lng: 126.978,
  },
  {
    id: '13',
    title: '양식과 와인 모임',
    meetingDate: '2025-03-10T17:30',
    location: '서울 강남구 선릉로 473',
    participationCount: 9,
    approvedCount: 7,
    categories: ['양식'],
    content: '양식 레스토랑에서 와인을 곁들여 즐기는 모임입니다.',
    place_name: '선릉역',
    lat: 37.5665,
    lng: 126.978,
  },
  {
    id: '14',
    title: '중식 탐방 - 홍대 맛집',
    meetingDate: '2025-03-15T13:30',
    location: '서울 마포구 홍대입구 87-3',
    participationCount: 6,
    approvedCount: 5,
    categories: ['중식'],
    content: '홍대에서 맛있는 중식을 탐방하는 모임입니다.',
    place_name: '홍대입구역',
    lat: 37.5665,
    lng: 126.978,
  },
  {
    id: '15',
    title: '부산 해운대 디저트 모임',
    meetingDate: '2025-03-20T14:00',
    location: '부산 해운대구 해운대해변로 100',
    participationCount: 8,
    approvedCount: 6,
    categories: ['디저트'],
    content: '부산 해운대에서 맛있는 디저트를 즐기는 모임입니다.',
    thumbnail: 'image/korean_food_1.webp',
    place_name: '해운대역',
    lat: 37.5665,
    lng: 126.978,
  },
  {
    id: '16',
    title: '서울 한식 탐방 모임',
    meetingDate: '2025-03-25T18:00',
    location: '서울 서대문구 연세로 50',
    participationCount: 10,
    approvedCount: 7,
    categories: ['한식'],
    content: '서울 서대문구에서 맛있는 한식을 탐방하는 모임입니다.',
    place_name: '신촌역',
    lat: 37.5665,
    lng: 126.978,
  },
  {
    id: '17',
    title: '이태원 맛집 탐방 모임',
    meetingDate: '2025-04-01T16:30',
    location: '서울 용산구 이태원로 214',
    participationCount: 12,
    approvedCount: 8,
    categories: ['양식'],
    content: '이태원의 맛있는 양식 레스토랑을 탐방하는 모임입니다.',
    thumbnail: 'image/korean_food_1.webp',
    place_name: '이태원역',
    lat: 37.5665,
    lng: 126.978,
  },
  {
    id: '18',
    title: '강남 고급 일식 모임',
    meetingDate: '2025-04-05T19:00',
    location: '서울 강남구 테헤란로 97',
    participationCount: 7,
    approvedCount: 5,
    categories: ['일식'],
    content: '강남의 고급 일식 레스토랑에서 즐기는 모임입니다.',
    place_name: '강남역',
    lat: 37.5665,
    lng: 126.978,
  },
  {
    id: '19',
    title: '이태원 디저트 탐방',
    meetingDate: '2025-04-10T14:00',
    location: '서울 용산구 이태원로 133',
    participationCount: 5,
    approvedCount: 4,
    categories: ['디저트'],
    content: '이태원에서 힙한 디저트 카페를 탐방하는 모임입니다.',
    thumbnail: 'image/korean_food_1.webp',
    place_name: '이태원역',
    lat: 37.5665,
    lng: 126.978,
  },
  {
    id: '20',
    title: '맛집 탐방 중식 모임',
    meetingDate: '2025-04-15T12:30',
    location: '서울 강남구 삼성로 112',
    participationCount: 10,
    approvedCount: 7,
    categories: ['중식'],
    content: '강남에서 인기 있는 중식 맛집을 탐방하는 모임입니다.',
    place_name: '삼성역',
    lat: 37.5665,
    lng: 126.978,
  },
  {
    id: '21',
    title: '서울 양식 탐방 모임',
    meetingDate: '2025-04-20T18:00',
    location: '서울 종로구 인사동 234-2',
    participationCount: 6,
    approvedCount: 4,
    categories: ['양식'],
    content: '서울 종로에서 다양한 양식 레스토랑을 탐방하는 모임입니다.',
    place_name: '종로3가역',
    lat: 37.5665,
    lng: 126.978,
  },
  {
    id: '22',
    title: '부산 디저트 모임',
    meetingDate: '2025-04-25T16:30',
    location: '부산 해운대구 해운대해변로 52',
    participationCount: 8,
    approvedCount: 6,
    categories: ['디저트'],
    content: '부산 해운대에서 맛있는 디저트를 탐방하는 모임입니다.',
    thumbnail: 'image/korean_food_1.webp',
    place_name: '해운대역',
    lat: 37.5665,
    lng: 126.978,
  },
];
