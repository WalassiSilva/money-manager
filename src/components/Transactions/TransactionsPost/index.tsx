import { FormEvent, useEffect, useState } from "react";
import { BsTrash3Fill } from "react-icons/bs";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getCategories } from "../../../services-api";
import { CategoriesProps } from "../../../Types";

import { FaCalendarAlt } from "react-icons/fa";
import { FaRedo } from "react-icons/fa";
import Calendar from "react-calendar";
import { baseUrl } from "../../../variables";
import { format } from "date-fns";
import { useUser } from "@clerk/clerk-react";
import TransatcionTypeButton from "../../TransactionTyeButton";

const serializeDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const TransactionsPost = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState<number>(0);
  const [day, setDay] = useState<Date>(new Date());
  const [replicateByMonth, setReplicateByMonth] = useState(false);
  const [installments, setInstallments] = useState<number>(1);
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
    const safeInstallments = replicateByMonth
      ? Math.max(1, Math.floor(installments))
      : 1;

    const data = {
      title,
      value,
      day: serializeDate(day),
      category_id,
      type,
      installments: safeInstallments,
      user_id: user?.id,
    };

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
          <div className="flex items-center gap-3">
            <input
              id="value"
              type="number"
              value={value}
              onChange={(e) => setValue(Number(e.target.value))}
              placeholder="0.00"
              className={`px-4 w-full sm:w-40 ${
                type == 0 ? "text-rose-400" : "text-emerald-300"
              } py-1 remove-arrow bg-gray-800 rounded-md border-none`}
            />

            <button
              type="button"
              aria-pressed={replicateByMonth}
              onClick={() => {
                const next = !replicateByMonth;
                setReplicateByMonth(next);
                if (!next) setInstallments(1);
              }}
              className={`p-2 rounded-md transition-all duration-200 flex items-center justify-center ${
                replicateByMonth
                  ? "bg-teal-600/20 text-teal-300"
                  : "bg-gray-800 text-gray-400"
              }`}
              title="Replicate monthly"
            >
              <FaRedo />
            </button>

            <input
              id="installments"
              type="number"
              min={1}
              step={1}
              value={installments}
              onChange={(e) => setInstallments(Number(e.target.value))}
              disabled={!replicateByMonth}
              className={`w-16 py-1 px-2 bg-gray-800 rounded-md border-none text-center transition-all duration-300 ${
                replicateByMonth
                  ? "opacity-100 text-white"
                  : "opacity-20 text-gray-500"
              }`}
            />
          </div>
          <p className="text-xs text-gray-400 mt-1">
            1 = month now, 2 = now + next
          </p>
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
        <div className="flex flex-col sm:flex-row sm:items-end sm:gap-4">
          <div className="flex-1">
            <label className="font-bold" htmlFor="category">
              Category
            </label>
            <select
              id="category"
              value={category_id}
              onChange={(e) => setCategory_id(Number(e.target.value))}
              className="w-full bg-gray-700 rounded-md border-none capitalize pl-4 py-1"
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
          </div>

          <div className="w-full sm:w-auto">
            <label className="font-bold block mb-1">Type</label>
            <TransatcionTypeButton
              currentType={type}
              switchType={() => setType(type === 0 ? 1 : 0)}
            />
          </div>
        </div>

        {/* </div> */}
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
