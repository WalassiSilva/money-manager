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