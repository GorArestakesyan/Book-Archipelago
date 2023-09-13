import { Avatar, Box, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { Item } from "../../utils/types";
import "./index.css";
const SelectedBook: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const result = useLocalStorage("get", "selectedItem", undefined);
  useEffect(() => {
    setSelectedItem(result);
  }, [result]);
  return (
    <Box className="selectedBookContainer">
      <Box className="imageBox">
        <Paper
          elevation={20}
          style={{ width: "45%", height: "75%", margin: "0 auto" }}
        >
          <Avatar
            variant={"square"}
            alt="The image"
            src={selectedItem?.volumeInfo.imageLinks?.thumbnail}
            style={{
              width: "100%",
              height: "100%",
              margin: "0 auto",
              objectFit: "contain",
              backgroundSize: "contain",
            }}
          />
        </Paper>
      </Box>
      <Box className="aboutBookBox">
        <Typography className="bookAuthor">
          {selectedItem?.volumeInfo?.categories}
        </Typography>
        <Typography className="bookTitle">
          {selectedItem?.volumeInfo?.title}
        </Typography>
        {Array.isArray(selectedItem?.volumeInfo?.authors) &&
          selectedItem?.volumeInfo.authors.map((author, i) => (
            <Typography className="bookAuthor" key={i}>
              {author}
            </Typography>
          ))}
        <Box className="selBookDescription">
          <Typography>{selectedItem?.volumeInfo?.description}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default SelectedBook;
