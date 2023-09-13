import { CircularProgress } from "@mui/material";
import { useAppSelector } from "../../redux/store";

function Loader() {
  const { isLoading } = useAppSelector((state) => state.booksSlice);

  return isLoading ? (
    <div className="loaderContainer">
      <CircularProgress size={100} />
    </div>
  ) : null;
}

export default Loader;
