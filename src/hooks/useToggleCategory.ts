import { useState } from 'react';

export const useToggleCategory = (initialCategories: string[] = []) => {
  const [categories, setCategories] = useState<string[]>(initialCategories);

  const toggleCategory = (category: string) => {
    setCategories(prev =>
      prev.includes(category)
        ? prev.filter(item => item !== category)
        : [...prev, category]
    );
  };

  return { categories, toggleCategory };
};
