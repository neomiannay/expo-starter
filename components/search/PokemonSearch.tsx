import React, { useState, useEffect, useRef } from "react";
import { View, TextInput, Button, Text, StyleSheet, Image } from "react-native";
import { useSearchContext } from "@/provider/SearchProvider";
import SearchList from "./SearchList";
import { useGlobalContext } from "@/provider/GlobalProvider";

const PokemonSearch = () => {
  const { randomPokemon, randomPokemonName } = useGlobalContext();
  const { isFocused, pokemonName, setPokemonName, setPokemonData } =
    useSearchContext();
  const [error, setError] = useState("");
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    console.log("randomPokemon", randomPokemon);
    console.log("randomPokemonName", randomPokemonName);
  }, [randomPokemon]);

  useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocused]);

  const handleSearch = () => {
    if (pokemonName.toLowerCase() === randomPokemonName.toLowerCase()) {
      setPokemonData(randomPokemon);
    } else {
      setError("Pokémon non trouvé");
      setPokemonData(null);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchWrapper}>
        <Image
          source={require("../../assets/images/pokecon.png")}
          style={{ width: "100%", height: 200 }}
        />
        <TextInput
          ref={inputRef}
          placeholder="What's that Pokemon ?"
          value={pokemonName}
          returnKeyType="search"
          autoCorrect={false}
          onChangeText={setPokemonName}
          onSubmitEditing={handleSearch}
          style={styles.input}
        />
        <Button title="Rechercher" onPress={handleSearch} />
      </View>
      {error && <Text>{error}</Text>}
      <SearchList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
  searchWrapper: {
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
  input: {
    width: "100%",
    fontSize: 18,
    backgroundColor: "#f9f9f9",
    marginBottom: 20,
  },
});

export default PokemonSearch;
