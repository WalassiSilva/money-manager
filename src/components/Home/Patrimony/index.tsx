import { useEffect, useState } from "react";
import { getPatrimony } from "../../../services-api";
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
  


  useEffect(() => {
    fetchPatrimony();   
    
  }, [year, month]);

  const fetchPatrimony = async () => {
    const response = await getPatrimony(year, month);
    setPatrimony(response.totalValue);
  };
  const handleShowPatrimony = () => {
    setShowPatrimony(!showPatrimony);

  };
  return (
    <div>
      <button onClick={handleShowPatrimony} className="text-gray-300 font-bold flex items-center flex-col">Patrimony {!showPatrimony ? <FaEye /> : <FaEyeSlash />}</button>
      <p className="text-gray-300 font-bold duration-200">
        {showPatrimony 
        ?
        monetaryValue(patrimony)
        : "R$ **,***.**"
        }
      </p>
    </div>
  );
};
