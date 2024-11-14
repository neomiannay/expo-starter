import { PokemonType } from "@/types/Pokemon";
import { ReactNode, createContext, useContext, useState } from "react";

type SearchContextType = {
  isFocused: boolean;
  setIsFocused: (isFocused: boolean) => void;
  pokemonName: string;
  setPokemonName: (name: string) => void;
  pokemonData: PokemonType | null;
  setPokemonData: (data: PokemonType | null) => void;
};

export const SearchContext = createContext<SearchContextType>(
  {} as SearchContextType
);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonData, setPokemonData] = useState<PokemonType | null>(null);

  return (
    <SearchContext.Provider
      value={{
        isFocused,
        setIsFocused,
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
