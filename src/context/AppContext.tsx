import { createContext, useState, FC } from "react";
import AppContextInterface, { User } from "../types/AppContext";

export const AppContext = createContext<AppContextInterface | undefined>(
  undefined
);

interface AppContextProviderProps {
  children: React.ReactNode;
}

export const AppContextProvider: FC<AppContextProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<User>({
    id: 1,
    name: "tania",
    isAdmin: false,
  });

  return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  );
};
