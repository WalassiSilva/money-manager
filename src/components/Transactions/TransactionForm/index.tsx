import React, { useEffect, useState } from "react";
import { BsTrash3Fill } from "react-icons/bs";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { getCategories, getTransactionById } from "../../../services-api";
import { CategoriesProps } from "../../../Types";

import { FaCalendarAlt } from "react-icons/fa";
import Calendar from "react-calendar";

export const TransactionForm = () => {

  const [title, setTitle] = useState("");
  const [value, setValue] = useState(0);
  const [day, setDay] = useState(new Date());
  const [category_id, setCategory_id] = useState(0);
  const [type, setType] = useState(0);
  const [categories, setCategories] = useState<CategoriesProps[]>([]);
  const idParam = useParams();
  const navigate = useNavigate();

  useEffect(() => {

    const fetchGetTransaction = async (id: number) => {
      const data = await getTransactionById(Number(id));
      setTitle(data.target.title);
      setValue(data.target.value);
      setDay(data.target.day);
      setCategory_id(data.target.category_id);
      setType(data.target.type);


    };

    const fetchGetCategories = async () => {
      const data = await getCategories();
      setCategories(data);
    };

    fetchGetTransaction(Number(idParam.id));
    fetchGetCategories();

  }, []);

  return (
    <main className="w-full min-h-screen text-white bg-gray-900 flex flex-col gap-8 px-4 items-center">
      <header className="w-full my-2">
        <nav className="flex items-center justify-between">

          <div className="p-2 bg-gray-200 rounded-full text-gray-800 hover:scale-105"
            onClick={() => navigate(-1)}>
            <FaArrowLeft />
          </div>

          <h1 className="font-bold">Edit Transaction</h1>

          <button><BsTrash3Fill /></button>
        </nav>
      </header>

      <form className="flex flex-col gap-3 ">
        <div className="flex flex-col">
          <label >Title</label>
          <input type="text"
            value={title} onChange={e => setTitle(e.target.value)}
            className="bg-gray-800 rounded-md border-none outline-none" />
        </div>

        <div className="flex flex-col">
          <label >Value</label>
          <input type="number"
            value={value} onChange={e => setValue(Number(e.target.value))}
            className="remove-arrow bg-gray-800 rounded-md border-none outline-none" />
        </div>

        <div className="flex flex-col">
          <label>Category</label>
          <div className="flex gap-1">
            <select
              value={category_id} onChange={e => setCategory_id(Number(e.target.value))}
              className="w-full bg-gray-700 rounded-md border-none outline-none" >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>{category.title}</option>
              ))}
            </select>
            <input readOnly type="text" value={category_id}
              className="bg-gray-800 rounded-md border-node outline-none w-8 text-center" />
          </div>
        </div>

        <div className="flex flex-col">
          <label >Type</label>
          <select
            value={type}
            onChange={e => setType(Number(e.target.value))}
            className="bg-gray-700 rounded-md border-node outline-none">
            <option value="0">Expense</option>
            <option value="1">Income</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label >
            Day
            <span className="text-sm text-slate-300">MM/DD/YYY</span>
          </label>
          <div className="flex gap-1">
            <input type="text" placeholder="Date"
              value={new Date(day).toLocaleDateString("pt-br")}
              onChange={e => setDay(day)}
              className="bg-gray-800 rounded-md border-none outline-none" />

            <button className="flex justify-center items-center bg-gray-800 rounded-md border-node outline-none w-8 "              
            ><FaCalendarAlt /></button>
          </div>

        </div>

        <input type="submit" value="Save"
          className={"cursor-pointer bg-gray-800 font-bold rounded-md hover:bg-slate-300 hover:text-gray-800 duration-200 active:bg-gray-500"} />

      </form>

    </main>
  );
};
