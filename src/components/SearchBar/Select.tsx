import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

interface Props {
  selectedOption: string;
  setSelectedOption: (value: string) => void;
}

const CustomDropdown = ({ selectedOption, setSelectedOption }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const options = [
    { value: "location", label: "장소" },
    { value: "title", label: "제목" },
    { value: "content", label: "내용" },
  ];

  const handleOptionClick = (value: string) => {
    setSelectedOption(value);
    setIsOpen(false);
  };

  return (
    <div className="w-[82px]">
      {/* Dropdown Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full pl-5 py-1.5 outline-none flex items-center justify-between"
      >
        {options.find((option) => option.value === selectedOption)?.label}
        <FaChevronDown className="w-[18px] h-[18px] text-gray-400" />
      </button>
      {isOpen && (
        <ul className="absolute w-full bg-white rounded-b-md z-10 shadow-[0_4px_4px_1px_rgba(0,0,0,0.25)] mt-1">
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => handleOptionClick(option.value)}
              className="px-5 py-0.5 hover:underline cursor-pointer"
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomDropdown;
