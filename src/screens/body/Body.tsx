import { Avatar, Box, Button, Grid, Typography } from "@mui/material";
import React from "react";

import { Link } from "react-router-dom";
import { googleBooksApi, setPage } from "../../redux/slices";
import { useAppDispatch, useAppSelector } from "../../redux/store";

import { useLocalStorage as SetBook } from "../../hooks/useLocalStorage";
import { Item } from "../../utils/types";
import "./index.css";

function Body() {
  let { books, inputText, category, page, sortBy, inLastPage, findedItems } =
    useAppSelector((state) => state.booksSlice);

  const dispatch = useAppDispatch();

  const loadMoreBook = () => {
    dispatch(setPage(page + 1));
    dispatch(googleBooksApi(inputText, category, page + 1, sortBy));
  };
  const handleSetBook = (book: Item) => SetBook("set", "selectedItem", book);
  return (
    <React.Fragment>
      <Grid
        className="bodyMainContainer"
        container
        p={3}
        justifyContent={"center"}
      >
        {books?.length ? (
          <Typography className="filterByText">
            Found {findedItems} results
          </Typography>
        ) : null}
        <Box className="bodyGridContainer">
          {Array.isArray(books) ? (
            books.map((book) => (
              <Grid
                item
                key={book.etag}
                sx={{
                  "&:hover": {
                    transform: "scale(1.05)",
                    transition: "0.3s",
                    boxShadow: "6px 6px 10px gray",
                  },
                }}
                className="box"
              >
                <Link
                  to={book.volumeInfo.title}
                  onClick={() => handleSetBook(book)}
                >
                  <Avatar
                    variant={"square"}
                    alt="The image"
                    src={book.volumeInfo.imageLinks?.thumbnail}
                    style={{
                      width: "90%",
                      height: 240,
                      margin: "0 auto",
                      objectFit: "contain",
                      backgroundSize: "contain",
                    }}
                  />
                  <Box className="aboutBook">
                    <Typography className="bookCategory">
                      {book?.volumeInfo?.categories?.[0]}
                    </Typography>
                    <Typography className="bookTitle">
                      {book?.volumeInfo?.title}
                    </Typography>
                    {Array.isArray(book?.volumeInfo?.authors) &&
                      book.volumeInfo.authors.map((author, i) => (
                        <Typography className="bookAuthor" key={i}>
                          {author}
                        </Typography>
                      ))}
                  </Box>
                </Link>
              </Grid>
            ))
          ) : (
            <Typography className="notFoundText">{`Books with name ${inputText} was not found`}</Typography>
          )}
        </Box>
        {inLastPage && (
          <Button
            variant="contained"
            onClick={loadMoreBook}
            size="small"
            sx={{ height: 50 }}
          >
            Load More
          </Button>
        )}
      </Grid>
    </React.Fragment>
  );
}

export default Body;
