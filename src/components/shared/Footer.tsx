import { Link } from "react-router-dom";

import { MdOutlineHome } from "react-icons/md";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaChartPie, FaRegListAlt } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="flex items-center shrink-0 fixed py-3 bottom-0 w-full text-white bg-black ">
      <nav className="w-full ">
        <ul className="  flex justify-around text-2xl ">
          <li className="hover:scale-110 duration-500 hover:bg-white hover:text-black rounded-full p-1  ">
            <Link to="/" className="underline">
              <MdOutlineHome />
            </Link>
          </li>
          <li className="hover:scale-110 duration-500 hover:bg-white hover:text-black rounded-full p-1 ">
            <Link to="/transactions/add">
              <IoMdAddCircleOutline />
            </Link>
          </li>
          <li className="hover:scale-110 duration-500 hover:bg-white hover:text-black rounded-full p-1 ">
            <Link to="/transactions/categories">
              <FaChartPie />
            </Link>
          </li>
          <li className="hover:scale-110 duration-500 hover:bg-white hover:text-black rounded-full p-1 ">
            <Link to="/transactions">
              <FaRegListAlt />
            </Link>
          </li>          
        </ul>
      </nav>
    </footer>
  );
};
