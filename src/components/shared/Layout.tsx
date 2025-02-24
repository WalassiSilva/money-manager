import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

function Layout() {
  return (
    <div className="relative ">
      
      <div>{<Outlet />}</div>
      <Footer />
    </div>
  );
}

export { Layout };
