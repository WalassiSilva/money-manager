import { Link } from "react-router-dom";

import { MdOutlineHome } from "react-icons/md";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaChartPie, FaRegListAlt } from "react-icons/fa";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

export const Footer = () => {
  return (
    <footer className="flex items-center sticky py-3 bottom-0 w-full text-white bg-black">
      <nav className="w-full ">
        <ul className="  flex justify-around lg:justify-center lg:gap-10 text-2xl ">
          <ItemList>
            <Link to="/" className="underline">
              <MdOutlineHome />
            </Link>
          </ItemList>

          <ItemList>
            <Link to="/transactions/categories">
              <FaChartPie />
            </Link>
          </ItemList>
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
    <li className="flex items-center justify-center hover:scale-110 duration-500 hover:bg-white hover:text-black rounded-full p-1 size-8">
      {children}
    </li>
  );
}
