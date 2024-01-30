import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const Header = () => {

  const dateValue: Date = new Date(new Date().getFullYear(), new Date().getMonth());


  function onChangeHandle(e) {
    console.log(e.getMonth()+1);
  }

  return (
    <div className="text-black m-auto my-1 ">
      <Calendar
        onClickMonth={onChangeHandle}
        value={dateValue}
        view="year"
        className={"h-12 hover:h-[360px] overflow-hidden duration-200 rounded-lg"}
      />
    </div>
  );
};

export { Header };