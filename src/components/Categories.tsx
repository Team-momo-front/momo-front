const CategoryList = ['한식', '양식', '중식', '일식', '디저트', '기타'];

const Categories = ({
  selectedCategories,
  toggleCategory,
  size = 'sm',
}: {
  selectedCategories: string[];
  toggleCategory: (category: string) => void;
  size?: string;
}) => {
  return (
    <div className="flex flex-row gap-x-2">
      {CategoryList.map(category => (
        <button
          key={category}
          type="button"
          className={`rounded-full btn btn-${size} ${
            selectedCategories.includes(category) && 'btn-primary'
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
