import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";

function Layout() {
  return (
    <div className="app-shell relative page-fade-in">
      <div>{<Outlet />}</div>
      <Footer />
    </div>
  );
}

export { Layout };
