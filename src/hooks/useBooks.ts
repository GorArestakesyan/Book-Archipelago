import { useState } from "react";
import { setInputText } from "../redux/slices";
import { useAppDispatch } from "../redux/store";

const useApiCall = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const dispatch = useAppDispatch();

  const onChange = (e: string): void => {
    setInputValue(e);
    dispatch(setInputText(e));
  };
  return { inputValue, onChange };
};
export { useApiCall };
