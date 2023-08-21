import { useContext } from "react";
import AppContextInterface from "../types/AppContext";
import { AppContext } from "../context/AppContext";

export const useAppContext = (): AppContextInterface => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within a AppProvider");
  }
  return context;
};
