import { Item } from "../utils/types";

export const useLocalStorage = (
  method: string,
  key: string,
  book?: Item | undefined
): Item | null => {
  const item =
    method === "set"
      ? localStorage.setItem("selectedItem", JSON.stringify(book))
      : localStorage.getItem(key);
  const jsonedItem = item ? JSON.parse(item) : null;

  return jsonedItem ? jsonedItem : null;
};
