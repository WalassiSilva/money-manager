import React from "react"; import { Link } from "react-router-dom";
import { FaHome, FaBus } from "react-icons/fa"; import { GiFireSpellCast } from "react-icons/gi";
import { MdHealthAndSafety } from "react-icons/md";
import { GiMoneyStack } from "react-icons/gi";
import { GiReceiveMoney } from "react-icons/gi";
import { IoBuild } from "react-icons/io5";
import { FaChartLine } from "react-icons/fa";
import { GiPlantWatering } from "react-icons/gi";
import { TransactionsProps } from "../../../Types";



export const TransactionsCard: React.FC<TransactionsProps> = ({ title, value, day, category_id, type, id }) => {

  const monetaryValue = (value: number) => {
    if (value) {
      const format = new Intl.NumberFormat("tp-BR", {
        style: "currency",
        currency: "BRL",
      }).format(value);
      return format;
    } else return 0;
  };

  const setIconCategory = (category_id: number) => {
    switch (category_id) {
      case 1: { return <FaHome className="bg-gray-400 rounded-full p-2 h-10 w-10" />; }
      case 2: { return <GiPlantWatering className="bg-green-500 rounded-full p-2 h-10 w-10" />; }
      case 3: { return <GiFireSpellCast className="bg-red-400 rounded-full p-2 h-10 w-10" />; }
      case 4: { return <MdHealthAndSafety className="bg-yellow-500 rounded-full p-2 h-10 w-10" />; }
      case 5: { return <FaBus className="bg-green-300 rounded-full p-2 h-10 w-10" />; }
      case 6: { return <IoBuild className="bg-yellow-300 rounded-full p-2 h-10 w-10" />; }
      case 7: { return <GiReceiveMoney className="bg-green-700 rounded-full p-2 h-10 w-10" />; }
      case 8: { return <FaChartLine size={2} className="bg-green-700 rounded-full p-2 h-10 w-10" />; }
      case 9: { return <GiMoneyStack className="bg-green-700 rounded-full p-1 h-10 w-10" />; }
      case 10: { return <GiMoneyStack className="bg-green-700 rounded-full p-2 h-10 w-10" />; }
    }
  };
  return (
    <Link to={`/transactionform/${id}`} className="bg-gray-600 m-4 p-4 rounded-xl flex">
      <div className="flex items-center justify-center m-3 ml-0">
        {setIconCategory(Number(category_id))}
      </div>

      <div className="flex-1">
        <h2 className="font-bold text-lg capitalize">{title}</h2>
        <p>{new Date(day).toLocaleDateString("pt-br")}</p>
      </div>

      <div className={`${type !== 0 ? "text-green-300" : "text-red-500"} font-bold`}>{monetaryValue(value)}</div>

    </Link>
  );
};
