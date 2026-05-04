import { BalanceProps, TransactionsProps } from "../../../Types";
import { monetaryValue } from "../../../utils";

type TransactionBalanceProps = {
  transactions: TransactionsProps[];
  balance: BalanceProps;
};

type BalanceStatsProps = {
  balance: BalanceProps;
  transactionType: "incomes" | "expenses" | "result";
  balanceValue: number;
};

export default function TransactionBalanceRoot({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="glass-panel-strong rounded-2xl mb-2">{children}</div>;
}

export function TransactionContent({ balance }: TransactionBalanceProps) {
  return (
    <div className="p-4 ">
      <div className="flex justify-between text-center capitalize font-bold">
        <BalanceStats
          balance={balance}
          balanceValue={balance?.incomes}
          transactionType="incomes"
        />
        <BalanceStats
          balance={balance}
          balanceValue={balance?.expenses}
          transactionType="expenses"
        />
        <BalanceStats
          balance={balance}
          balanceValue={balance?.result}
          transactionType="result"
        />
      </div>
    </div>
  );
}

export function BalanceHeader({
  transactionsLength,
}: {
  transactionsLength: number;
}) {
  return (
    <h4 className="text-sm text-center mb-2 pt-4 text-slate-300">
      Transactions: {transactionsLength}
    </h4>
  );
}

function BalanceStats({
  balance,
  balanceValue,
  transactionType,
}: BalanceStatsProps) {
  return (
    <div
      className={`${balanceValue > 0 ? "text-emerald-300" : "text-rose-400"} `}
    >
      <p className="mb-1 text-xs sm:text-sm">
        {transactionType === "result" ? "Balance" : transactionType}:
      </p>
      <p className="text-xs sm:text-sm md:text-base">
        {monetaryValue(balance?.[transactionType] as number)}
      </p>
    </div>
  );
}
