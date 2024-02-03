import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Layout } from "./components/shared/Layout";
import { Transactions } from "./Pages/Transactions";
import { Home } from "./Pages/Home";
import { TransactionForm } from "./components/Transactions/TransactionForm";
import { TransactionsPost } from "./components/Transactions/TransactionsPost";
function App() {
  return (
    <div >
      <Router >
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/transactions/add" element={<TransactionsPost />} />
            {/* <Route path={"/transactionform/:id"} element={<TransactionForm />} /> */}
          </Route>
        </Routes>
      </Router>
    </div>
  );
}
export default App;