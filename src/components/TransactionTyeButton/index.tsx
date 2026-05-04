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
    <button type="button" onClick={switchType} className="group">
      {currentType ? (
        <span className="flex items-center gap-2 rounded-lg border border-emerald-300/20 bg-gradient-to-r from-emerald-400/55 via-emerald-500/45 to-teal-500/45 px-4 py-2 font-bold text-slate-50 shadow-lg shadow-black/20 transition-all duration-300 hover:brightness-110 hover:shadow-black/30">
          Incomes{" "}
          <FaArrowTrendUp className="text-white/85 transition-transform duration-300 group-hover:translate-y-[-1px]" />
        </span>
      ) : (
        <span className="flex items-center gap-2 rounded-lg border border-rose-200/20 bg-gradient-to-r from-rose-500/55 via-rose-600/25 to-slate-800/55 px-4 py-2 font-bold text-slate-50 shadow-lg shadow-black/20 transition-all duration-300 hover:brightness-110 hover:shadow-black/30">
          Expenses{" "}
          <FaArrowTrendDown className="text-white/85 transition-transform duration-300 group-hover:translate-y-[1px]" />
        </span>
      )}
    </button>
  );
}
