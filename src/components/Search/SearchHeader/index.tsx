import { SearchHeaderProps } from "../../../Types";

export const SearchHeader = ({ resultsLength, searchSum }:SearchHeaderProps) => {
  return (
    <section className="p-4">
      <h4 className="text-sm text-center">Search Results: {resultsLength}</h4>
      <h4 className="text-sm text-center">Total Value: {searchSum}</h4>
    </section>
  );
};
