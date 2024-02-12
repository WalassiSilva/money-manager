import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";

function Layout() {
  return (
    <div className="relative ">
      <div className="">
        {<Outlet />}
      </div>

      <Footer />
    </div>
  );
}

export { Layout };