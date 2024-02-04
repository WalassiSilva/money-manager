import React, { useEffect, useRef, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { BsTrash3Fill } from "react-icons/bs";
import { api, updateTransaction } from "../../../services-api";

import { Link, useNavigate, useParams } from "react-router-dom";
import { baseUrl } from "../../../variables";
import { TransactionsProps } from "../../../Types";
import { TransactionsPost } from "../TransactionsPost";

export const TransactionForm: React.FC<TransactionsProps> = ({ title, day, value, category_id, type }) => {

  const navigate = useNavigate();

  const titleRef = useRef<HTMLInputElement | null>(null);
  const valueRef = useRef<HTMLInputElement | null>(null);
  // const [title, setTitle] = useState<HTMLInputElement | null>();
  // const [value, setValue] = useState<HTMLInputElement | null>();

  // const {id} = useParams();

  useEffect(() => {
    updateTransaction(200);

    // fetchUpdateTransaction(55);
  }, []);

  // const fetchUpdateTransaction = async (id: number, data) => {
  //   const dataFetch = await updateTransaction((id, data) => {
  //     {data; }

  //   });
  // };
  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   console.log(titleRef?.current?.value);
  //   console.log(valueRef?.current?.value);
  // };



  // const handleDelete = (id: number,) => {
  //   fetch(`${baseUrl}/${id}`, {
  //     method: "DELETE"
  //   }).then(() => {
  //     navigate(-1);
  //   });
  // };

  const handleDelete = (id, e) => {
    api.delete(`${baseUrl}/${id}`)
      .then((response) => {
        console.log(response);

      });
  };

  return (
    <main className="w-full min-h-screen text-white bg-gray-900 flex flex-col gap-8 px-4 items-center">
      <header className=" w-full my-2 ">
        <nav className="flex items-center justify-between">

          <div className="p-2 bg-gray-200 rounded-full text-gray-800 hover:scale-105 ">
            <Link to={"/"}><FaArrowLeft /></Link>
          </div>

          <p className="font-bold">Add Transaction</p>
          <button onClick={() => handleDelete(392)}
            className="p-2 bg-gray-200 rounded-full text-gray-800 hover:scale-105">
            <BsTrash3Fill />
          </button>
        </nav>
      </header>
      <div className="flex flex-col items-center justify-between">
      </div>

      <form
      // onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-3 [&>*]:px-4">

          <label >Titulo</label>
          <input
            type="text"
            value={title}
            // onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="bg-gray-800 rounded-md border-none outline-none" />

          <label >Value</label>
          <input type="number"
            placeholder="R$ 500"
            value={value}
            // onChange={(e) => setValue(Number(e.target.value))}
            className="remove-arrow bg-gray-800 rounded-md border-node outline-none" />

          <label >Category</label>
          <div className="flex px-[-1rem] w-full">

            <select
              value={category_id}
              // onChange={(e) => setCagetory_id(Number(e.target.value))}
              className="w-20 bg-gray-700 rounded-md border-node outline-none flex-1 p-0 ml-[-16px] " >
              {
                // categories.map((item) => (
                //   <option key={item.id} value={item.id}>{item.title}</option>
                // ))
              }
            </select>
            <input type="number" readOnly
              placeholder="Category"
              value={category_id}
              // onChange={(e) => setCagetory_id(Number(e.target.value))}
              className=" remove-arrow bg-gray-800 rounded-md border-node outline-none w-8 text-center ml-4 mr-[-16px]" />
          </div>


          <label >Type</label>
          <select
            value={type}
            // onChange={(e) => setType(Number(e.target.value))}
            className="bg-gray-700 rounded-md border-node outline-none"  >
            <option value="0">Expense</option>
            <option value="1">Income</option>
          </select>

          <label >Date  <span className="text-slate-300 text-sm">MM/dd/YYYY</span></label>
          <input
            type="text"
            value={day}
            // onChange={(e) => setDay(e.target.value)}
            placeholder="Date"
            className="bg-gray-800 rounded-md border-node outline-none" />

          <input
            type="submit"
            value="Save"
            className={"cursor-pointer bg-slate-300 text-gray-800 font-bold rounded-md hover:bg-gray-800 hover:text-white duration-200 active:bg-gray-500"} />

          {/* {!isLoading ? (
            <input
              type="submit"
              value="Save"
              className={"cursor-pointer bg-slate-300 text-gray-800 font-bold rounded-md hover:bg-gray-800 hover:text-white duration-200 active:bg-gray-500"} />
          ) : (
            <input disabled
              type="submit"
              value="Saving..."
              className={"cursor-wait opacity-50 bg-slate-300 text-gray-800 font-bold rounded-md hover:bg-gray-800 hover:text-white duration-200 active:bg-gray-500"} />
          )} */}


        </div>
      </form>

    </main>

    // <main className="w-full min-h-screen text-white bg-gray-900 flex flex-col gap-8 px-4 items-center">
    //   <header className=" w-full">
    //     <nav className="flex items-center justify-between">
    //       <FaArrowLeft />
    //       <p className="">Edit Transaction</p>
    //       <BsTrash3Fill />
    //     </nav>
    //   </header>
    //   <div className="flex flex-col items-center justify-between">
    //     <p >$500 {value}</p>
    //     <p>Category{category_id}</p>
    //     <p>type {type}</p>
    //   </div>

    //   <form onSubmit={handleSubmit}>
    //     <div className="flex flex-col gap-3 ">

    //       <input
    //         type="text"
    //         value={title}
    //         className="bg-gray-800 rounded-md border-node outline-none" />
    //       <input
    //         type="text"
    //         value={day}
    //         className="bg-gray-800 rounded-md border-node outline-none" />

    //       <input
    //         type="submit"
    //         value="Save"
    //         className="cursor-pointer bg-slate-300 text-gray-800 font-bold rounded-md hover:bg-gray-800 hover:text-white duration-200 active:bg-gray-500" />
    //     </div>
    //   </form>

    // </main>
  );
};
