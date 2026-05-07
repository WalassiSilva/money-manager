import { Link } from "react-router-dom";

import { MdOutlineHome } from "react-icons/md";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaRegListAlt } from "react-icons/fa";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

export const Footer = () => {
  return (
    <footer className="sticky bottom-0 z-30 w-full px-3 pb-2">
      <nav className="glass-panel-strong mx-auto max-w-4xl rounded-2xl py-3">
        <ul className="flex justify-around lg:justify-center lg:gap-12 text-2xl text-slate-200">
          <ItemList>
            <Link to="/" className="underline">
              <MdOutlineHome />
            </Link>
          </ItemList>

          {/* <ItemList>
            <Link to="/transactions/categories">
              <FaChartPie />
            </Link>
          </ItemList> */}
          <ItemList>
            <Link to="/transactions/add">
              <IoMdAddCircleOutline />
            </Link>
          </ItemList>
          <ItemList>
            <Link to="/transactions">
              <FaRegListAlt />
            </Link>
          </ItemList>
          <ItemList>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </ItemList>
        </ul>
      </nav>
    </footer>
  );
};
function ItemList({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex size-9 items-center justify-center rounded-full border border-transparent p-1 transition-all duration-300 hover:-translate-y-0.5 hover:border-teal-300/30 hover:bg-teal-300/10 hover:text-teal-200">
      {children}
    </li>
  );
}
