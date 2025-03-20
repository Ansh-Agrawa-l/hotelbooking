import { Outlet } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import Navbar from "../navbar/Navbar";
import "./layout.scss";

const Layout = () => {
  return (
    <div className="layout">
      <Sidebar />
      <div className="main">
        <Navbar />
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout; 