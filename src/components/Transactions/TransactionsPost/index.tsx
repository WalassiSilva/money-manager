import { FormEvent, useEffect, useState } from "react";
import { BsTrash3Fill } from "react-icons/bs";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getCategories } from "../../../services-api";
import { CategoriesProps } from "../../../Types";

import { FaCalendarAlt } from "react-icons/fa";
import Calendar from "react-calendar";
import { baseUrl } from "../../../variables";
import { format } from "date-fns";
import { useUser } from "@clerk/clerk-react";
import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";

export const TransactionsPost = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState<number>(0);
  const [day, setDay] = useState<Date>(new Date());
  const [category_id, setCategory_id] = useState(1);
  const [type, setType] = useState(0);
  const [categories, setCategories] = useState<CategoriesProps[]>([]);
  const [showCalendar, setShowCalendar] = useState(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchGetCategories();
  }, []);
  const { user } = useUser();
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const data = { title, value, day, category_id, type, user_id: user?.id };

    setIsLoading(true);

    fetch(`${baseUrl}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(() => {
      console.log("Transaction Created");
      setIsLoading(false);
      navigate(-1);
    });
  };
  const handleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const handleCalendarChange = (date: Date) => {
    setDay(new Date(date));

    setShowCalendar(!showCalendar);
  };

  const fetchGetCategories = async () => {
    const data = await getCategories();
    setCategories(data);
  };

  return (
    <main className="w-full min-h-screen text-white bg-gray-900 flex flex-col gap-8 px-4 items-center">
      <header className="w-full my-2">
        <nav className="flex items-center justify-between">
          <button
            className="p-2 bg-gray-200 rounded-full text-gray-800 hover:scale-105"
            onClick={() => navigate(-1)}
          >
            <FaArrowLeft />
          </button>

          <h1 className="font-bold">Add Transaction</h1>

          <button className="hover:scale-105">
            <BsTrash3Fill />
          </button>
        </nav>
      </header>

      <form className="flex flex-col gap-3 sm:w-[40%]" onSubmit={handleSubmit}>
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
            placeholder="Title"
            required
            className="py-1 bg-gray-800 rounded-md border-none   pl-4"
          />
        </div>

        <div className="flex flex-col">
          <label className="font-bold" htmlFor="value">
            Value
          </label>
          <input
            id="value"
            type="number"
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            placeholder="0.00"
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
              value={format(day, "dd/MM/yyyy")}
              onChange={(e) => setDay(new Date(e.target.value))}
              className="py-1 bg-gray-800 rounded-md border-none  text-gray-400 pl-4 flex-1"
            />

            <button
              type="button"
              onClick={handleCalendar}
              tabIndex={0}
              className="relative flex justify-center items-center bg-gray-800 rounded-md w-8 hover:scale-110 duration-200 cursor-pointer "
            >
              <FaCalendarAlt />
            </button>
          </div>

          <div className="relative flex justify-center">
            {showCalendar && (
              <Calendar
                calendarType="gregory"
                onClickDay={handleCalendarChange}
                value={day}
                className="absolute p-0 left-0 duration-300 hover:daration-300 rounded-lg bg-gray-500 text-white"
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
              className="w-full bg-gray-700 rounded-md border-none capitalize pl-4"
            >
              {categories.map((category) => (
                <option
                  key={category.id}
                  value={category.id}
                  className="capitalize"
                >
                  {category.title}
                </option>
              ))}
            </select>
            <input
              readOnly
              tabIndex={-1}
              type="text"
              value={category_id}
              onChange={(e) => setCategory_id(Number(e.target.value))}
              className="py-1 bg-gray-800 text-gray-500 rounded-md border-node border-none w-8 text-center"
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

          {/* <select
            value={type}
            onChange={(e) => setType(Number(e.target.value))}
            className="py-1 bg-gray-700 rounded-md border-node   pl-4"
          >
            <option value="0">Expense</option>
            <option value="1">Income</option>
          </select> */}
        </div>
        {!isLoading ? (
          <input
            type="submit"
            value="Save"
            className={
              "py-2 cursor-pointer bg-gray-800 font-bold rounded-md hover:bg-slate-300 hover:text-gray-800 duration-200 active:bg-gray-500"
            }
          />
        ) : (
          <input
            disabled
            type="submit"
            value="Saving..."
            className={
              "py-2 cursor-wait opacity-50 bg-slate-300 text-gray-800 font-bold rounded-md hover:bg-gray-800 hover:text-white duration-200 active:bg-gray-500"
            }
          />
        )}
      </form>
    </main>
  );
};
