import React, { createContext, useContext, useState } from "react";

interface DataProviderProps {
  children: React.ReactNode;
}
interface DateContext {
  date: string;
  setDate: React.Dispatch<React.SetStateAction<string>>;

}

export const DateContext = createContext<DateContext | null>(null);

export const DateProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [date, setDate] = useState(new Date().toISOString());
  return (
    <DateContext.Provider value={{ date, setDate }}>
      {children}
    </DateContext.Provider>
  );
};

export function useDateContext() {
  const context = useContext(DateContext);
  if (!context) {
    throw new Error("useDateContext must be used within a DateContextProvier");
  }
  return context;
}
