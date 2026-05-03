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
    <section className="bg-gray-600 m-4 p-4 rounded-xl flex hover:shadow-white hover:translate-x-2 duration-300">
      <div className="flex items-center justify-center m-3 ml-0">
        {setIconCategory(Number(category_id))}
      </div>

      <div className="flex-1 ">
        <h2 className="font-bold text-sm md:text-lg capitalize">{title}</h2>
        <div className="flex justify-between mt-2">
          <div>
            <p className="text-xs md:text-lg">{formatDate(day)}</p>
          </div>
          <div
            className={`${
              type !== 0 ? "text-green-300" : "text-red-500"
            } font-bold`}
          >
            {monetaryValue(value)}
          </div>
        </div>
      </div>
    </section>
  );
};
