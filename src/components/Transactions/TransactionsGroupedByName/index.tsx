import { useEffect, useState } from "react";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { TransactionsCard } from "../TransactionsCard";
import { Link } from "react-router-dom";
import { TransactionsProps } from "../../../Types";

type FilteredItems = {
  [key: string]: {
    items: TransactionsProps[];
    total: number;
  };
};
type ItemSearchProps = {
  searchText: string;
  transactions: TransactionsProps[];
};

export default function ItemSearch({
  searchText,
  transactions,
}: ItemSearchProps) {
  const [filteredItems, setFilteredItems] = useState<FilteredItems>({});

  const lowerSearch = searchText.toLowerCase();
  useEffect(() => {
    // Filtra os itens pelo nome digitado
    const filtered = transactions.filter((item) =>
      item.title.toLowerCase().includes(lowerSearch)
    );

    // Agrupa os itens por mês e ano + soma total
    const groupedItems = filtered.reduce((acc, item) => {
      const date = parseISO(item.day);
      const monthYear = format(date, "MMMM yyyy", { locale: ptBR }); // Ex: "Fevereiro 2025"

      if (!acc[monthYear]) {
        acc[monthYear] = { items: [], total: 0 };
      }

      acc[monthYear].items.push(item);
      acc[monthYear].total += item.value;

      return acc;
    }, {});

    setFilteredItems(groupedItems);
  }, [transactions]);
  return (
    <div className="p-4 max-w-md mx-auto">
      <div className="mt-4">
        {Object.keys(filteredItems).length > 0 ? (
          Object.entries(filteredItems).map(([monthYear, data]) => (
            <div key={monthYear} className="mt-4">
              <h3 className="text-md font-bold capitalize flex justify-between mr-8">
                <span> {monthYear}</span>
                <span> Total: R$ {data.total.toFixed(2)}</span>
              </h3>
              <ul className="list-disc ml-4">
                {data.items.map((item) => (
                  <Link to={`/transactions/${item.id}`} key={item.id}>
                    <TransactionsCard
                      id={item.id}
                      title={item.title}
                      value={item.value}
                      day={item.day}
                      category_id={item.category_id}
                      type={item.type}
                    />
                  </Link>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p className="text-gray-500 mt-4">Nenhum resultado encontrado.</p>
        )}
      </div>
    </div>
  );
}
