import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="flex absolute bottom-0">
      <nav>
        <ul className="flex justify-between px-4">
          <li className="">
            <Link to="/" className="underline">Home</Link>
          </li>
          <li>
            <Link to="/transactions" className="underline">Transactions</Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export { Footer };