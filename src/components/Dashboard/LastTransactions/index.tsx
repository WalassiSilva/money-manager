import { useEffect, useState } from "react";
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

  const fetchMonthData = async (
    year: string | number,
    month: string | number
  ) => {
    const data = await getTransactionsByMonth(year, month);
    setTransactions(data.data.slice(0, 3));
  };

  return (
    <section className="sm:w-[60%] w-[90%] mb-10 bg-gray-800 rounded-lg ">
      <Link to="/transactions" className="">
        <h2 className="text-center text-lg font-bold mt-4">
          Last Transactions
        </h2>{" "}
        {transactions.length > 0 ? (
          transactions.map((item) => (
            <TransactionsCard
              key={Math.random()}
              id={item.id}
              title={item.title}
              value={item.value}
              category_id={item.category_id}
              type={item.type}
              day={item.day}
            />
          ))
        ) : (
          <TransactionsCard
            id={0}
            title={"No transaction yet! 😢"}
            value={0}
            day={format(date, "MM/dd/yyyy")}
            category_id={"3"}
            type={1}
          />
        )}
      </Link>
    </section>
  );
};

export { LastTransactions };
