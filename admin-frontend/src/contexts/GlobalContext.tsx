import React, { createContext, useState, useContext, ReactNode } from 'react';

interface GlobalContextType {
  ticketUpdated: boolean;
  setTicketUpdated: () => void;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);
export const GlobalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [ticketUpdated, setTicketUpdated] = useState<boolean>(false);


  const toggleTicketUpdated = () => {
    setTicketUpdated(prevState => !prevState);
  };

  return (
    <GlobalContext.Provider value={{ ticketUpdated, setTicketUpdated: toggleTicketUpdated }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  }
  return context;
};