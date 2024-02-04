import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { getCategories, getCategoriesSum } from "../../../services-api";
import { baseUrl } from "../../../variables";
import { CategoriesProps, colors } from "../../../Types";

ChartJS.register(ArcElement, Tooltip, Legend);

const CategoryBalance = ({year, month}) => {
  const [categories, setCategories] = useState([]);
  const [categoryValues, setCategoryValue] = useState([]);

  useEffect(() => {
    // fetchCategories();
    fetchCategorieSum(year, month);
  }, []);

  // const fetchCategories = async () => {
  //   const data = await getCategories();
  //   // setCategories(data.map((e: { title: string, sum: number }) => e.title));
  // };
  const fetchCategorieSum = async (year: string | number, month: string | number) => {
    const data = await getCategoriesSum(year, month);
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



  const options = {};
  return (
    <section>
      <div className="w-screen h-full md:w-[500px] flex items-center justify-center">
        <Doughnut data={data} options={options} ></Doughnut>
      </div>
      <Link to="#"></Link>
    </section>
  );
};

export { CategoryBalance };