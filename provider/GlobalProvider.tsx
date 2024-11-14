import React, {
  createContext,
  useContext,
  PropsWithChildren,
  useState,
  useEffect,
} from "react";

import { SearchProvider } from "./SearchProvider";
import { PokemonType } from "@/types/Pokemon";
import { fetchPokemon } from "@/api/pokemonApi";

export type PanelType = {
  key: string;
} & Record<string, any>;

type GlobalContextType = {
  randomPokeId: number;
  setRandomPokeId: (id: number) => void;
  randomPokemon: PokemonType | null;
  setRandomPokemon: (pokemon: PokemonType | null) => void;
  randomPokemonName: string;
  setRandomPokemonName: (name: string) => void;
};

export const GlobalContext = createContext<GlobalContextType | null>(null);

export type BaseProviderProps = PropsWithChildren<{
  children: React.ReactNode;
}>;

export const GlobalProvider = ({ children }: BaseProviderProps) => {
  const [randomPokeId, setRandomPokeId] = useState<number>(0);
  const [randomPokemon, setRandomPokemon] = useState<PokemonType | null>(null);
  const [randomPokemonName, setRandomPokemonName] = useState<string>("");

  useEffect(() => {
    const id = Math.floor(Math.random() * 528) + 1;
    setRandomPokeId(id);
  }, []);

  useEffect(() => {
    const fetchRandomPokemon = async () => {
      try {
        const response = await fetchPokemon(randomPokeId.toString());
        setRandomPokemon(response);
        setRandomPokemonName(response.name.fr);
      } catch (error) {
        console.error(error);
      }
    };

    if (randomPokeId !== 0) {
      fetchRandomPokemon();
    }
  }, [randomPokeId]);

  const providers = [SearchProvider];
  return (
    <GlobalContext.Provider
      value={{
        randomPokeId,
        setRandomPokeId,
        randomPokemon,
        setRandomPokemon,
        randomPokemonName,
        setRandomPokemonName,
      }}
    >
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
