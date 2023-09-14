import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_KEY } from "../API/API_KEY";
import { BASE_URL, MAX_RESULTS } from "../constants/constants";
import { AppDispatch, Item, initialStateType } from "../utils/types";

const initialState: initialStateType = {
  books: [],
  isLoading: false,
  category: "all",
  maxResults: 30,
  inputText: "",
  sortBy: "relevance",
  findedItems: 0,
  page: 1,
  inLastPage: false,
};

export const booksSlice = createSlice({
  name: "booksSlice",
  initialState,
  reducers: {
    setBooks: (state, action: PayloadAction<Item[]>) => {
      state.books =
        state.page === 1 ? action.payload : [...state.books, ...action.payload];
      state.inLastPage = !!action.payload;
    },
    resetBooks: (state, action: PayloadAction) => {
      state.books = [];
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    setInputText: (state, action: PayloadAction<string>) => {
      state.inputText = action.payload;
    },

    setSortBy: (state, action: PayloadAction<string>) => {
      state.sortBy = action.payload;
    },
    setFindedItems: (state, action: PayloadAction<number>) => {
      state.findedItems = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
  },
});

export const googleBooksApi =
  (searchTerm = "", category?: string, page = 1, sort = "relevance") =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      const startIndex = MAX_RESULTS * page;

      const response = await axios.get(
        `${BASE_URL}?q=${searchTerm}&+subject:${category}&maxResults=${MAX_RESULTS}&startIndex=${startIndex}&orderBy=${sort}&key=${API_KEY}`
      );
      const { items } = response.data;

      dispatch(setFindedItems(response.data.totalItems));
      dispatch(setBooks(items));
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const {
  setPage,
  setBooks,
  setSortBy,
  resetBooks,
  setLoading,
  setCategory,
  setInputText,
  setFindedItems,
} = booksSlice.actions;

export default booksSlice.reducer;
