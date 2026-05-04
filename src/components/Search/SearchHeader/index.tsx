import { SearchHeaderProps } from "../../../Types";

export const SearchHeader = ({
  resultsLength,
  searchSum,
}: SearchHeaderProps) => {
  return (
    <section className="glass-panel-strong rounded-2xl p-4 mb-2">
      <h4 className="text-xs sm:text-sm text-center text-slate-300">
        Search Results: {resultsLength}
      </h4>
      <h4 className="text-xs sm:text-sm md:text-base text-center text-slate-300">
        Total Value: {searchSum}
      </h4>
    </section>
  );
};
