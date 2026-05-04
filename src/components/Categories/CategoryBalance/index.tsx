import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { getCategoriesSum, getUserID } from "../../../services-api";
import { DataProps } from "../../../Types";
import { useTransactionType } from "../../../hooks/useTransactionType";
import TransatcionTypeButton from "../../TransactionTyeButton";

ChartJS.register(ArcElement, Tooltip, Legend);

const CategoryBalance = ({ year, month }: DataProps) => {
  const [categories, setCategories] = useState([]);
  const [categoryValues, setCategoryValue] = useState([]);
  const { currentType, switchType } = useTransactionType();
  const user_id = getUserID();

  const fetchCategorieSum = async (
    year: string | number,
    month: string | number,
  ) => {
    const data = await getCategoriesSum(
      year,
      Number(month) + 1,
      currentType,
      user_id,
    );
    setCategories(
      data.map((e: { category: string; sum: number }) => e.category),
    );
    setCategoryValue(data.map((e: { category: string; sum: number }) => e.sum));
  };

  const data = {
    labels: categories,
    datasets: [
      {
        label: "R$",
        data: categoryValues,
        backgroundColor: [
          "#2c3d57",
          "#115e59",
          "#ef4444",
          "#d97706",
          "#000",
          "#422006",
        ],

        borderColor: [
          "#2c3d57",
          "#115e59",
          "#ef4444",
          "#d97706",
          "#000",
          "#422006",
        ],
      },
    ],
  };

  useEffect(() => {
    fetchCategorieSum(year, month);
  }, [year, month, currentType]);

  const options = {};

  return (
    <section className="flex flex-1 justify-center *:capitalize">
      <div className="glass-panel-strong w-full max-w-[460px] rounded-2xl p-4 sm:p-6 flex items-center justify-center">
        <div className="flex flex-col items-center w-full">
          {!data && <p className="text-gray-500">Loading data...</p>}
          <Doughnut data={data} options={options}></Doughnut>
          <div className="flex gap-4 ">
            <TransatcionTypeButton
              currentType={currentType}
              switchType={switchType}
            />
            <Link
              to="/transactions/categories"
              className="action-accent flex justify-center px-4 my-4 py-2 font-bold rounded-lg text-slate-100 hover:brightness-110 duration-200"
            >
              See details...
            </Link>
          </div>
        </div>
      </div>
      <Link to="#"></Link>
    </section>
  );
};

export { CategoryBalance };
