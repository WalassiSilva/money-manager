import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const Header = () => {

  const dateValue: Date = new Date(new Date().getFullYear(), new Date().getMonth());


  function onChangeHandle(e) {
    console.log(e.getMonth()+1);
  }

  return (
    <div className="text-black my-1 flex justify-center items-center ">
      <Calendar
        onClickMonth={onChangeHandle}
        value={dateValue}
        view="year"
        className={"w-56 p-0 h-10 overflow-hidden duration-300 hover:duration-300 hover:h-[250px] rounded-lg bg-gray-500 text-white"}
        
      />
    </div>
  );
};

export { Header };