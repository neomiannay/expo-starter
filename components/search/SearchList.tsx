import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import PokemonModal from "./PokemonModal";
import { useSearchContext } from "@/provider/SearchProvider";

const SearchList = () => {
  const { setIsFocused, pokemonData } = useSearchContext();
  const [modalVisible, setModalVisible] = React.useState(false);

  useEffect(() => {
    if (pokemonData) {
      setModalVisible(true);
    }
  }, [pokemonData]);

  const handleCloseModal = () => {
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

export default SearchList;
