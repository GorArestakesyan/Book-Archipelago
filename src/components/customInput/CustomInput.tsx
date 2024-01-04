import SearchIcon from "@mui/icons-material/Search";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useApiCall } from "../../hooks/useBooks";
import { googleBooksApi, resetBooks } from "../../redux/slices";
import { useAppDispatch, useAppSelector } from "../../redux/store";

function CustomInput() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { inputValue, onChange } = useApiCall();
  const { category, sortBy, page } = useAppSelector(
    (state) => state.booksSlice
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/");
    dispatch(resetBooks());
    dispatch(googleBooksApi(inputValue, category, page, sortBy));
  };

  return (
    <form onSubmit={handleSubmit} className="inputContainer">
      <TextField
        size="small"
        variant="outlined"
        onChange={(e) => onChange(e.target.value)}
        value={inputValue}
        sx={{
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
              borderColor: "blue",
            },
            width: 400,
            backgroundColor: "#fff",
            borderColor: "#fff",
          },
        }}
        inputProps={{
          sx: {
            color: "black",
          },
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleSubmit}>
                <SearchIcon
                  sx={{
                    color: "purple",
                    "&:hover": {
                      color: "black",
                      transition: "0.5s",
                    },
                  }}
                />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </form>
  );
}

export default CustomInput;
