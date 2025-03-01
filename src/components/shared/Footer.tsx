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
          <li className="hover:scale-110 duration-500 hover:bg-white hover:text-black rounded-full p-1  ">
            <Link to="/" className="underline">
              <MdOutlineHome />
            </Link>
          </li>

          <li className="hover:scale-110 duration-500 hover:bg-white hover:text-black rounded-full p-1 ">
            <Link to="/transactions/categories">
              <FaChartPie />
            </Link>
          </li>
          <li className="hover:scale-110 duration-500 hover:bg-white hover:text-black rounded-full p-1 ">
            <Link to="/transactions/add">
              <IoMdAddCircleOutline />
            </Link>
          </li>
          <li className="hover:scale-110 duration-500 hover:bg-white hover:text-black rounded-full p-1 ">
            <Link to="/transactions">
              <FaRegListAlt />
            </Link>
          </li>
          <li className="">
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </li>
        </ul>
      </nav>
    </footer>
  );
};
