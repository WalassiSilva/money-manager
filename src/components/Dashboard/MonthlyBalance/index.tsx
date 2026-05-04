import { BalanceProps } from "../../../Types";
import { monetaryValue } from "../../../utils";

type MonthlyBalanceProps = {
  balance: BalanceProps;
};

export function MonthlyBalance({ balance }: MonthlyBalanceProps) {
  return (
    <div className="p-4">
      {/* Desktop layout: all three in a row */}
      <div className="hidden md:flex justify-between text-center capitalize font-bold">
        <BalanceItem label="incomes" value={balance?.incomes} />
        <BalanceItem label="expenses" value={balance?.expenses} />
        <BalanceItem label="Balance" value={balance?.result} />
      </div>

      {/* Mobile layout: result centered on top, income/expenses with space-between below */}
      <div className="md:hidden flex flex-col gap-3">
        <div className="text-center">
          <p className="text-xs sm:text-sm text-slate-300">Balance</p>
          <p
            className={`text-lg sm:text-xl font-bold ${
              balance?.result > 0 ? "text-emerald-300" : "text-rose-400"
            }`}
          >
            {monetaryValue(balance?.result as number)}
          </p>
        </div>

        <div className="flex justify-between text-center capitalize font-bold">
          <div>
            <p className="text-xs text-slate-300">incomes</p>
            <p className="text-sm sm:text-base text-emerald-300">
              {monetaryValue(balance?.incomes as number)}
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-300">expenses</p>
            <p className="text-sm sm:text-base text-rose-400">
              {monetaryValue(balance?.expenses as number)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function BalanceItem({
  label,
  value,
}: {
  label: string;
  value: number | undefined;
}) {
  return (
    <div className={`${value! > 0 ? "text-emerald-300" : "text-rose-400"}`}>
      <p className="text-sm text-slate-300">{label}:</p>
      <p className="text-lg font-bold mt-3">{monetaryValue(value as number)}</p>
    </div>
  );
}
