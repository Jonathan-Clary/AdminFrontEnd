import React, { createContext, useState, useContext, ReactNode } from 'react';

interface GlobalContextProps {
  ticketUpdated: boolean;
  setTicketUpdated: () => void;
  showToast: boolean;
  toastMessage: string;
  toastBg: string;
  handleToastShow: (message: string, bg: string) => void;
  handleToastHide: () => void;
}

const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);
export const GlobalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [ticketUpdated, setTicketUpdated] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [toastBg, setToastBg] = useState<string>('light');
  const toggleTicketUpdated = () => {
    setTicketUpdated(prevState => !prevState);
  };

  const handleToastShow = (message: string, bg: string) => {
    setToastBg(bg);
    setToastMessage(message);
    setShowToast(true);
  };

  const handleToastHide = () => {
    setShowToast(false);
    setToastMessage('');
  }

  

  return (
    <GlobalContext.Provider value={{ ticketUpdated, setTicketUpdated: toggleTicketUpdated, showToast, toastMessage, handleToastShow, handleToastHide, toastBg }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = (): GlobalContextProps => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  }
  return context;
};