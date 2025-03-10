import { FaSearch } from 'react-icons/fa';
import Select from './Select';
import { Post } from '../../types/Post';
import { calculateDistance } from '../../utils/calculateDistance';

interface SearchBarProps {
  searchFilter: string;
  setSearchFilter: (value: string) => void;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  onSearch: () => void;
  posts: Post[];
  setFilteredPosts: (posts: Post[]) => void;
}

const SearchBar = ({
  searchFilter,
  setSearchFilter,
  searchQuery,
  setSearchQuery,
  onSearch,
  posts,
  setFilteredPosts,
}: SearchBarProps) => {
  const handleLocationSearch = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const sortedPosts = [...posts].sort((a, b) => {
            const distanceA = calculateDistance(latitude, longitude, a.latitude, a.longitude);
            const distanceB = calculateDistance(latitude, longitude, b.latitude, b.longitude);

            return distanceA - distanceB;
          });

          setFilteredPosts(sortedPosts);
        },
        (error) => {
          alert('위치 정보를 가져올 수 없습니다.');
          console.error(error);
        }
      );
    } else {
      alert('이 브라우저에서는 위치 정보 제공이 지원되지 않습니다.');
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="relative flex items-center text-sm flex-grow max-w-[500px]">
        <div className="absolute">
          <Select selectedOption={searchFilter} setSelectedOption={setSearchFilter} />
        </div>
        <input
          type="text"
          className="input input-bordered flex items-center pl-24 flex-grow focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          placeholder="검색어를 입력해주세요"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onSearch();
            }
          }}
        />
        <FaSearch className="w-[18px] h-[18px] absolute right-3 text-gray-500 font-bold" />
      </div>
      <button className="ml-5 btn btn-sm btn-primary" onClick={handleLocationSearch}>
        내 주변 검색
      </button>
    </div>
  );
};

export default SearchBar;
