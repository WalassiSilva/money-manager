import { useEffect, useState } from "react";
import { Header } from "../../shared/Header";
import {
  getCagetoriesDetails,
  getTransactionsByCategory,
} from "../../../services-api";
import { TransactionsCard } from "../../Transactions/TransactionsCard";
import { TransactionsProps } from "../../../Types";
import { useDateContext } from "../../../context/GlobalProvider";
import { setIconCategory } from "../../../utils";
import { Link } from "react-router-dom";
import { useTransactionType } from "../../../hooks/useTransactionType";
import TransatcionTypeButton from "../../TransactionTyeButton";
import { ScrollUpButton } from "../../ScrollUpButton";

type categoryProps = {
  category: string;
  id: number;
  sum: number;
};
type transactionsProps = {
  totalValue: number;
  resultsFinded: number;
  data: TransactionsProps[];
};

export const CategoriesDetails = () => {
  const [categories, setCategories] = useState<categoryProps[]>([]);
  const [categoryName, setCategoryName] = useState("casa");
  const [transactions, setTransactions] = useState<transactionsProps>({
    totalValue: 0,
    resultsFinded: 0,
    data: [],
  });

  const [monthValue, setMonthValue] = useState(0);
  const { date } = useDateContext();
  const monthName = new Date(date).toLocaleString("pt-BR", { month: "long" });
  const { currentType, switchType } = useTransactionType();
  const year = new Date(date).getFullYear();
  const month = new Date(date).getMonth() + 1;

  const fetchCategories = async (
    year: number,
    month: number,
    type: number = 0
  ) => {
    const data = await getCagetoriesDetails(year, month, type);
    setCategories(data);

    const totalSum = (): number => {
      if (data.length !== 0) {
        return data.map((value) => value.sum).reduce((a, b) => a + b);
      } else {
        return 0;
      }
    };
    setMonthValue(totalSum());
  };

  const fetchTransactionsByCategories = async (
    category: string,
    year: number,
    month: number
  ) => {
    const data = await getTransactionsByCategory(category, year, month);
    setTransactions(data);
  };

  const handleCategoryClick = (category: string) => {
    setCategoryName(category);
  };

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
    fetchCategories(year, month, currentType);
    fetchTransactionsByCategories(categoryName, year, month);
  }, [categoryName, date, currentType]);

  return (
    <main className=" flex flex-col items-center bg-gray-900 text-white min-h-screen overflow-x-hidden">
      <Header />
      <p className="font-bold underline capitalize">{monthName}</p>
      <div className="mt-2">
        <TransatcionTypeButton
          currentType={currentType}
          switchType={switchType}
        />
      </div>
      <div className="m-3 flex flex-wrap items-center justify-center">
        {categories.map((item) => (
          <div
            className="flex flex-col text-center justify-center items-center cursor-pointer hover:shadow-md m-1 border rounded-md p-1 text-sm"
            onClick={() => handleCategoryClick(item.category)}
            key={Math.random()}
          >
            <div className="flex justify-center items-center gap-1 p-2">
              <span className="scale-75">{setIconCategory(item.id)}</span>
              <div className="text-xs text-start">
                {monetaryValue(item.sum)}
                <p className=" text-slate-500">
                  {item.category}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="sm:w-[60%] w-[90%]">
        <h2 className="text-center text-slate-500">
          Transactions: {transactions.resultsFinded}
        </h2>
        <h2 className="text-center text-slate-500">
          Total: {monetaryValue(monthValue)}
        </h2>
        {transactions.data.length > 0 &&
          transactions.data.map((item) => (
            <Link to={`/transactions/${item.id}`} key={Math.random()}>
              <TransactionsCard
                title={item.title}
                value={item.value}
                day={item.day}
                category_id={item.category_id}
                type={item.type}
                id={item.id}
              />
            </Link>
          ))}
      </div>
      <ScrollUpButton />
    </main>
  );
};
