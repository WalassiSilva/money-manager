import { createContext, Dispatch, useContext, useEffect, useState } from "react";
import { BalanceProps, TransactionsProps } from "../Types";
import { getTransactionsByMonth, getUserID } from "../services-api";

type TransactionsBalanceContextProps = {
  balance: BalanceProps;
  setBalance: Dispatch<React.SetStateAction<{ incomes: number; expenses: number; result: number; }>>;
  transactions: TransactionsProps[];
  setTransactions: Dispatch<React.SetStateAction<TransactionsProps[]>>;
  date: Date
};

export const TransactionsBanceContext =
  createContext<TransactionsBalanceContextProps | null>(null);

export function TransactionsBalanceProvider({
  children, date
}: {
  children: React.ReactNode;
  date: Date
}) {
  const [balance, setBalance] = useState({
    incomes: 0,
    expenses: 0,
    result: 0,
  });
  const [transactions, setTransactions] = useState<TransactionsProps[]>([]);

  const user_id = getUserID();

   useEffect(() => {
      fetchMonthData(new Date(date).getFullYear(), new Date(date).getMonth() + 1);
    }, [date]);
  
    const fetchMonthData = async (
      year: string | number,
      month: string | number
    ) => {
      const data = await getTransactionsByMonth(year, month, user_id);
      setTransactions(data.data);
      setBalance(data?.balance);
    };

  return (
    <TransactionsBanceContext.Provider
      value={{ balance, setBalance, transactions, setTransactions, date }}
    >
      {children}
    </TransactionsBanceContext.Provider>
  );
}

export function useTransactionsBalanceContext(date: Date) {
  const context = useContext(TransactionsBanceContext);
  if (!context) {
    throw new Error(
      "useTransactionsBalanceContext must be used within a TransactionsBanceContextProvier"
    );
  }
  return {... context, date};
}
