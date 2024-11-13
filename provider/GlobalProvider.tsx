import React, { createContext, useContext, PropsWithChildren } from "react";

import { SearchProvider } from "./SearchProvider";

export type PanelType = {
  key: string;
} & Record<string, any>;

type GlobalContextType = {};

export const GlobalContext = createContext<GlobalContextType | null>(null);

export type BaseProviderProps = PropsWithChildren<{}>;

export const GlobalProvider = ({ children }: BaseProviderProps) => {
  const providers = [SearchProvider];
  return (
    <GlobalContext.Provider value={{}}>
      {providers.reverse().reduce(
        (children, Provider) => (
          <Provider> {children}</Provider>
        ),
        children
      )}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context)
    throw Error("useGlobalContext must be used inside a `GlobalProvider`");
  return context;
};
