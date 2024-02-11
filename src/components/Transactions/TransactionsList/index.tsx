import React, { useEffect, useState } from "react";
import { getTransactionsByMonth } from "../../../services-api";

import Calendar from "react-calendar";
import { TransactionsCard } from "../TransactionsCard";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { BalanceProps, TransactionsProps } from "../../../Types";
import { ScrollUpButton } from "../../ScrollUpButton";
import { useDateContext } from "../../../context/GlobalProvider";



export const TransactionsList = () => {
  const [transactions, setTransactions] = useState<TransactionsProps[]>([]);
  const [balance, setBalance] = useState<BalanceProps>();
  const { date, setDate } = useDateContext();

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

    fetchMonthData(new Date(date).getFullYear(), new Date(date).getMonth() + 1);

  }, [date, transactions.length]);

  const fetchMonthData = async (year: string | number, month: string | number) => {
    const data = await getTransactionsByMonth(year, month);
    setTransactions(data.filterResult);
    setBalance(data?.balance);
  };

  const onChange = (date: Date) => {
    setDate(date.toDateString());
  };

  // const formatDate = (date: Date) => {
  //   const d = new Date(date).getUTCDate().toString().padStart(2, "0");
  //   const m = (new Date(date).getUTCMonth() + 1).toString().padStart(2, "0");
  //   const y = new Date(date).getUTCFullYear().toString();
  //   return `${d}/${m}/${y}`;
  // };

  return (
    <main className="relative overflow-auto w-full min-h-screen mb-8 bg-gray-900 flex flex-col py-1 px-1 items-center">
      <header className="">

        <Link to={"/"}>
          <FaArrowLeft
            className="m-2 cursor-pointer text-white fixed left-1 hover:scale-105 top-3" />
        </Link>
        <Calendar
          className={"w-56 p-0 h-10 overflow-hidden duration-300 hover:duration-300 hover:h-[250px] rounded-lg bg-gray-500 text-white "}
          view="year"
          onClickMonth={onChange}
          value={date}
        />
      </header>
      <article className=" text-white w-full md:max-w-2xl">
        <div className="p-4">
          <h4 className="text-sm text-center">Transactions: {transactions.length}</h4>
          <div className="flex justify-between text-center">
            <div className="text-green-300">
              <p >Incomes:</p>
              <p>{monetaryValue(balance?.incomes as number)}</p>
            </div>
            <div className="text-red-500">
              <p>Expenses:  </p>
              <p>{monetaryValue(balance?.expenses as number)}</p>
            </div>
            <div className={`${(balance?.result as number > 0) ? "text-green-300" : "text-red-500"}`}>
              <p>Balance:</p>
              <p> {monetaryValue(balance?.result as number)}</p>
            </div>

          </div>
        </div>
        {
          transactions.length > 0 ?
            transactions.map((item) => (
              <Link to={`/transactions/${item.id}`} key={Math.random()}>
                <TransactionsCard
                  id={item.id}
                  title={item.title}
                  value={item.value}
                  day={(item.day)}
                  category_id={item.category_id}
                  type={item.type} />
              </Link>
            ))
            : <h2 className="flex justify-center font-bold">No transaction yet! 😢</h2>
        }
      </article>
      <ScrollUpButton />
    </main>
  );
};
