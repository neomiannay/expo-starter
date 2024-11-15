import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

type PokemonCardProps = {
  name: string;
  type: string;
  sprite: string;
  style?: any;
};

const PokemonCard: React.FC<PokemonCardProps> = ({
  name,
  type,
  sprite,
  style,
}) => {
  return (
    <View style={[styles.card, style]}>
      <Image source={{ uri: sprite }} style={styles.image} />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.type}>{type}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    margin: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.62,
    elevation: 4,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  type: {
    fontSize: 14,
    color: "#555",
  },
});

export default PokemonCard;
