import { useAsyncStorageContext } from "@/provider/AsyncStorageProvider";
import { Text, View, StyleSheet, Dimensions, Pressable } from "react-native";
import { useEffect, useState } from "react";
import { fetchPokemon } from "@/api/pokemonApi";
import PokemonCard from "@/components/PokemonCard";
import PokemonModal from "@/components/search/PokemonModal";
import { PokemonType } from "@/types/Pokemon";

export default function AboutScreen() {
  const { getPokemonIds } = useAsyncStorageContext();
  const [pokemonIds, setPokemonIds] = useState<number[]>([]);
  const [pokemonData, setPokemonData] = useState<any[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const loadPokemonIds = async () => {
      const ids = await getPokemonIds();
      setPokemonIds(ids);
    };

    loadPokemonIds();
  }, []);

  useEffect(() => {
    const fetchPokemons = async () => {
      const fetchedData = await Promise.all(
        pokemonIds.map(async (id) => {
          const data = await fetchPokemon(id.toString());
          return data;
        })
      );
      setPokemonData(fetchedData);
    };

    if (pokemonIds.length > 0) {
      fetchPokemons();
    }
  }, [pokemonIds]);

  const cardWidth = Dimensions.get("window").width / 2 - 20;

  const handleCardPress = (pokemon: PokemonType) => {
    setSelectedPokemon(pokemon);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedPokemon(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Pokédex</Text>
      <View style={styles.list}>
        {pokemonData.map((pokemon) => (
          <Pressable onPress={() => handleCardPress(pokemon)}>
            <PokemonCard
              key={pokemon.pokedex_id}
              name={pokemon.name.fr}
              type={pokemon.types[0].name}
              sprite={pokemon.sprites.regular}
              style={{ width: cardWidth }}
            />
          </Pressable>
        ))}
      </View>
      <PokemonModal
        visible={modalVisible}
        close={handleCloseModal}
        pokemons={selectedPokemon}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    flex: 1,
    width: "100%",
    backgroundColor: "#ffffff",
  },
  text: {
    color: "#000000",
    fontSize: 20,
    marginTop: 60,
    marginBottom: 20,
  },
  list: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
  },
});
