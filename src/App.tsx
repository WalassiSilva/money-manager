import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Layout } from "./components/shared/Layout";
import { Transactions } from "./Pages/Transactions";
import { Home } from "./Pages/Home";
import { TransactionsUpdate } from "./components/Transactions/TransactionsUpdate";
import { TransactionsPost } from "./components/Transactions/TransactionsPost";
import { Categories } from "./Pages/Categories";
function App() {
  return (
    <div >
      <Router >
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/transactions/add" element={<TransactionsPost />} />
            <Route path={"/transactions/:id"} element={<TransactionsUpdate />} />
            <Route path={"/transactions/categories"} element={<Categories />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}
export default App;