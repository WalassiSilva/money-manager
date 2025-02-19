import { useState } from "react";
export function useTransactionType() {
  const [transactionsType, setTransactionsType] = useState(false);
  const currentType = transactionsType ? 1 : 0;

  const switchType = () => {
    setTransactionsType(!transactionsType);
  };

  return { currentType, switchType };
}
