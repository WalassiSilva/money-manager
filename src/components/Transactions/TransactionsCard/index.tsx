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
      case 1: { return <FaHome className={"bg-[#2c3d57] red-500 rounded-full p-2 h-10 w-10"} />; }
      case 2: { return <GiPlantWatering className="bg-[#115e59] rounded-full p-2 h-10 w-10" />; }
      case 3: { return <GiFireSpellCast className="bg-red-500 rounded-full p-2 h-10 w-10" />; }
      case 4: { return <MdHealthAndSafety className="bg-[#d97706] rounded-full p-2 h-10 w-10" />; }
      case 5: { return <FaBus className="bg-black rounded-full p-2 h-10 w-10" />; }
      case 6: { return <IoBuild className="bg-[#422006] rounded-full p-2 h-10 w-10" />; }
      case 7: { return <GiReceiveMoney className="bg-[#065f46] rounded-full p-2 h-10 w-10" />; }
      case 8: { return <FaChartLine size={2} className="bg-[#7842f5] rounded-full p-2 h-10 w-10" />; }
      case 9: { return <GiMoneyStack className="bg-[#54816c] rounded-full p-1 h-10 w-10" />; }
      case 10: { return <GiMoneyStack className="bg-green-700 rounded-full p-2 h-10 w-10" />; }
    }
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
            <p className="text-sm md:text-lg">{day.slice(0, 10)}</p>
            <p className="text-gray-400 text-xs">YYYY-MM-DD</p>
          </div>
          <div className={`${type !== 0 ? "text-green-300" : "text-red-500"} font-bold`}>{monetaryValue(value)}</div>
        </div>
      </div>
    </section>
  );
};
