import { useEffect, useState } from 'react';

/** delay 시간이 지나야 value가 변경됩니다. */
export function useDebounce<T>(value: T, delay = 2000): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
