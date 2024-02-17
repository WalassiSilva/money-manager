import React from "react";
import { TransactionsProps } from "../../../Types";
import { monetaryValue, setIconCategory } from "../../../utils";


export const TransactionsCard: React.FC<TransactionsProps> = ({ title, value, day, category_id, type }) => {

  const formatDate = (date: string) => {
    const d = new Date(date).getUTCDate().toString().padStart(2, "0");
    const m = (new Date(date).getUTCMonth() + 1).toString().padStart(2, "0");
    const y = new Date(date).getUTCFullYear().toString();
    return `${d}/${m}/${y}`;
  };
  return (
    <section className="bg-gray-600 m-4 p-4 rounded-xl flex hover:shadow-xl">
      <div className="flex items-center justify-center m-3 ml-0">
        {setIconCategory(Number(category_id))}
      </div>

      <div className="flex-1 ">
        <h2 className="font-bold text-sm md:text-lg capitalize">{title}</h2>
        <div className="flex justify-between mt-2">
          <div>
            <p className="text-sm md:text-lg">{formatDate(day)}</p>
            <p className="text-gray-400 text-xs">dd/MM/yyyy</p>
          </div>
          <div className={`${type !== 0 ? "text-green-300" : "text-red-500"} font-bold`}>{monetaryValue(value)}</div>
        </div>
      </div>
    </section>
  );
};
