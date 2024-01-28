import React from "react";
import { Header } from "../components/shared/Header";
import { CategoryBalance } from "../components/Home/CategoryBalance";
import { LastTransactions } from "../components/Home/LastTransactions";

const Home = () => {
  return (
    <div>
      <Header />
      <CategoryBalance />
      <LastTransactions />
    </div>
  );
};

export { Home };