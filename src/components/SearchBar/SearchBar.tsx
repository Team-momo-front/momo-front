import { FaSearch } from "react-icons/fa";
import CustomDropdown from "./Select";

interface SearchBarProps {
  searchFilter: string;
  setSearchFilter: (value: string) => void;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  onSearch: () => void;
}

const SearchBar = ({ searchFilter, setSearchFilter, searchQuery, setSearchQuery, onSearch }: SearchBarProps) => {
  return (
    <div className="flex justify-center items-center">
      <div className="relative flex items-center text-sm flex-grow max-w-[500px]">
        <div className="absolute">
          <CustomDropdown selectedOption={searchFilter} setSelectedOption={setSearchFilter} />
        </div>
        <input
          type="text"
          placeholder="검색어를 입력해주세요"
          className="shadow-[0_4px_4px_1px_rgba(0,0,0,0.25)] pl-24 pr-4 py-2 outline-none placeholder-gray-600 flex-grow"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSearch();
            }
          }}
        />
        <button className="absolute right-3 text-gray-500 font-bold" onClick={onSearch}>
          <FaSearch className="w-[18px] h-[18px]" />
        </button>
      </div>
      <button
        className="ml-5 bg-primary text-sm text-white font-bold py-1.5 rounded-md w-24"
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
