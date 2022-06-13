import { Outlet } from "react-router-dom";
import "../styles/Layout.scss";

export const Layout = () => {
  return (
    <div className="App">
      <Outlet></Outlet>
    </div>
  );
};
