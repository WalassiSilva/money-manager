import React, { useEffect } from "react";
import { Header } from "../components/shared/Header";
import { CategoryBalance } from "../components/Home/CategoryBalance";
import { LastTransactions } from "../components/Home/LastTransactions";

const Home = () => {

  useEffect(() => {
  }, []);

  return (
    <div className="bg-gray-900 text-white w-full h-screen flex flex-col gap-6">
      <Header />

      <CategoryBalance />
      <LastTransactions />
    </div>
  );
};

export { Home };