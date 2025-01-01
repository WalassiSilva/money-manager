import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useDateContext } from "../../context/GlobalProvider";
import { FaCalendarAlt } from "react-icons/fa";

const Header = () => {
  const [showCalendar, setShowCalendar] = useState(false);
  const { date, setDate } = useDateContext();

  useEffect(() => {
    onChangeHandle(date);
  }, []);

  function onChangeHandle(e) {
    setDate(e);
  }

  return (
    <div className="text-black py-1 flex flex-col justify-center items-center gap-4 transaction">
      <button
        className="text-white p-5 bg-white/50 rounded-full"
        onClick={() => setShowCalendar(!showCalendar)}
      >
        <FaCalendarAlt />
      </button>
      {showCalendar && (
        <Calendar
          onClickMonth={(e) => onChangeHandle(e)}
          value={date}
          view="year"
          className={
            "w-56 p-0 overflow-hidden duration-300 hover:duration-300 rounded-lg bg-gray-500 text-white"
          }
        />
      )}
    </div>
  );
};

export { Header };
