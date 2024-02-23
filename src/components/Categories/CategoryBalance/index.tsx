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

  const fetchCategorieSum = async (year: string | number, month: string | number) => {
    const data = await getCategoriesSum(year, Number(month) + 1);

    setCategories(data.map((e: { category: string, sum: number }) => e.category));
    setCategoryValue(data.map((e: { category: string, sum: number }) => e.sum));
  };

  const data = {
    labels: categories,
    datasets: [{
      label: "R$",
      data: categoryValues,
      backgroundColor: ["#2c3d57", "#115e59", "#ef4444", "#d97706", "#000", "#422006"],

      borderColor: ["#2c3d57", "#115e59", "#ef4444", "#d97706", "#000", "#422006"]
    }]
  };

  useEffect(() => {
    fetchCategorieSum(year, month);
  }, [year, month]);

  const options = {};

  return (
    <section className="flex items-center justify-center">
      <div className=" w-[300px] sm:w-[400px] flex items-center justify-center">
        {limitDate >= targetDate && (
          <div>
            <Doughnut data={data} options={options} ></Doughnut>
            <div className="flex justify-center mt-3 py-1 shadow-md bg-gray-500 rounded-lg">
              <Link to="/transactions/categories" >Categories details</Link>
            </div>
          </div>

        )}
      </div>
      <Link to="#"></Link>
    </section>
  );
};

export { CategoryBalance };