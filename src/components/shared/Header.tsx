import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useDateContext } from "../../context/GlobalProvider";

const Header = () => {
  const { date, setDate } = useDateContext();
  const [displayDate, setDisplayDate] = useState(new Date(date));

  useEffect(() => {
    setDisplayDate(new Date(date));
  }, []);

  const handleCalendarChangeWrapper = (value: unknown) => {
    if (value instanceof Date) {
      setDate(value.toISOString());
      setDisplayDate(new Date(value));
    } else if (Array.isArray(value) && value[0] instanceof Date) {
      setDate(value[0].toISOString());
      setDisplayDate(new Date(value[0]));
    }
  };

  const navigateDate = (isDouble: boolean, direction: "prev" | "next") => {
    const newDate = new Date(displayDate);

    if (isDouble) {
      // Seta dupla: muda ano
      if (direction === "next") {
        newDate.setFullYear(newDate.getFullYear() + 1);
      } else {
        newDate.setFullYear(newDate.getFullYear() - 1);
      }
    } else {
      // Seta simples: muda mês
      if (direction === "next") {
        newDate.setMonth(newDate.getMonth() + 1);
      } else {
        newDate.setMonth(newDate.getMonth() - 1);
      }
    }

    // update both the displayed active start date and the selected value
    setDisplayDate(newDate);
    setDate(newDate.toISOString());
  };

  useEffect(() => {
    const calendarEl = document.querySelector(".react-calendar");
    if (!calendarEl) return;

    const clickHandlers: { button: Element; handler: (e: Event) => void }[] =
      [];

    // Setas duplas (mudam ano)
    const prev2Button = calendarEl.querySelector(
      ".react-calendar__navigation__prev2-button",
    );
    const next2Button = calendarEl.querySelector(
      ".react-calendar__navigation__next2-button",
    );

    // Setas simples (mudam mês)
    const prevButton = calendarEl.querySelector(
      ".react-calendar__navigation__prev-button",
    );
    const nextButton = calendarEl.querySelector(
      ".react-calendar__navigation__next-button",
    );

    // Handler para seta dupla anterior (< < = ano anterior)
    if (prev2Button) {
      const handler = (e: Event) => {
        e.stopPropagation();
        navigateDate(true, "prev");
      };
      prev2Button.addEventListener("click", handler);
      clickHandlers.push({ button: prev2Button, handler });
    }

    // Handler para seta simples anterior (< = mês anterior)
    if (prevButton) {
      const handler = (e: Event) => {
        e.stopPropagation();
        navigateDate(false, "prev");
      };
      prevButton.addEventListener("click", handler);
      clickHandlers.push({ button: prevButton, handler });
    }

    // Handler para seta simples próxima (> = mês próximo)
    if (nextButton) {
      const handler = (e: Event) => {
        e.stopPropagation();
        navigateDate(false, "next");
      };
      nextButton.addEventListener("click", handler);
      clickHandlers.push({ button: nextButton, handler });
    }

    // Handler para seta dupla próxima (> > = ano próximo)
    if (next2Button) {
      const handler = (e: Event) => {
        e.stopPropagation();
        navigateDate(true, "next");
      };
      next2Button.addEventListener("click", handler);
      clickHandlers.push({ button: next2Button, handler });
    }

    // Handler para o label central (ano)
    const yearLabel = calendarEl.querySelector(
      ".react-calendar__navigation__label",
    );

    const handleYearClick = () => {
      const today = new Date();
      handleCalendarChangeWrapper(today);
    };

    if (yearLabel) {
      yearLabel.addEventListener("click", (e) => {
        e.stopPropagation();
        handleYearClick();
      });
    }

    return () => {
      clickHandlers.forEach(({ button, handler }) => {
        button.removeEventListener("click", handler);
      });
      if (yearLabel) {
        yearLabel.removeEventListener("click", handleYearClick);
      }
    };
  }, [displayDate]);

  return (
    <div className="py-2 flex flex-col justify-center items-center gap-3 transition-all duration-300">
      {/* <input id="toggle" type="checkbox" className="peer hidden" />
      <label
        htmlFor="toggle"
        className=" p-5 bg-white text-gray-700 hover:bg-white/50 hover:text-white duration-200 rounded-full cursor-pointer"
      >
        <FaCalendarAlt />
      </label> */}

      <Calendar
        onChange={handleCalendarChangeWrapper}
        onClickMonth={handleCalendarChangeWrapper}
        value={displayDate}
        activeStartDate={displayDate}
        onActiveStartDateChange={({
          activeStartDate,
        }: {
          activeStartDate: Date | null;
        }) => {
          if (activeStartDate) {
            setDisplayDate(new Date(activeStartDate));
            setDate(new Date(activeStartDate).toISOString());
          }
        }}
        view="year"
        className={
          "glass-panel transition-all w-60 p-0 duration-300 rounded-xl text-slate-100 " +
          /* collapsed calendar keeps navigation visible (approx 40px), view hidden */
          "h-[42px] peer-checked:h-[250px] overflow-hidden " +
          /* hide view container when collapsed, show when expanded */
          "[&_.react-calendar__viewContainer]:h-0 peer-checked:[&_.react-calendar__viewContainer]:h-[210px] " +
          "[&_.react-calendar__viewContainer]:overflow-hidden [&_.react-calendar__viewContainer]:transition-height [&_.react-calendar__viewContainer]:duration-300 " +
          "[&_.react-calendar__navigation]:bg-slate-900/35 [&_.react-calendar__navigation]:border-b [&_.react-calendar__navigation]:border-slate-400/20 " +
          "[&_.react-calendar__navigation_button]:text-slate-100 [&_.react-calendar__navigation_button:hover]:bg-teal-300/10 " +
          "[&_.react-calendar__tile]:text-slate-200 [&_.react-calendar__tile:enabled:hover]:bg-teal-300/10 [&_.react-calendar__tile--active]:!bg-teal-500 [&_.react-calendar__tile--active]:!text-white"
        }
      />
      <p className="action-accent rounded-full px-4 py-1 text-sm font-semibold tracking-wide capitalize text-slate-100 shadow-lg shadow-black/20">
        {new Date(displayDate).toLocaleString("pt-BR", { month: "long" })}
      </p>
    </div>
  );
};

export { Header };
