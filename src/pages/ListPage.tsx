import { useState } from "react";
import Categories from "../components/Categories";
import Header from "../components/Header/Header";
import PostCard from "../components/PostCard";
import SearchBar from "../components/SearchBar/SearchBar";
import { Post } from "../types/Post";

const ListPage = () => {
  const [searchFilter, setSearchFilter] = useState<string>("location");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [filteredPosts, setFilteredPosts] = useState(posts);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((item) => item !== category) : [...prev, category]
    );
  };

  const handleSearch = () => {
    const filtered = posts.filter((post) => {
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(post.category);
      const matchesSearch =
        !searchQuery ||
        (searchFilter === "location" && post.location.includes(searchQuery)) ||
        (searchFilter === "title" && post.title.includes(searchQuery)) ||
        (searchFilter === "content" && post.content.includes(searchQuery));
      return matchesCategory && matchesSearch;
    });
    setFilteredPosts(filtered);
  };

  return (
    <>
      <Header />
      <div className="px-16 py-10">
        <SearchBar
          searchFilter={searchFilter}
          setSearchFilter={setSearchFilter}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSearch={handleSearch}
        />
        <div className="mt-[30px] justify-center flex">
          <Categories selectedCategories={selectedCategories} toggleCategory={toggleCategory} />
        </div>
        <div className="flex flex-wrap justify-center gap-10 mt-[26px]">
          {filteredPosts.map((post, index) => (
            <PostCard key={index} post={post} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ListPage;

const posts: Post[] = [
  {
    title: "맛집 탐방 한식 모임",
    meetingDate: "2024-12-30T18:30",
    location: "서울 강남구",
    participationCount: 5,
    category: "한식",
    content:
      "강남의 숨겨진 한식 맛집을 함께 탐방해요! 강남의 숨겨진 한식 맛집을 함께 탐방해요! 강남의 숨겨진 한식 맛집을 함께 탐방해요!",
    thumbnail: "image/korean_food.webp",
  },
  {
    title: "디저트 카페에서 만나요",
    meetingDate: "2024-12-28T15:00",
    location: "서울 마포구",
    participationCount: 3,
    category: "디저트",
    content:
      "마포에서 핫한 디저트 카페를 추천합니다. 마포에서 핫한 디저트 카페를 추천합니다. 마포에서 핫한 디저트 카페를 추천합니다. 마포에서 핫한 디저트 카페를 추천합니다. 마포에서 핫한 디저트 카페를 추천합니다. 마포에서 핫한 디저트 카페를 추천합니다.",
  },
  {
    title: "초밥 좋아하는 사람 모여라!",
    meetingDate: "2024-12-29T19:00",
    location: "서울 종로구",
    participationCount: 4,
    category: "일식",
    content: "종로에서 최고의 초밥을 즐기러 갑시다.",
    thumbnail: "image/sushi.webp",
  },
  {
    title: "중식당 신메뉴 함께 맛봐요",
    meetingDate: "2025-01-03T12:00",
    location: "서울 동대문구",
    participationCount: 6,
    category: "중식",
    content: "동대문에서 중식 신메뉴를 즐기실 분!",
  },
  {
    title: "스테이크와 와인 모임",
    meetingDate: "2025-01-05T20:00",
    location: "서울 서초구",
    participationCount: 2,
    category: "양식",
    content: "서초구에서 고급 스테이크를 함께 먹어요.",
    thumbnail: "image/steak.webp",
  },
  {
    title: "커피와 디저트로 여유를",
    meetingDate: "2025-01-07T14:00",
    location: "서울 강동구",
    participationCount: 5,
    category: "디저트",
    content: "강동구의 조용한 카페에서 디저트 모임!",
  },
  {
    title: "한식 소모임, 비빔밥 투어",
    meetingDate: "2024-12-31T11:30",
    location: "서울 노원구",
    participationCount: 4,
    category: "한식",
    content: "노원구 비빔밥 맛집 투어 함께해요.",
  },
  {
    title: "일본 라멘 탐방",
    meetingDate: "2025-01-02T19:30",
    location: "서울 성북구",
    participationCount: 3,
    category: "일식",
    content: "성북구 라멘 맛집에서 모여요.",
  },
  {
    title: "중화요리 모임",
    meetingDate: "2025-01-10T12:30",
    location: "서울 송파구",
    participationCount: 7,
    category: "중식",
    content: "송파구에서 중화요리와 함께 즐겨요.",
    thumbnail: "image/chinese_food.webp",
  },
  {
    title: "피자와 파스타의 날",
    meetingDate: "2025-01-08T18:00",
    location: "서울 은평구",
    participationCount: 6,
    category: "양식",
    content: "은평구에서 피자와 파스타를 먹어요.",
  },
  {
    title: "달콤한 디저트 나들이",
    meetingDate: "2025-01-11T16:00",
    location: "서울 광진구",
    participationCount: 3,
    category: "디저트",
    content: "광진구의 인기 디저트 맛집에 갑시다.",
    thumbnail: "image/dessert.webp",
  },
  {
    title: "기타 음식 모임",
    meetingDate: "2025-01-09T13:00",
    location: "서울 동작구",
    participationCount: 5,
    category: "기타",
    content: "동작구에서 다양한 음식을 탐방합니다.",
  },
  {
    title: "김치찌개와 소주 모임",
    meetingDate: "2025-01-15T18:00",
    location: "서울 강서구",
    participationCount: 4,
    category: "한식",
    content: "강서구의 김치찌개 전문점을 찾아갑니다.",
  },
  {
    title: "초밥과 사케 한잔",
    meetingDate: "2025-01-14T20:30",
    location: "서울 중랑구",
    participationCount: 2,
    category: "일식",
    content: "중랑구에서 초밥과 사케를 함께해요.",
    thumbnail: "image/sushi_party.webp",
  },
  {
    title: "탕수육과 짜장면의 날",
    meetingDate: "2025-01-12T12:00",
    location: "서울 금천구",
    participationCount: 8,
    category: "중식",
    content: "금천구의 중식당에서 탕수육을 나눠요.",
  },
  {
    title: "프렌치 레스토랑 모임",
    meetingDate: "2025-01-13T19:00",
    location: "서울 양천구",
    participationCount: 3,
    category: "양식",
    content: "양천구 프렌치 레스토랑에서 만나요.",
    thumbnail: "image/french_food.webp",
  },
];
