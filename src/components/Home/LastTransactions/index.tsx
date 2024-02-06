import React from "react";
import { Link } from "react-router-dom";
import { TransactionsCard } from "../../Transactions/TransactionsCard";

const LastTransactions = () => {
  return (
    <section className="sm:w-[50%] mb-10 bg-gray-800 rounded-lg ">
      <Link to="/transactions" className="">
        <h2 className="text-center text-lg font-bold">LastTransactions</h2>
        <TransactionsCard id={155} title={"teste"} value={1500} day={"2024-02-05"} type={0} category_id={"3"} />
        <TransactionsCard id={155} title={"teste"} value={1500} day={"2024-02-05"} type={0} category_id={"3"} />
        <TransactionsCard id={155} title={"teste"} value={1500} day={"2024-02-05"} type={0} category_id={"3"} />
      </Link>
    </section>
  );
};

export { LastTransactions };