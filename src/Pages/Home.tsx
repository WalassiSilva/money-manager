import React, { useEffect, useState } from "react";
import { getTransactionsByMonth } from "../services-api";
import { Header } from "../components/shared/Header";
import { CategoryBalance } from "../components/Home/CategoryBalance";
import { LastTransactions } from "../components/Home/LastTransactions";

const Home = () => {

  useEffect(() => {

    monthData();    
    
    //   const fetchData = async () => {
    //     try {
    //       const response = await fetch("http://localhost:3001/api/transactions/filterAll/foda-se");

    //       const jsonData = await response.json();
    //       console.log(jsonData);


    //       return jsonData;
    //     } catch (error) {
    //       console.log("Error", error);

    //     }
    //   };

    //   fetchData();
  }, []);

  const monthData = async () => {
  const data = await getTransactionsByMonth("2024", "01");
  // console.log(data);
  
  };

  return (
    <div className="bg-gray-900 text-white w-full h-screen flex flex-col gap-6">
      <Header />

      <CategoryBalance />
      <LastTransactions />
    </div>
  );
};

export { Home };