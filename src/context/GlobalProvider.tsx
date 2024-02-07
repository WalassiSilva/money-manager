import React, { createContext, useState } from "react";

interface DataProviderProps {
  children: React.ReactNode
}

export const DateContext = createContext<DataProviderProps>({});

export const DateProvider: React.FC<DataProviderProps> = ({ children }) => {

  const [date, setDate] = useState(new Date().toISOString());

  return (
    <DateContext.Provider value={{ date, setDate }}>
      {children}
    </DateContext.Provider>
  );
};