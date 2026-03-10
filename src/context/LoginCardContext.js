import { createContext, useMemo, useState } from "react";
import LoginCard from "../components/LoginCard/LoginCard";

export const LoginCardContext = createContext(null);

export default function LoginCardProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const openLoginCard = () => {
    setIsOpen(true);
  };

  const closeLoginCard = () => {
    setIsOpen(false);
  };

  const value = useMemo(
    () => ({
      isOpen,
      openLoginCard,
      closeLoginCard,
    }),
    [isOpen]
  );

  return (
    <LoginCardContext.Provider value={value}>
      {children}
      {isOpen && <LoginCard onClose={closeLoginCard} />}
    </LoginCardContext.Provider>
  );
}