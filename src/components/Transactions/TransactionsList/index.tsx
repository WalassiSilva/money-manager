import { useEffect, useState } from "react";
import { getTransactionsByMonth, getTransactionsByTitle } from "../../../services-api";

import Calendar from "react-calendar";
import { TransactionsCard } from "../TransactionsCard";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { BalanceProps, TransactionsProps } from "../../../Types";
import { ScrollUpButton } from "../../ScrollUpButton";
import { useDateContext } from "../../../context/GlobalProvider";
import { SearchHeader } from "../../Search/SearchHeader";
import { monetaryValue } from "../../../utils";


export const TransactionsList = () => {
  const [transactions, setTransactions] = useState<TransactionsProps[]>([]);
  const [balance, setBalance] = useState<BalanceProps>();
  const { date, setDate } = useDateContext();
  const [searchResults, setSearchResults] = useState<TransactionsProps[]>([]);
  const [searchSum, setSearchSum] = useState(0);
  const [searchValue, setSearchValue] = useState("");


  useEffect(() => {

    fetchMonthData(new Date(date).getFullYear(), new Date(date).getMonth() + 1);


  }, [date, transactions.length, searchResults]);

  const fetchMonthData = async (year: string | number, month: string | number) => {
    const data = await getTransactionsByMonth(year, month);
    setTransactions(data.filterResult);
    setBalance(data?.balance);
  };

  const clearSearch = () => {
    setSearchResults([]);
    setSearchValue("");
  };

  const onChange = (date: Date) => {
    setDate(date.toDateString());
  };
  const handleSearch = () => {
    if (!searchValue) return;

    const fetchSearch = async (title: string) => {
      const data = await getTransactionsByTitle(title);
      setSearchResults(data.filterResult);
      setSearchSum(data.totalValue);
    };
    fetchSearch(searchValue);
  };
  const handleInputSearch = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <main className="relative overflow-auto w-full min-h-screen mb-8 bg-gray-900 flex flex-col py-1 px-1 items-center">
      <header className="">

        <Link to={"/"}>
          <FaArrowLeft
            className="m-2 cursor-pointer text-white fixed left-1 hover:scale-105 top-3" />
        </Link>
        <div className="sm:absolute sm:right-3 sm:top-3 sm:flex sm:gap-2 sm:my-0 flex justify-center gap-2 my-4 static">
          <button onClick={clearSearch} className=" hover:scale-105 top-3">❌</button>
          <input className="  w-36 rounded-md px-1"
            type="text" value={searchValue} onChange={handleInputSearch} placeholder="Search transaction" />
          <button onClick={handleSearch} className=" hover:scale-105 top-3" >🔍</button>
        </div>
        <Calendar
          className={"w-56 p-0 h-10 overflow-hidden duration-300 hover:duration-300 hover:h-[250px] rounded-lg bg-gray-500 text-white "}
          view="year"
          onClickMonth={onChange}
          value={date}
        />
      </header>

      <section className=" text-white w-full md:max-w-2xl">

        {searchResults.length !== 0
          ? <SearchHeader resultsLength={searchResults.length} searchSum={monetaryValue(searchSum)} />
          :
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
        }
        {searchResults.length !== 0 ? (

          searchResults.map((item) => (
            <Link to={`/transactions/${item.id}`} key={Math.random()}>
              <TransactionsCard id={item.id} title={item.title} value={item.value} category_id={item.category_id} day={item.day} type={item.type} />
            </Link>
          ))
        ) : transactions.length > 0 ?
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

      </section>

      <ScrollUpButton />
    </main>
  );
};
