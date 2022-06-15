import { Outlet } from "react-router-dom";
import "../styles/Layout.scss";

export const Layout = () => {
  return (
    <div className="App">
      <header className="header">
        <h2>Zoo</h2>
      </header>
      <Outlet></Outlet>
    </div>
  );
};
