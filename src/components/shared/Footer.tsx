import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="flex absolute bottom-0 w-full text-white">
      <nav className="w-full">
        <ul className="  flex justify-around px-4">
          <li className="">
            <Link to="/" className="underline">Home</Link>
          </li>
          <li>
            <Link to="/transactions/add" className="underline">Add</Link>
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