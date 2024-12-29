import { FaSearch } from 'react-icons/fa';
import Select from './Select';

interface SearchBarProps {
  searchFilter: string;
  setSearchFilter: (value: string) => void;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  onSearch: () => void;
}

const SearchBar = ({
  searchFilter,
  setSearchFilter,
  searchQuery,
  setSearchQuery,
  onSearch,
}: SearchBarProps) => {
  return (
    <div className="flex justify-center items-center">
      <div className="relative flex items-center text-sm flex-grow max-w-[500px]">
        <div className="absolute">
          <Select
            selectedOption={searchFilter}
            setSelectedOption={setSearchFilter}
          />
        </div>
        <input
          type="text"
          className="input input-bordered flex items-center pl-24 flex-grow focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          placeholder="검색어를 입력해주세요"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              onSearch();
            }
          }}
        />
        <FaSearch className="w-[18px] h-[18px] absolute right-3 text-gray-500 font-bold" />
      </div>
      <button
        className="ml-5 btn btn-sm btn-primary"
        onClick={() => {
          // TODO - 위치 기반 검색
        }}
      >
        내 주변 검색
      </button>
    </div>
  );
};

export default SearchBar;
