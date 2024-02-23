import { useEffect } from "react";
import { Header } from "../components/shared/Header";
import { CategoryBalance } from "../components/Categories/CategoryBalance";
import { LastTransactions } from "../components/Home/LastTransactions";

import { useDateContext } from "../context/GlobalProvider";
import { months } from "../utils";

const Home = () => {
  const { date, setDate } = useDateContext();
  const year = new Date(date).getFullYear();
  const month = new Date(date).getMonth();

  useEffect(() => {
    setDate(new Date(date).toISOString());
  }, [date]);


  return (
    <div className="bg-gray-900 text-white w-full h-screen flex flex-col gap-6 items-center overflow-scroll">
      <Header />
      <p>{months[month]}</p>
      <CategoryBalance year={year} month={month} />
      <LastTransactions date={date} setDate={setDate} />
    </div>
  );
};

export { Home }; 