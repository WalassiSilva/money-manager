import { useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useDateContext } from "../../context/GlobalProvider";
import { FaCalendarAlt } from "react-icons/fa";

const Header = () => {
  const { date, setDate } = useDateContext();

  useEffect(() => {
    onChangeHandle(date);
  }, []);

  function onChangeHandle(e) {
    setDate(e);
  }

  return (
    <div className="text-black py-1 flex flex-col justify-center items-center gap-4 transition-all duration-300">
      <input id="toggle" type="checkbox" className="peer hidden" />
      <label
        htmlFor="toggle" 
        className=" p-5 bg-white text-gray-700 hover:bg-white/50 hover:text-white duration-200 rounded-full cursor-pointer"
      >
        <FaCalendarAlt />
      </label>

      <Calendar
        onClickMonth={(e) => onChangeHandle(e)}
        value={date}
        view="year"
        className={
          "transition-all peer-checked:h-[250px] w-56 h-0 p-0 overflow-hidden duration-300 rounded-lg bg-gray-500 text-white"
        }
      />
    </div>
  );
};

export { Header };
