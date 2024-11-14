import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import PokemonModal from "./PokemonModal";
import { useSearchContext } from "@/provider/SearchProvider";
import { useGlobalContext } from "@/provider/GlobalProvider";

const SearchAnswer = () => {
  const { randomizePokemon } = useGlobalContext();
  const { setIsFocused, pokemonData } = useSearchContext();
  const [modalVisible, setModalVisible] = React.useState(false);

  useEffect(() => {
    if (pokemonData) {
      setModalVisible(true);
    }
  }, [pokemonData]);

  const handleCloseModal = () => {
    randomizePokemon();
    setModalVisible(false);
    setIsFocused(false);
  };

  return (
    // <GestureHandlerRootView>
    <PokemonModal
      visible={modalVisible}
      close={handleCloseModal}
      pokemons={pokemonData}
    />
    // </GestureHandlerRootView>
  );
};

export default SearchAnswer;
