enum CategoryList {
  KOREAN = '한식',
  WESTERN = '양식',
  CHINESE = '중식',
  JAPANESE = '일식',
  DESSERT = '디저트',
  OTHER = '기타',
}

type CategoryKey = keyof typeof CategoryList;

export const categoryValueToKey = Object.keys(CategoryList).reduce(
  (acc, key) => {
    const value = CategoryList[key as CategoryKey];
    acc[value] = key as CategoryKey;
    return acc;
  },
  {} as { [key: string]: CategoryKey }
);
