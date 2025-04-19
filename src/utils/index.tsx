import { FaHome, FaBus } from "react-icons/fa";
import { GiFireSpellCast, GiStairsGoal } from "react-icons/gi";
import { MdHealthAndSafety } from "react-icons/md";
import { GiMoneyStack } from "react-icons/gi";
import { GiReceiveMoney } from "react-icons/gi";
import { IoBuild, IoFastFoodSharp } from "react-icons/io5";
import { FaChartLine } from "react-icons/fa";
import { GiPlantWatering } from "react-icons/gi";

export const monetaryValue = (value: number) => {
  if (Number(value)) {
    const format = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(Number(value));
    return format;
  } else return 0;
};

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const formatDate = (date: string) => {
  const d = new Date(date).getUTCDate().toString().padStart(2, "0");
  const m = (new Date(date).getUTCMonth() + 1).toString().padStart(2, "0");
  const y = new Date(date).getUTCFullYear().toString();
  return `${d}/${m}/${y}`;
};

export const setIconCategory = (category_id: number) => {
  switch (category_id) {
    case 1: {
      return (
        <FaHome className={"bg-[#2c3d57] red-500 rounded-full p-2 h-10 w-10"} />
      );
    }
    case 2: {
      return (
        <GiPlantWatering className="bg-[#115e59] rounded-full p-2 h-10 w-10" />
      );
    }
    case 3: {
      return (
        <GiFireSpellCast className="bg-red-500 rounded-full p-2 h-10 w-10" />
      );
    }
    case 4: {
      return (
        <MdHealthAndSafety className="bg-[#d97706] rounded-full p-2 h-10 w-10" />
      );
    }
    case 5: {
      return <FaBus className="bg-black rounded-full p-2 h-10 w-10" />;
    }
    case 6: {
      return <IoBuild className="bg-[#422006] rounded-full p-2 h-10 w-10" />;
    }
    case 7: {
      return (
        <GiReceiveMoney className="bg-[#065f46] rounded-full p-2 h-10 w-10" />
      );
    }
    case 8: {
      return (
        <FaChartLine
          size={2}
          className="bg-[#7842f5] rounded-full p-2 h-10 w-10"
        />
      );
    }
    case 9: {
      return (
        <GiMoneyStack className="bg-[#54816c] rounded-full p-1 h-10 w-10" />
      );
    }
    case 10: {
      return (
        <GiMoneyStack className="bg-green-700 rounded-full p-2 h-10 w-10" />
      );
    }
    case 11: {
      return (
        <GiStairsGoal className="bg-blue-500 rounded-full p-2 h-10 w-10" />
      );
    }
    case 12: {
      return (
        <IoFastFoodSharp className="bg-yellow-600 rounded-full p-2 h-10 w-10" />
      );
    }
  }
};
