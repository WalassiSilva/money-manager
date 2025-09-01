import { useEffect } from "react";
import { Header } from "../components/shared/Header";
import { CategoryBalance } from "../components/Categories/CategoryBalance";
import { LastTransactions } from "../components/Dashboard/LastTransactions";

import { useDateContext } from "../context/GlobalProvider";
import { months } from "../utils";
import { Patrimony } from "../components/Dashboard/Patrimony";

const Dashboard = () => {
  const { date, setDate } = useDateContext();

  const year = new Date(date).getFullYear();
  const month = new Date(date).getMonth();

  useEffect(() => {
    setDate(new Date(date).toISOString());
  }, [date]);

  return (
    <div className="bg-gray-900 text-white w-full min-h-screen flex flex-col gap-6 items-center ">
      <Header />

      <p className="font-bold underline">{months[month]}</p>
      <Patrimony />
      <div className="lg:flex w-full lg:w-3/4">
        <CategoryBalance year={year} month={month} />
        <LastTransactions date={date} setDate={setDate} />
      </div>
    </div>
  );
};

export { Dashboard };
