import React, { useContext, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { DateContext } from "../../context/GlobalProvider";
import { DateContextProps } from "../../Types";

const Header = () => {

  const { date, setDate } = useContext(DateContext);

  useEffect(() => {
    onChangeHandle(date);
  }, []);

  function onChangeHandle(e) {
    setDate(e);
  }

  return (
    <div className="text-black my-1 flex justify-center items-center ">
      <Calendar
        onClickMonth={onChangeHandle}
        value={date}
        view="year"
        className={"w-56 p-0 h-10 overflow-hidden duration-300 hover:duration-300 hover:h-[250px] rounded-lg bg-gray-500 text-white"}

      />
    </div>
  );
};

export { Header };