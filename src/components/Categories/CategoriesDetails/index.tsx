import { useEffect, useState } from "react";
import { Header } from "../../shared/Header";
import { getCagetoriesDetails, getTransactionsByCategory } from "../../../services-api";
import { TransactionsCard } from "../../Transactions/TransactionsCard";
import { TransactionsProps } from "../../../Types";
import { useDateContext } from "../../../context/GlobalProvider";
import { setIconCategory } from "../../../utils";

type categoryProps = {
  category: string,
  id: number
  sum: number
}
type transactionsProps = {
  totalValue: number,
  resultsFinded: number,
  filterResult: TransactionsProps[]
}

export const CategoriesDetails = () => {
  const [categories, setCategories] = useState<categoryProps[]>([]);
  const [categoryName, setCategoryName] = useState("casa");
  const [transactions, setTransactions] = useState<transactionsProps>({ totalValue: 0, resultsFinded: 0, filterResult: [] });
  const { date } = useDateContext();
  const year = new Date(date).getFullYear();
  const month = new Date(date).getMonth() + 1;

  const fetchCategories = async (year: number, month: number) => {
    const data = await getCagetoriesDetails(year, month);
    setCategories(data);
  };

  const fetchTransactionsByCategories = async (category: string, year: number, month: number) => {
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
    fetchCategories(year, month);
    fetchTransactionsByCategories(categoryName, year, month);

  }, [categoryName, date]);


  return (
    <main className="bg-gray-900 text-white min-h-screen">
      <Header />
      <div className="m-3 flex flex-wrap items-center">
        {categories.map(item => (
          <div className="flex flex-col text-center justify-center items-center cursor-pointer hover:shadow-md m-1 border rounded-md p-1 text-sm"
            onClick={() => handleCategoryClick(item.category)}
            key={Math.random()}>
            <div className="flex justify-center items-center gap-1 p-2">{setIconCategory(item.id)} {monetaryValue(item.sum)} </div>
            <p className="text-sm text-slate-500">{item.category}</p>
          </div>
        ))}
      </div>
      <div>

      </div>
      <div>
        <h2 className="text-center text-slate-500">Transactions: {transactions.resultsFinded}</h2>
        {transactions.filterResult.length > 0 && transactions.filterResult.map((item) => (
          <TransactionsCard key={item.id}
            title={item.title}
            value={item.value}
            day={item.day}
            category_id={item.category_id}
            type={item.type}
            id={item.id} />
        ))}
      </div>


    </main>
  );
};
