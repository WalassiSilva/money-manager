import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Layout } from "./components/shared/Layout";
import { Transactions } from "./Pages/Transactions";
import { Home } from "./Pages/Home";
function App() {
  return (
    <div >
      <Router >
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/transactions" element={<Transactions />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}
export default App;