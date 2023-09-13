import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { debounceProps } from "../utils/types";

export const useDebounce = ({ value, milliSeconds }: debounceProps): string => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const dispatch = useDispatch();
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue((prev) => (value ? value : prev));
    }, milliSeconds);

    return () => {
      clearTimeout(handler);
    };
  }, [value, milliSeconds, dispatch]);
  return debouncedValue;
};
