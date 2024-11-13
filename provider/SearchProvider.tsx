import { ReactNode, createContext, useContext, useState } from "react";

type SearchContextType = {
  pokemonName: string;
  setPokemonName: (name: string) => void;
  pokemonData: any;
  setPokemonData: (data: any) => void;
};

export const SearchContext = createContext<SearchContextType>(
  {} as SearchContextType
);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonData, setPokemonData] = useState<any>(null);

  return (
    <SearchContext.Provider
      value={{
        pokemonName,
        setPokemonName,
        pokemonData,
        setPokemonData,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (!context)
    throw Error("useSearchContext must be used inside a `SearchProvider`");
  return context;
};
