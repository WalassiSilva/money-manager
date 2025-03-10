import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { Layout } from "./components/shared/Layout";
import { Transactions } from "./Pages/Transactions";
import { Dashboard } from "./Pages/Dashboard";
import { TransactionsUpdate } from "./components/Transactions/TransactionsUpdate";
import { TransactionsPost } from "./components/Transactions/TransactionsPost";
import { Categories } from "./Pages/Categories";
import LoginPage from "./Pages/Login";
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-react";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isSignedIn } = useUser();

  if (!isSignedIn) {
    return <Navigate to="/sign-in" replace />;
  }
  console.log("Is Signed In:", isSignedIn);

  return <>{children}</>;
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Rota pública para login */}

        <Route
          path="/sign-in"
          element={
            <div>
              <SignedOut>
                <LoginPage />
              </SignedOut>
              <SignedIn>
                <Navigate to="/dashboard" replace />
              </SignedIn>
            </div>
          }
        />

        {/* Rotas protegidas */}
        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/transactions/add" element={<TransactionsPost />} />
          <Route path="/transactions/:id" element={<TransactionsUpdate />} />
          <Route path="/transactions/categories" element={<Categories />} />
        </Route>

        {/* Se não estiver autenticado, redireciona para login */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}
export default App;

/*
<Route path="/dashboard" element={<Dashboard />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/transactions/add" element={<TransactionsPost />} />
            <Route
              path={"/transactions/:id"}
              element={<TransactionsUpdate />}
            />
            <Route path={"/transactions/categories"} element={<Categories />} />*/
