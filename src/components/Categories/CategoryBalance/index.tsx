import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { getCategoriesSum } from "../../../services-api";
import { DataProps } from "../../../Types";

ChartJS.register(ArcElement, Tooltip, Legend);

const CategoryBalance = ({ year, month }: DataProps) => {
  const [categories, setCategories] = useState([]);
  const [categoryValues, setCategoryValue] = useState([]);
  const limitDate = new Date(new Date().getFullYear(), new Date().getMonth());
  const targetDate = new Date(Number(year), Number(month));

  const fetchCategorieSum = async (
    year: string | number,
    month: string | number
  ) => {
    const data = await getCategoriesSum(year, Number(month) + 1);

    setCategories(
      data.map((e: { category: string; sum: number }) => e.category)
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
  }, [year, month]);

  const options = {};

  return (
    <section className="flex items-center justify-center">
      <div className=" w-[300px] sm:w-[400px] flex items-center justify-center">
        {limitDate >= targetDate && (
          <div className="flex flex-col items-center">
            <Doughnut data={data} options={options}></Doughnut>
            <div>
              <Link
                to="/transactions/categories"
                className="flex justify-center w-44 my-4 py-2 font-bold shadow-md rounded-lg bg-white text-gray-700  hover:bg-white/50 hover:text-white duration-200"
              >
                Categories details
              </Link>
            </div>
          </div>
        )}
      </div>
      <Link to="#"></Link>
    </section>
  );
};

export { CategoryBalance };
