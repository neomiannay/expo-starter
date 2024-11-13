import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import PokemonModal from "./PokemonModal";
import { useSearchContext } from "@/provider/SearchProvider";

const SearchList = () => {
  const { pokemonData } = useSearchContext();
  const [modalVisible, setModalVisible] = React.useState(false);

  React.useEffect(() => {
    if (pokemonData) {
      setModalVisible(true);
    }
  }, [pokemonData]);

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <GestureHandlerRootView>
      <PokemonModal
        visible={modalVisible}
        close={handleCloseModal}
        pokemon={pokemonData}
      />
    </GestureHandlerRootView>
  );
};

export default SearchList;
