import React from "react";
import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";

function Layout() {
  return (
    <div className="relative h-[100%]">
      <div>{<Outlet />}</div>
      <Footer />
    </div>
  );
}

export { Layout };