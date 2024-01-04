import { Avatar, Box, Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import { googleBooksApi, setPage } from "../../redux/slices";
import { useAppDispatch, useAppSelector } from "../../redux/store";

import { Link } from "react-router-dom";
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

  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleSelection = (e: any) => {};
  const handleReset = () => {
    setPosition({ x: 0, y: 0 });
  };
  useEffect(() => {
    window.addEventListener("mouseup", (e: any) => {
      console.log("mouse up");
      const selection = window.getSelection()?.toString();
      if (selection?.length) {
        setPosition({
          x: e.x / 1.4,
          y: e.y / 3,
        });
        console.log(selection);
      }
      // window.addEventListener("mousedown", () => {
      window.removeEventListener("mouseup", () => {
        setPosition({
          x: 0,
          y: 0,
        });
      });
      handleReset();
    });
    // });
  }, []);

  return (
    <React.Fragment>
      {position.x ? (
        <div
          style={{
            height: "100px",
            width: "200px",
            backgroundColor: "gray",
            zIndex: 999,
            position: "absolute",
            transform: `translate(${position.x}px, ${position.y}px)`,
          }}
        />
      ) : null}
      <Grid
        onMouseUpCapture={handleSelection}
        className="bodyMainContainer"
        container
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
            sx={{ height: 50, position: "fixed", bottom: "3vh", right: "3vw" }}
          >
            Load More
          </Button>
        )}
      </Grid>
    </React.Fragment>
  );
}

export default Body;
