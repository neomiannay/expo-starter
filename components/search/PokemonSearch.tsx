import React, { useState, useEffect, useRef } from "react";
import { View, TextInput, Button, Text, StyleSheet, Image } from "react-native";
import { fetchPokemonCardByName } from "@/api/pokemonTCGApi";
import { useSearchContext } from "@/provider/SearchProvider";
import SearchList from "./SearchList";

const PokemonSearch = () => {
  const { isFocused, pokemonName, setPokemonName, setPokemonData } =
    useSearchContext();
  const [error, setError] = useState("");
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    console.log("isFocused", isFocused);
    // console.log("inputRef", inputRef.current);

    if (isFocused && inputRef.current) {
      // console.log("focus");

      inputRef.current.focus();
    }
  }, [isFocused]);

  const handleSearch = async () => {
    try {
      console.log(pokemonName);
      const data = await fetchPokemonCardByName(pokemonName);
      console.log(data);
      
      if (data.status === 404) {
        throw new Error("Pokémon n'existe pas");
      } else {
        setPokemonData(data);
        setError("");
      }
    } catch (err) {
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
