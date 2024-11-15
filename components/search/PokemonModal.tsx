import { PokemonType } from "@/types/Pokemon";
import React, { useMemo } from "react";
import { Modal, View, Text, Image, StyleSheet, Button } from "react-native";
import GestureRecognizer from "react-native-swipe-gestures";

type PokemonModalProps = {
  visible: boolean;
  close: () => void;
  pokemons: PokemonType | null;
};

const PokemonModal = ({ visible, close, pokemons }: PokemonModalProps) => {
  if (!pokemons || pokemons.length == 0) return null;

  const pokemon = useMemo(() => {
    let p = pokemons.reduce((acc, curr) => {
      if (curr.image) {
        return curr;
      }
      return acc;
    });

    return p;
  }, [pokemons]);

  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
  };

  return (
    <GestureRecognizer onSwipeDown={close} config={config}>
      <Modal
        animationType="slide"
        visible={visible}
        presentationStyle="pageSheet"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Image
              source={{ uri: `${pokemon?.image}/high.png` }}
              style={styles.image}
            />
            {/* <Text style={styles.name}>{pokemon.name.fr}</Text> */}
            {/* <Text style={styles.type}>{pokemon.category}</Text> */}
            <Button title="Fermer" onPress={close} />
          </View>
        </View>
      </Modal>
    </GestureRecognizer>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(250, 156, 156)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  image: {
    width: "100%",
    marginBottom: 10,
    aspectRatio: 600 / 825,
    position: "relative",
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

export default PokemonModal;
