import { useEffect, useState } from "react";
import { getCategoriesSum, getUserID } from "../../../services-api";
import { DataProps } from "../../../Types";
import { useTransactionType } from "../../../hooks/useTransactionType";
import TransatcionTypeButton from "../../TransactionTyeButton";
import { monetaryValue } from "../../../utils";

const CategoryBalance = ({ year, month }: DataProps) => {
  const [categories, setCategories] = useState<
    Array<{ category: string; sum: number }>
  >([]);
  const { currentType, switchType } = useTransactionType();
  const user_id = getUserID();

  const fetchCategorieSum = async (
    year: string | number,
    month: string | number,
  ) => {
    const data = await getCategoriesSum(
      year,
      Number(month) + 1,
      currentType,
      user_id,
    );
    setCategories(data);
  };

  const totalValue = categories.reduce((acc, item) => acc + item.sum, 0);

  useEffect(() => {
    fetchCategorieSum(year, month);
  }, [year, month, currentType]);

  return (
    <section className="flex flex-1 justify-center *:capitalize">
      <div className="glass-panel-strong w-full max-w-[460px] rounded-2xl p-4 sm:p-6 flex flex-col gap-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-semibold tracking-wide text-slate-300">
              Category balance
            </h3>
            <p className="text-xs text-slate-400">
              Total: {monetaryValue(totalValue)}
            </p>
          </div>

          <TransatcionTypeButton
            currentType={currentType}
            switchType={switchType}
          />
        </div>

        <div className="flex flex-col gap-3">
          {categories.length > 0 ? (
            categories.map((item, index) => {
              const percent =
                totalValue > 0 ? (item.sum / totalValue) * 100 : 0;

              return (
                <div key={item.category} className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between text-xs sm:text-sm text-slate-300">
                    <span className="capitalize font-medium">
                      {item.category}
                    </span>
                    <div className="flex gap-4 justify-between text-[11px] sm:text-xs ">
                      <span className="text-slate-400">
                        {monetaryValue(item.sum)}
                      </span>
                      <span className="font-bold">{percent.toFixed(1)}%</span>
                    </div>
                  </div>

                  <div className="h-3 rounded-full bg-slate-800/90 overflow-hidden border border-slate-700/60">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-slate-600 via-slate-500 to-slate-400 transition-all duration-700 ease-out"
                      style={{
                        width: `${percent}%`,
                        transitionDelay: `${index * 80}ms`,
                      }}
                    />
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-sm text-slate-400">Loading data...</p>
          )}
        </div>

        {/* <Link
          to="/transactions/categories"
          className="action-accent flex justify-center px-4 py-2 font-bold rounded-lg text-slate-100 hover:brightness-110 duration-200"
        >
          See details...
        </Link> */}
      </div>
    </section>
  );
};

export { CategoryBalance };
