import React from "react";
import { FaSearchDollar } from "react-icons/fa";

type InputSearchProps = {
  searchValue: string;
  handleInputSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearch: () => void;
  noResults?: boolean;
  shakeToken?: number;
};
export default function InputSearch({
  searchValue,
  handleInputSearch,
  handleSearch,
  noResults = false,
  shakeToken = 0,
}: InputSearchProps) {
  return (
    <div className="w-52 sm:w-[460px] lg:w-[700px] flex justify-center gap-2 my-4">
      <input
        className="glass-panel w-full rounded-lg px-4 py-2 placeholder:text-sm placeholder:text-slate-400 text-slate-100 outline-none focus:ring-2 focus:ring-teal-300/35"
        type="search"
        value={searchValue}
        onChange={handleInputSearch}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        placeholder="Search"
      />
      <button
        onClick={handleSearch}
        className="action-accent rounded-lg px-2 hover:scale-105 outline-none transition-all duration-150"
      >
        <FaSearchDollar
          key={shakeToken}
          fill="#e2e8f0"
          size={22}
          className={noResults ? "search-shake" : ""}
        />
      </button>
    </div>
  );
}
