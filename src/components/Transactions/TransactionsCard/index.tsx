import React from "react";
import { TransactionsProps } from "../../../Types";
import { formatDate, monetaryValue, setIconCategory } from "../../../utils";

export const TransactionsCard: React.FC<TransactionsProps> = ({
  title,
  value,
  day,
  category_id,
  type,
}) => {
  const displayTitle = title.length > 20 ? `${title.slice(0, 17)}...` : title;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const transactionDay = new Date(day);
  transactionDay.setHours(0, 0, 0, 0);

  const isFutureDay = transactionDay.getTime() > today.getTime();

  return (
    <section
      title={title}
      className={`glass-panel m-2 px-4 py-2 rounded-xl flex border border-slate-300/15 hover:-translate-y-0.5 hover:border-teal-300/35 hover:shadow-xl hover:shadow-black/30 duration-300 ${
        isFutureDay ? "opacity-50" : ""
      }`}
    >
      <div className="flex items-center justify-center m-3 ml-0">
        {setIconCategory(Number(category_id))}
      </div>

      <div className="flex-1 flex justify-between ">
        <h2 className="min-w-0 flex-1 truncate font-bold self-center text-sm capitalize">
          {displayTitle}
        </h2>

        {/*value and day info */}
        <div className=" flex flex-col justify-between mt-2">
          <div
            className={`${
              type !== 0 ? "text-emerald-300" : "text-rose-400"
            } font-bold text-xs sm:text-sm md:text-base`}
          >
            {monetaryValue(value)}
          </div>
          <div>
            <p className="text-xs text-slate-300 text-end">{formatDate(day)}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
