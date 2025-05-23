import React, { useEffect, useState } from "react";
import { BsTrash3Fill } from "react-icons/bs";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteTransaction,
  getCategories,
  getTransactionById,
  getUserID,
} from "../../../services-api";
import { CategoriesProps } from "../../../Types";
import { FaPencilAlt } from "react-icons/fa";

import { FaCalendarAlt } from "react-icons/fa";
import Calendar from "react-calendar";
import { baseUrl } from "../../../variables";
import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";

export const TransactionsUpdate = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState(0);
  const [day, setDay] = useState(new Date());
  const [category_id, setCategory_id] = useState(0);
  const [type, setType] = useState(0);
  const [categories, setCategories] = useState<CategoriesProps[]>([]);
  const [showCalendar, setShowCalendar] = useState(false);
  const idParam = useParams();
  const navigate = useNavigate();
  const user_id = getUserID();

  useEffect(() => {
    if (!idParam.id) return;
    fetchGetTransaction(idParam.id);
    fetchGetCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = { title, value, day, category_id, type };

    fetch(`${baseUrl}/${idParam.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(() => {
      console.log("Trascaction Updated");
      navigate(-1);
    });
  };
  const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target as HTMLInputElement;
    setDay(new Date(value));
  };

  const handleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const handleCalendarChange = (date: Date) => {
    setDay(new Date(date));
    setShowCalendar(!showCalendar);
  };

  const fetchGetTransaction = async (id: string) => {
    const data = await getTransactionById(id, user_id);

    setTitle(data.transaction.title);
    setValue(data.transaction.value);
    setDay(data.transaction.day);
    setCategory_id(data.transaction.category_id);
    setType(data.transaction.type);
  };

  const fetchGetCategories = async () => {
    const data = await getCategories();
    setCategories(data);
  };

  const handleDelete = async (id: string | undefined) => {
    if (!id) return;
    const check = confirm("Deletar transação?");
    if (check) {
      await deleteTransaction(id, user_id);
      navigate(-1);
    } else return;
  };

  const formatDate = (date: Date) => {
    const d = new Date(date).getUTCDate().toString().padStart(2, "0");
    const m = (new Date(date).getUTCMonth() + 1).toString().padStart(2, "0");
    const y = new Date(date).getUTCFullYear().toString();
    return `${d}/${m}/${y}`;
  };
  return (
    <main className="overflow-scroll w-full min-h-screen text-white bg-gray-900 flex flex-col gap-8 px-4 items-center">
      <header className="w-full my-2">
        <nav className="flex items-center justify-between">
          <button
            className="p-2 bg-gray-200 rounded-full text-gray-800 hover:scale-105"
            onClick={() => navigate(-1)}
          >
            <FaArrowLeft />
          </button>

          <h1 className="font-bold flex gap-2">
            {" "}
            <FaPencilAlt />
            Edit Transaction
          </h1>

          <button
            className="p-2 bg-gray-200 rounded-full text-gray-800 hover:scale-105"
            onClick={() => handleDelete(idParam.id)}
          >
            <BsTrash3Fill />
          </button>
        </nav>
      </header>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:w-[40%] ">
        <div className="flex flex-col">
          <label className="font-bold" htmlFor="title">
            Title
          </label>
          <input
            id="title"
            type="text"
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="py-1 bg-gray-800 rounded-md border-none  pl-4"
          />
        </div>

        <div className="flex flex-col">
          <label>Value</label>
          <input
            id="value"
            type="text"
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            placeholder="Value"
            className={`px-4 ${
              type == 0 ? "text-red-600" : "text-green-600"
            } "py-1 remove-arrow bg-gray-800 rounded-md border-none " `}
          />
        </div>

        <div className="flex flex-col">
          <label className="font-bold" htmlFor="day">
            Day
            <span className="text-sm text-gray-500"> dd/MM/yyyy</span>
          </label>
          <div className="flex justify-between gap-1">
            <input
              id="day"
              type="text"
              placeholder="Date"
              readOnly
              tabIndex={-1}
              onClick={handleCalendar}
              value={formatDate(day)}
              onChange={handleDayChange}
              className="py-1 bg-gray-800 rounded-md border-none  text-gray-400 pl-4 flex-1"
            />

            <button
              type="button"
              tabIndex={0}
              onClick={handleCalendar}
              className=" relative flex justify-center items-center bg-gray-800 rounded-md border-none  w-8 cursor-pointer hover:scale-110 duration-200"
            >
              <FaCalendarAlt />
            </button>
          </div>
          <div className="relative flex justify-center">
            {showCalendar === true && (
              <Calendar
                className=" absolute p-0 left-auto  duration-300 hover:duration-300 rounded-lg bg-gray-500 text-white "
                calendarType="gregory"
                locale="en"
                onClickDay={handleCalendarChange}
                value={day}
              />
            )}
          </div>
        </div>
        <div className="flex flex-col">
          <label className="font-bold" htmlFor="category">
            Category
          </label>
          <div className="flex gap-1">
            <select
              id="category"
              value={category_id}
              onChange={(e) => setCategory_id(Number(e.target.value))}
              className="w-full bg-gray-700 rounded-md border-none  pl-4"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.title}
                </option>
              ))}
            </select>
            <input
              readOnly
              tabIndex={-1}
              type="text"
              value={category_id}
              className="py-1 bg-gray-800 rounded-md border-node  w-8 text-center"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label className="font-bold">Type</label>
          <div className="flex gap-4 justify-between w-full">
            <button
              type="button"
              onClick={() => setType(Number("0"))}
              className={`${type == 0 ? "border rounded-lg" : ""} group`}
            >
              <span className="flex gap-2 px-4 py-2  rounded-lg items-center bg-red-500">
                Expenses{" "}
                <FaArrowTrendDown className="group-hover:text-red-800 group-hover:duration-300" />
              </span>
            </button>

            <button
              type="button"
              onClick={() => setType(Number("1"))}
              className={`${type == 1 ? "border rounded-lg" : ""} group`}
            >
              <span className="flex gap-2 px-4 py-2 items-center rounded-lg  bg-green-500 transition-colors duration-300">
                Incomes{" "}
                <FaArrowTrendUp className="group-hover:text-emerald-800 group-hover:duration-300" />
              </span>
            </button>
          </div>
        </div>

        <input
          type="submit"
          value="Save"
          className={
            "py-2 cursor-pointer bg-gray-800 font-bold rounded-md hover:bg-slate-300 hover:text-gray-800 duration-200 active:bg-gray-500"
          }
        />
      </form>
    </main>
  );
};
