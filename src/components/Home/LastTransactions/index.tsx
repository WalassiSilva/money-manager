import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TransactionsCard } from "../../Transactions/TransactionsCard";
import { DateContextProps, TransactionsProps } from "../../../Types";
import { getTransactionsByMonth } from "../../../services-api";
import { format } from "date-fns";

const LastTransactions = ({ date }: DateContextProps) => {

  const [transactions, setTransactions] = useState<TransactionsProps[]>([]);

  useEffect(() => {
    fetchMonthData(new Date(date).getFullYear(), new Date(date).getMonth() + 1);
  }, [date, transactions.length]);

  const fetchMonthData = async (year: string | number, month: string | number) => {
    const data = await getTransactionsByMonth(year, month);
    setTransactions(data.filterResult.slice(0, 3));
    console.log(transactions);


  };
  return (
    <section className="sm:w-[50%] mb-10 bg-gray-800 rounded-lg ">
      <Link to="/transactions" className="">   
        <h2 className="text-center text-lg font-bold">LastTransactions</h2>     {transactions.length > 0
          ? transactions.map((item) => (
            <TransactionsCard key={Math.random()}
              id={item.id} title={item.title} value={item.value} day={format(item.day, "dd/MM/yyyy")} category_id={item.category_id} type={item.type} />
          ))
          : (
            <TransactionsCard id={0} title={"No transaction yet! 😢"} value={0} day={format(date, "dd/MM/yyyy")} category_id={"3"} type={1} />
          )}

      </Link>
    </section>
  );
};

export { LastTransactions };