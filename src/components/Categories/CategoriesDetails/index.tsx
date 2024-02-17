import { useEffect, useState } from "react";
import { Header } from "../../shared/Header";
import { getCagetoriesDetails, getTransactionsByCategory } from "../../../services-api";
import { TransactionsCard } from "../../Transactions/TransactionsCard";
import { TransactionsProps } from "../../../Types";

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
  // TODO get date by custom hook

  const fetchCategories = async (year: number, month: number) => {
    const data = await getCagetoriesDetails(year, month);
    setCategories(data);
  };

  const fetchTransactionsByCategories = async (category: string, year: number, month: number) => {
    const data = await getTransactionsByCategory(category, year, month);
    setTransactions(data);
  };

  useEffect(() => {
    fetchCategories(2023, 12);
    fetchTransactionsByCategories(categoryName, 2024, 2);
  }, [categoryName]);

  const handleCategoryClick = (category: string) => {
    setCategoryName(category);
  };

  return (
    <main className="bg-gray-900 text-white h-dvh">
      <Header />
      <div className="m-4 flex flex-col items-center">
        {categories.map(item => (
          <div className="cursor-pointer hover:shadow-md m-2"
            onClick={() => handleCategoryClick(item.category)}
            key={Math.random()}>
            <strong >{item.category}</strong> : <span> {item.sum}</span>
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
