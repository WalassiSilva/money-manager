import { useEffect } from "react";
import { Header } from "../components/shared/Header";
import { CategoryBalance } from "../components/Categories/CategoryBalance";
import { LastTransactions } from "../components/Dashboard/LastTransactions";

import { useDateContext } from "../context/GlobalProvider";
import { Patrimony } from "../components/Dashboard/Patrimony";
import { MonthlyBalance } from "../components/Dashboard/MonthlyBalance";
import {
  TransactionsBalanceProvider,
  useTransactionsBalanceContext,
} from "../context/TransactionsBalanceContext";

const Dashboard = () => {
  const { date, setDate } = useDateContext();

  const year = new Date(date).getFullYear();
  const month = new Date(date).getMonth();

  useEffect(() => {
    setDate(new Date(date).toISOString());
  }, [date]);

  return (
    <div className="w-full min-h-screen flex flex-col gap-7 items-center px-2 pb-24 lg:pb-28 text-slate-100">
      <Header />
      <div className="lg:flex w-full max-w-6xl gap-5 px-2 lg:px-4">
        <div className="w-full lg:w-1/3 flex flex-col gap-4 md:gap-5">
          <Patrimony />
          <CategoryBalance year={year} month={month} />
        </div>

        <div className="w-full lg:w-2/3 flex flex-col gap-4 md:gap-5">
          <TransactionsBalanceProvider date={new Date(date)}>
            <div className="glass-panel-strong rounded-2xl text-center mt-4 md:mt-0">
              <BalanceFromContext date={new Date(date)} />
            </div>

            <LastTransactions date={date} setDate={setDate} />
          </TransactionsBalanceProvider>
        </div>
      </div>
    </div>
  );
};

export { Dashboard };

function BalanceFromContext({ date }: { date: Date }) {
  const { balance } = useTransactionsBalanceContext(date);
  return <MonthlyBalance balance={balance} />;
}
