import { Box, MenuItem, Select, Typography } from "@mui/material";
import React, { useCallback } from "react";
import CustomInput from "../../components/customInput/CustomInput";
import { useAppDispatch, useAppSelector } from "../../redux/store";

import {
  googleBooksApi,
  resetBooks,
  setCategory,
  setSortBy,
} from "../../redux/slices";
import "./index.css";
const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const { inputText, category, page, sortBy } = useAppSelector(
    (state) => state.booksSlice
  );

  const handleCategoryOrSorting = useCallback(
    (value: string, isCategory: boolean) => {
      if (isCategory) {
        dispatch(setCategory(value));
      } else {
        dispatch(setSortBy(value));
      }

      dispatch(resetBooks());
      dispatch(
        googleBooksApi(
          inputText,
          isCategory ? value : category,
          page,
          isCategory ? sortBy : value
        )
      );
    },
    [dispatch, inputText, category, page, sortBy]
  );

  return (
    <Box className="headerMain">
      <Box className="headerFilter">
        <Box className="headerMainBox">
          <Typography className="headerTitle">Search for books</Typography>
          <Box className="inputBox">
            <CustomInput />
          </Box>
          <Box className={"filterContainer"}>
            <Box className="filterBox">
              <Typography className="filterByText">Categories</Typography>
              <Select
                disabled={inputText ? false : true}
                size="small"
                sx={{ width: 170, color: "white" }}
                id="simple-select"
                inputProps={{
                  sx: {
                    color: "black",
                    backgroundColor: "white",
                  },
                }}
                label=""
                defaultValue={"All"}
                onChange={(e) => handleCategoryOrSorting(e.target.value, true)}
              >
                <MenuItem value={"All"}>All</MenuItem>
                <MenuItem value={"Art"}>Art</MenuItem>
                <MenuItem value={"Biography"}>Biography</MenuItem>
                <MenuItem value={"Computers"}>Computers</MenuItem>
                <MenuItem value={"History"}>History</MenuItem>
                <MenuItem value={"Medical"}>Medical</MenuItem>
                <MenuItem value={"Poetry"}>Poetry</MenuItem>
              </Select>
            </Box>
            <Box className="filterBox">
              <Typography className="filterByText">Sorting by</Typography>
              <Select
                disabled={inputText ? false : true}
                defaultValue={"Relevance"}
                size="small"
                inputProps={{
                  sx: {
                    color: "black",
                    backgroundColor: "white",
                  },
                }}
                sx={{ width: 170, color: "white" }}
                onChange={(e) => handleCategoryOrSorting(e.target.value, false)}
              >
                <MenuItem value={"Relevance"}>Relevance</MenuItem>
                <MenuItem value={"Newest"}>Newest</MenuItem>
              </Select>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
