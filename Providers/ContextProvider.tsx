"use client";

import { ITodo, TOperation } from "@/interfaces";
import { defaultActiveTodo } from "@/static";
import { createContext, ReactNode, useContext, useMemo, useState } from "react";

type ProviderContextType = {
  operation: TOperation;
  setOperation: (operation: TOperation) => void;
  activeTodo: ITodo;
  setActiveTodo: (todo: ITodo) => void;
};

const OperationContext = createContext<ProviderContextType | undefined>(
  undefined
);

export const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [activeTodo, setActiveTodo] = useState<ITodo>(defaultActiveTodo);
  const [operation, setOperation] = useState<TOperation>("add");
  const value = useMemo(
    () => ({ activeTodo, setActiveTodo, setOperation, operation }),
    [activeTodo, operation]
  );

  return (
    <OperationContext.Provider value={value}>
      {children}
    </OperationContext.Provider>
  );
};
export function useContextProvider() {
  const ctx = useContext(OperationContext);
  if (!ctx) throw new Error("useOperation must be used within ContextProvider");
  return ctx;
}
