import React from "react";
import { FaSearchDollar } from "react-icons/fa";

type InputSearchProps = {
  searchValue: string;
  handleInputSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearch: () => void;
}
export default function InputSearch({
  searchValue,
  handleInputSearch,
  handleSearch,
}: InputSearchProps) {
  return (
    <div className="w-48 sm:w-[400px] lg:w-[640px] flex justify-center gap-2 my-4">
      <input
        className="w-full rounded-md px-4 py-1 placeholder:text-sm outline-none"
        type="search"
        value={searchValue}
        onChange={handleInputSearch}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        placeholder="Search"
      />
      <button
        onClick={handleSearch}
        className=" hover:scale-105 top-3 outline-none hover:animate-bounce active:animate-bounce focus:animate-bounce"
      >
        <FaSearchDollar fill="white" size={24} />
      </button>
    </div>
  );
}
