import { useEffect, useState } from "react";
import { getPatrimony, getUserID } from "../../../services-api";
import { useDateContext } from "../../../context/GlobalProvider";
import { monetaryValue } from "../../../utils";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

export const Patrimony = () => {
  const { date } = useDateContext();
  const year = new Date(date).getFullYear();
  const month = new Date(date).getMonth() + 1;
  const [patrimony, setPatrimony] = useState(0);
  const [showPatrimony, setShowPatrimony] = useState(false);
  const user_id = getUserID();

  useEffect(() => {
    fetchPatrimony();
  }, [year, month]);

  const fetchPatrimony = async () => {
    const response = await getPatrimony(year, month, user_id);
    setPatrimony(response.totalValue);
  };
  const handleShowPatrimony = () => {
    setShowPatrimony(!showPatrimony);
  };
  return (
    <div className="glass-panel-strong rounded-2xl px-6 py-4 text-center min-w-[280px]">
      <button
        onClick={handleShowPatrimony}
        className="mx-auto flex items-center gap-2 text-sm font-semibold tracking-wide text-slate-300 hover:text-teal-200 transition-colors"
      >
        Patrimony {!showPatrimony ? <FaEye /> : <FaEyeSlash />}
      </button>
      <p className="mt-2 text-xl lg:text-2xl font-bold text-slate-100 duration-200">
        {showPatrimony ? monetaryValue(patrimony) : "R$ ***,***.**"}
      </p>
    </div>
  );
};
