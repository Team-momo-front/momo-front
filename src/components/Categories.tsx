const CategoryList = ["한식", "양식", "중식", "일식", "디저트", "기타"];

const Categories = ({
  selectedCategories,
  toggleCategory,
}: {
  selectedCategories: string[];
  toggleCategory: (category: string) => void;
}) => {
  return (
    <div className="flex flex-row gap-x-3">
      {CategoryList.map((category) => (
        <button
          key={category}
          className={`text-[15px] font-bold rounded-[10px] px-2 py-[2px] ${
            selectedCategories.includes(category) ? "bg-primary text-white" : "hover:bg-primary hover:text-white"
          }`}
          onClick={() => toggleCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default Categories;
