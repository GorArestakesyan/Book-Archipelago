import { createBrowserRouter } from "react-router-dom";
import Body from "../screens/body/Body";
import SelectedBook from "../screens/selectedBook/SelectedBook";
import Outlet from "./Outlet";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Outlet />,
    children: [
      {
        index: true,
        element: <Body />,
      },
      {
        path: ":id",
        element: <SelectedBook />,
      },
    ],
  },
]);
