import React, { useEffect, useState } from "react";
import { getAllTransactions, getTransactionsByMonth } from "../../../services-api";

import Calendar from "react-calendar";
import { TransactionsCard } from "../TransactionsCard";

interface TransactionsProps {
  id: number;
  title: string;
  value: number;
  day: string;
  category_id: string;
  type: number;
}
interface BalanceProps {
  incomes: number;
  expenses: number;
  result: number;
}

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

      monthData(date.getFullYear(), date.getMonth() + 1);

      // setTransactions(dataArray);
    };

    fetchAllTransactions();
  }, [date]);

  const monthData = async (year: string | number, month: string | number) => {
    const data = await getTransactionsByMonth(year, month);
    setTransactions(data.filterResult);
    setBalance(data?.balance);

  };
  

  const onChange = (date: Date) => {
    setDate(date);
  };

  return (
    <main className="w-full min-h-screen bg-gray-900 flex flex-col  px-4 items-center">
      <header>
        <Calendar className={"p-0 h-10 overflow-hidden duration-300 hover:duration-300 hover:h-[350px] rounded-lg "}
          view="year"
          onClickMonth={onChange}
          value={date} />
      </header>
      <article className="text-white w-full md:max-w-2xl">
        <div className="p-4">
          <h4 className="text-sm">Transactions: {transactions.length}</h4>
          <div className="flex justify-between">
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
            type={item.type}/>
          ))
        }
      </article>
    </main>
  );
};
