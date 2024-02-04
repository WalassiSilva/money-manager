import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";

export const ScrollUpButton = () => {
  const [scrollUp, setScrollUp] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setScrollUp(true);
      } else {
        setScrollUp(false);
      }
    });

  }, []);

  const handleScrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <div>
      {scrollUp && (
        <button
          className={"rotate-90 rounded-full m-3 p-2 bg-slate-300 text-gray-800 fixed right-1 bottom-8 "}
          onClick={handleScrollUp}><FaArrowLeft /></button>
      )}
    </div>
  );
};
