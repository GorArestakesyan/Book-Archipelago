import { Outlet as RouterOutlet } from "react-router-dom";
import Header from "../screens/header/Header";
const Outlet = () => {
  return (
    <>
      <Header />
      <RouterOutlet />
    </>
  );
};

export default Outlet;
