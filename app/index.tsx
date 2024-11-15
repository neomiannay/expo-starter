import React from "react";
import { View, StyleSheet } from "react-native";

import PokemonSearch from "@/components/search/PokemonSearch";

export default function Search() {
  return (
    <View style={styles.container}>
      <PokemonSearch />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
});
