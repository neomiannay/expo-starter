import React from "react";
import { View, StyleSheet } from "react-native";
import { SearchContext, SearchProvider } from "@/provider/SearchProvider";

import PokemonSearch from "@/components/search/PokemonSearch";

export default function Search() {
  return (
    <View style={styles.container}>
      <SearchProvider>
        <PokemonSearch />
      </SearchProvider>
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
