import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext } from "react";

type AsyncStorageContextType = {
  storePokemonIds: (pokemonIds: number[]) => void;
  getPokemonIds: () => Promise<number[]>;
};

export const AsyncStorageContext = createContext<AsyncStorageContextType>(
  {} as AsyncStorageContextType
);

export const AsyncStorageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const storePokemonIds = async (pokemonIds: number[]) => {
    try {
      await AsyncStorage.setItem("pokemonIds", JSON.stringify(pokemonIds));
    } catch (error) {
      console.error(error);
    }
  };

  const getPokemonIds = async () => {
    try {
      const pokemonIds = await AsyncStorage.getItem("pokemonIds");
      return pokemonIds ? JSON.parse(pokemonIds) : [];
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  return (
    <AsyncStorageContext.Provider
      value={{
        storePokemonIds,
        getPokemonIds,
      }}
    >
      {children}
    </AsyncStorageContext.Provider>
  );
};

export const useAsyncStorageContext = () => {
  const context = useContext(AsyncStorageContext);
  if (!context)
    throw Error(
      "useAsyncStorageContext must be used inside a `AsyncStorageProvider`"
    );
  return context;
};
