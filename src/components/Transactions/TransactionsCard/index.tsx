import React from "react";
import { TransactionsProps } from "../../../Types";
import { monetaryValue, setIconCategory } from "../../../utils";

export const TransactionsCard: React.FC<TransactionsProps> = ({
  title,
  value,
  day,
  category_id,
  type,
}) => {
  const formatedDate = (zuluDate: Date | string) => {
    const date = new Date(zuluDate); // Cria um objeto Date a partir do horário Zulu (UTC)
    const offset = 22; // Fuso horário de Brasília é UTC-3
    date.setHours(date.getHours() + offset); // Ajusta a hora
    return date.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
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
            <p className="text-xs md:text-lg">
              {formatedDate(day).replace("de", "")}
            </p>
            {/* <p className="text-gray-400 text-xs">dd/MM/yyyy</p> */}
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
