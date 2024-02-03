import React, { useEffect, useState } from "react";
import { getAllTransactions, getTransactionsByMonth } from "../../../services-api";

import Calendar from "react-calendar";
import { TransactionsCard } from "../TransactionsCard";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { BalanceProps, TransactionsProps } from "../../../Types";



export const TransactionsList = () => {
  const [transactions, setTransactions] = useState<TransactionsProps[]>([]);
  const [balance, setBalance] = useState<BalanceProps>();
  const [date, setDate] = useState(new Date());

  const monetaryValue = (value: number) => {
    if (value) {
      const format = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(value);
      return format;
    } else return 0;
  };

  useEffect(() => {

    const fetchAllTransactions = async () => {
      const fetchData = await getAllTransactions();
      const dataArray = fetchData.filterResult;

      fetchMonthData(date.getFullYear(), date.getMonth() + 1);

      // setTransactions(dataArray);
    };

    fetchAllTransactions();
  }, [date]);

  const fetchMonthData = async (year: string | number, month: string | number) => {
    const data = await getTransactionsByMonth(year, month);
    setTransactions(data.filterResult);
    setBalance(data?.balance);

  };


  const onChange = (date: Date) => {
    setDate(date);
  };

  return (
    <main className="relative w-full min-h-screen bg-gray-900 flex flex-col  px-4 items-center">
      <header className="">
        
      <Link to={"/"}><FaArrowLeft className="m-2 cursor-pointer text-white fixed left-1 hover:scale-105 top-4" /></Link>
        <Calendar className={"p-0 h-10 overflow-hidden duration-300 hover:duration-300 hover:h-[350px] rounded-lg "}
          view="year"
          onClickMonth={onChange}
          value={date} />
      </header>
      <article className=" text-white w-full md:max-w-2xl">
        <div className="p-4">
          <h4 className="text-sm">Transactions: {transactions.length}</h4>
          <div className="flex justify-between text-center">
            <p className="text-green-300">Incomes: {monetaryValue(balance?.incomes as number)} </p>
            <p className="text-red-500">Expenses: {monetaryValue(balance?.expenses as number)} </p>
            <p className={`${(balance?.result as number > 0) ? "text-green-300" : "text-red-500"}`}>Balance: {monetaryValue(balance?.result as number)}</p>

          </div>
        </div>
        {
          transactions.map((item) => (
            <TransactionsCard key={Math.random()}
              id={item.id}
              title={item.title}
              value={item.value}
              day={item.day}
              category_id={item.category_id}
              type={item.type} />
          ))
        }
      </article>
    </main>
  );
};
