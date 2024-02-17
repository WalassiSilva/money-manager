export interface CategoriesProps {
  id: number,
  title: string
}

export interface TransactionsProps {
  id: number;
  title: string;
  value: number;
  day: string;
  category_id: string;
  type: number;
}

export interface BalanceProps {
  incomes: number;
  expenses: number;
  result: number;
}

export interface DataProps {
  year: number | string;
  month: number | string;
}

export const colors = ["#2c3d57", "#115e59", "##ef4444", "#d97706", "#000",
  "#422006", "#065f46", "#2e1065", "#22c55e", "#c084fc"];

export interface DateContextProps {
  date: string;
  setDate: (c: string) => void;
}

export interface SearchHeaderProps {
  resultsLength: number;
  searchSum: number | string;
}