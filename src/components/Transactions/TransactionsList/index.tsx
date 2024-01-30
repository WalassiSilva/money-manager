import React, { useEffect, useState } from "react";
import { getAllTransactions, getTransactionsByMonth } from "../../../services-api";
import { Link } from "react-router-dom";
import { FaHome,FaBus } from "react-icons/fa";
import { MdHealthAndSafety } from "react-icons/md";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { MdFastfood } from "react-icons/md";
import { GiTakeMyMoney } from "react-icons/gi";
import { GiReceiveMoney } from "react-icons/gi";
import { IoBuild } from "react-icons/io5";

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

const TransactionsList = () => {
  const [transactions, setTransactions] = useState<TransactionsProps[]>([]);
  const [balance, setBalance] = useState<BalanceProps>();
  const [resultsLength, setResultsLength] = useState(0);

  const monetaryValue = (value: number) => {
    const format = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
    return format;
  };

  useEffect(() => {

    const fetchAllTransactions = async () => {
      const fetchData = await getAllTransactions();
      const dataArray = fetchData.filterResult;
      setResultsLength(fetchData.resultsFinded);

      monthData(2024, 1);

      // setTransactions(dataArray);
    };

    fetchAllTransactions();
  }, []);

  const monthData = async (year: string | number, month: string | number) => {
    const data = await getTransactionsByMonth(year, month);
    setTransactions(data.filterResult);
    setBalance(data?.balance);
  };
  return (
    <div className="w-full min-h-screen bg-gray-900 flex justify-center px-4">
      <article className="text-white w-full md:max-w-2xl">
        <div className="p-4">
          <h4 className="text-sm">Transactions: {transactions.length}</h4>
          <div className="flex justify-between">
            <p className="text-green-300">Incomes: R$ {balance?.incomes} </p>
            <p className="text-red-500">Expenses: R$ {balance?.expenses} </p>
            <p className={`${(balance?.result > 0) ? "text-green-300" : "text-red-500"}`}>Balance: R$ {balance?.result}</p>

          </div>
        </div>
        {
          transactions.map((item) => (
            <Link to={"#"} key={Math.random()} className="bg-gray-600 m-4 p-4 rounded-xl flex ">
              <div className="flex items-center justify-center m-3 ml-0"
              >{item.category_id}
              </div>

              <div className="flex-1">
                <h2 className="font-bold text-lg capitalize">{item.title}</h2>
                <div>{new Date(item.day).toLocaleDateString("pt-br")}</div>
              </div>

              <div className={`${item.type !== 0 ? "text-green-300" : "text-red-500"} font-bold`}>{monetaryValue(item.value)}</div>
            </Link >
          ))
        }
      </article>
    </div>
  );
};

export { TransactionsList };