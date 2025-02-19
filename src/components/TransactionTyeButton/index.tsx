import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";

type Props = {
  currentType: number;
  switchType: () => void;
};

export default function TransatcionTypeButton({
  currentType,
  switchType,
}: Props) {
  return (
    <button onClick={switchType} className="group">
      {currentType ? (
        <span className="flex gap-2 px-4 py-2 items-center rounded-lg  bg-green-500 transition-colors duration-300">
          Incomes <FaArrowTrendUp className="group-hover:text-emerald-800 group-hover:duration-300" />
        </span>
      ) : (
        <span className="flex gap-2 px-4 py-2  rounded-lg items-center bg-red-500">
          Expenses <FaArrowTrendDown className="group-hover:text-red-800 group-hover:duration-300" />
        </span>
      )}
    </button>
  );
}
