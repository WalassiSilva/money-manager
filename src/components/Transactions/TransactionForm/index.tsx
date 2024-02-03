import React, { useEffect, useRef, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { BsTrash3Fill } from "react-icons/bs";
import { TransactionsProps } from "../TransactionsList";
import { api, updateTransaction } from "../../../services-api";

import { useParams } from "react-router-dom";
import { baseUrl } from "../../../variables";

export const TransactionForm: React.FC<TransactionsProps> = ({ title, day, value, category_id, type }) => {

  const titleRef = useRef<HTMLInputElement | null>(null);
  const valueRef = useRef<HTMLInputElement | null>(null);
  // const [title, setTitle] = useState<HTMLInputElement | null>();
  // const [value, setValue] = useState<HTMLInputElement | null>();

  // const {id} = useParams();

  useEffect(() => {


    // fetchUpdateTransaction(55);
  }, []);

  // const fetchUpdateTransaction = async (id: number, data) => {
  //   const dataFetch = await updateTransaction((id, data) => {
  //     {data; }

  //   });
  // };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(titleRef?.current?.value);
    console.log(valueRef?.current?.value);

  };

  return (
    <main className="w-full min-h-screen text-white bg-gray-900 flex flex-col gap-8 px-4 items-center">
      <header className=" w-full">
        <nav className="flex items-center justify-between">
          <FaArrowLeft />
          <p className="">Edit Transaction</p>
          <BsTrash3Fill />
        </nav>
      </header>
      <div className="flex flex-col items-center justify-between">
        <p >$500 {value}</p>
        <p>Category{category_id}</p>
        <p>type {type}</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-3 ">

          <input
            type="text"
            value={title}
            className="bg-gray-800 rounded-md border-node outline-none" />
          <input
            type="text"
            value={day}
            className="bg-gray-800 rounded-md border-node outline-none" />

          <input
            type="submit"
            value="Save"
            className="cursor-pointer bg-slate-300 text-gray-800 font-bold rounded-md hover:bg-gray-800 hover:text-white duration-200 active:bg-gray-500" />
        </div>
      </form>

    </main>
  );
};
