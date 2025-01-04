const CategoryList = ['한식', '양식', '중식', '일식', '디저트', '기타'];

const Categories = ({
  selectedCategories,
  toggleCategory,
  size = 'sm',
  categories = CategoryList,
  readOnly = false,
}: {
  selectedCategories: string[];
  toggleCategory?: (category: string) => void;
  size?: string;
  categories?: string[];
  readOnly?: boolean;
}) => {
  const filteredCategories = readOnly
    ? categories.filter(category => CategoryList.includes(category))
    : CategoryList;

  return (
    <div className="flex flex-row gap-x-2">
      {filteredCategories.map(category => (
        <button
          key={category}
          type="button"
          className={`rounded-full btn btn-${size} ${
            selectedCategories.includes(category) && 'btn-primary'
          }`}
          onClick={
            !readOnly && toggleCategory
              ? () => toggleCategory(category)
              : undefined
          }
          disabled={readOnly}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default Categories;
