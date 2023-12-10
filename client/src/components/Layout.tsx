import { Outlet } from "react-router-dom";
import Nav from "./Nav";

const Layout = () => {
  return (
    <div className="flex flex-col h-screen sm:h-full w-full sm:flex-row-reverse">
      <div className="bg-dark flex flex-col flex-1">
        <Outlet />
      </div>
      <Nav />
    </div>
  );
};

export default Layout;
