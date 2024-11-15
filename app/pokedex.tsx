import { useAsyncStorageContext } from "@/provider/AsyncStorageProvider";
import { Text, View, StyleSheet, Dimensions, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { fetchPokemon } from "@/api/pokemonApi";
import PokemonCard from "@/components/PokemonCard";
import { Image } from "expo-image";

export default function AboutScreen() {
  const { getPokemonIds } = useAsyncStorageContext();
  const [pokemonIds, setPokemonIds] = useState<number[]>([]);
  const [pokemonData, setPokemonData] = useState<any[]>([]);

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

  const cardWidth = Dimensions.get("window").width / 2 - 40;

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/pokedex-bg.png")}
        style={{ width: "100%", height: "100%", position: "absolute" }}
      />
      <Text style={styles.text}>Pokédex</Text>
      <ScrollView>
        <View style={styles.list}>
          {pokemonData.map((pokemon) => (
            <PokemonCard
              key={pokemon.pokedex_id}
              name={pokemon.name.fr}
              type={pokemon.types[0].name}
              sprite={pokemon.sprites.regular}
              style={{ width: cardWidth, margin: 20 }}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#ffffff",
    backgroundImage: "url('../assets/images/pokedex-bg.png')",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
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
