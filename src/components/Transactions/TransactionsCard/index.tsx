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
  return (
    <section className="bg-gray-600 m-2 px-4 py-1 rounded-xl flex hover:shadow-white hover:translate-x-2 duration-300">
      <div className="flex items-center justify-center m-3 ml-0">
        {setIconCategory(Number(category_id))}
      </div>

      <div className="flex-1 flex justify-between ">
        <h2 className="font-bold self-center text-sm  capitalize">{title}</h2>

        {/*value and day info */}
        <div className=" flex flex-col justify-between mt-2">
          <div
            className={`${
              type !== 0 ? "text-green-300" : "text-red-500"
            } font-bold`}
          >
            {monetaryValue(value)}
          </div>
          <div>
            <p className="text-xs text-end">{formatDate(day)}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
