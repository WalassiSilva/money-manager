import { useEffect, useState } from "react";
import {
  getTransactionsByMonth,
  getTransactionsByTitle,
  getUserID,
  getCategories,
} from "../../../services-api";

import { TransactionsCard } from "../TransactionsCard";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { FaLayerGroup } from "react-icons/fa";
import { BalanceProps, TransactionsProps } from "../../../Types";
import { ScrollUpButton } from "../../ScrollUpButton";
import { useDateContext } from "../../../context/GlobalProvider";
import { SearchHeader } from "../../Search/SearchHeader";
import { monetaryValue } from "../../../utils";
import { Header } from "../../shared/Header";
import { MonthlyBalance } from "../../Dashboard/MonthlyBalance";
import InputSearch from "../InputSearch";
import ItemSearch from "../TransactionsGroupedByName";

export const TransactionsList = () => {
  const [transactions, setTransactions] = useState<TransactionsProps[]>([]);
  const [searchResults, setSearchResults] = useState<TransactionsProps[]>([]);
  const [searchSum, setSearchSum] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [searchAttempted, setSearchAttempted] = useState(false);
  const [searchAttemptToken, setSearchAttemptToken] = useState(0);
  const [balance, setBalance] = useState<BalanceProps>({
    incomes: 0,
    expenses: 0,
    result: 0,
  });
  const user_id = getUserID();
  const [sortByCategory, setSortByCategory] = useState(false);
  const [categoriesList, setCategoriesList] = useState<
    Array<{ id: number; title: string }>
  >([]);

  const { date } = useDateContext();

  const groupedTransactions = transactions.reduce((acc, transaction) => {
    const categoryKey = String(transaction.category_id || "uncategorized");

    if (!acc.has(categoryKey)) {
      acc.set(categoryKey, []);
    }

    acc.get(categoryKey)!.push(transaction);
    return acc;
  }, new Map<string, TransactionsProps[]>());

  const groupedEntries = Array.from(groupedTransactions.entries()).sort(
    (a, b) => {
      const aTitle =
        categoriesList.find((category) => String(category.id) === a[0])
          ?.title || a[0];
      const bTitle =
        categoriesList.find((category) => String(category.id) === b[0])
          ?.title || b[0];

      return aTitle.localeCompare(bTitle);
    },
  );

  useEffect(() => {
    fetchMonthData(new Date(date).getFullYear(), new Date(date).getMonth() + 1);
    fetchCategories();
  }, [date, transactions.length, searchResults]);

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategoriesList(data || []);
    } catch (err) {
      setCategoriesList([]);
    }
  };

  const fetchMonthData = async (
    year: string | number,
    month: string | number,
  ) => {
    const data = await getTransactionsByMonth(year, month, user_id);
    setTransactions(data.data);
    setBalance(data?.balance);
  };

  const handleSearch = () => {
    if (!searchValue) return;

    setSearchAttempted(true);
    setSearchAttemptToken((current) => current + 1);

    const fetchSearch = async (title: string) => {
      const data = await getTransactionsByTitle(title, user_id);
      setSearchResults(data.data);
      setSearchSum(data.totalValue);
    };
    fetchSearch(searchValue);
  };
  const handleInputSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchAttempted(false);
    setSearchValue(e.target.value);
  };

  return (
    <main className="relative overflow-auto w-full min-h-screen flex flex-col py-2 px-2 items-center pb-24 text-slate-100">
      <header className="flex  ">
        <Link to={"/"}>
          <FaArrowLeft className="m-2 cursor-pointer text-slate-200 fixed left-2 hover:scale-105 top-3" />
        </Link>
        <InputSearch
          handleInputSearch={handleInputSearch}
          searchValue={searchValue}
          handleSearch={handleSearch}
          noResults={searchAttempted && searchResults.length === 0}
          shakeToken={searchAttemptToken}
        />
      </header>
      <Header />

      {/* month label with grouping toggle */}
      <div className=" -mt-10 ml-52 w-full max-w-6xl flex items-center justify-center ">
        <div className="flex items-center gap-3">
          <button
            title="Group by category"
            aria-pressed={sortByCategory}
            onClick={() => setSortByCategory((s) => !s)}
            className={`p-2 rounded-md transition-colors duration-150 ${
              sortByCategory
                ? "bg-teal-600/20 text-teal-300"
                : "bg-gray-800 text-gray-300"
            }`}
          >
            <FaLayerGroup />
          </button>
        </div>
      </div>

      <section className="w-full max-w-6xl text-sm">
        {searchResults.length !== 0 ? (
          <>
            <SearchHeader
              resultsLength={searchResults.length}
              searchSum={monetaryValue(searchSum)}
            />
          </>
        ) : (
          <div className="glass-panel-strong rounded-2xl m-2">
            <MonthlyBalance balance={balance} />
          </div>
        )}

        {searchResults.length !== 0 ? (
          <ItemSearch searchText={searchValue} transactions={searchResults} />
        ) : sortByCategory ? (
          // Grouped by category view
          <div className="w-full max-w-6xl">
            {groupedEntries.map(([catId, items]) => {
              const category = categoriesList.find(
                (currentCategory) => String(currentCategory.id) === catId,
              );
              const title = category?.title || catId;

              const categoryTotal = items.reduce(
                (sum, item) => sum + Number(item.value || 0),
                0,
              );

              const orderedItems = [...items].sort(
                (x, y) => new Date(y.day).getTime() - new Date(x.day).getTime(),
              );

              return (
                <section
                  key={catId}
                  className="glass-panel-strong rounded-2xl p-3 mb-4 mx-2"
                >
                  <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold capitalize text-slate-200">
                    <span>{title}</span>
                    <span>{monetaryValue(categoryTotal)}</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
                    {orderedItems.map((item) => (
                      <Link to={`/transactions/${item.id}`} key={item.id}>
                        <TransactionsCard
                          id={item.id}
                          title={item.title}
                          value={item.value}
                          day={item.day}
                          category_id={item.category_id}
                          type={item.type}
                        />
                      </Link>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        ) : transactions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
            {transactions.map((item) => (
              <Link to={`/transactions/${item.id}`} key={Math.random()}>
                <TransactionsCard
                  id={item.id}
                  title={item.title}
                  value={item.value}
                  day={item.day}
                  category_id={item.category_id}
                  type={item.type}
                />
              </Link>
            ))}
          </div>
        ) : (
          <h2 className="flex justify-center font-bold">
            No transaction yet! 😢
          </h2>
        )}
      </section>

      <ScrollUpButton />
    </main>
  );
};
