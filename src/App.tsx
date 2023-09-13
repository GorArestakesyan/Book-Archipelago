import React from "react";
import "./App.css";

import { Box } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import Loader from "./components/Loader/Loader";
import { router } from "./routes";

function App() {
  return (
    <React.Fragment>
      <Loader />
      <Box className="App">
        <RouterProvider router={router} />
      </Box>
    </React.Fragment>
  );
}

export default App;
