import { PokemonType } from "@/types/Pokemon";
import React, { useEffect, useMemo, useState } from "react";
import { Modal, View, Text, Image, StyleSheet, Button, EventSubscription, Pressable } from "react-native";
import GestureRecognizer from "react-native-swipe-gestures";
import ParallaxScrollView from "../ParallaxScrollView";
import Card from "../Card";
import { useGlobalContext } from "@/provider/GlobalProvider";

type PokemonModalProps = {
  visible: boolean;
  close: () => void;
  pokemons: PokemonType | null;
};

const PokemonModal = ({ visible, close, pokemons }: PokemonModalProps) => {
  if (!pokemons || pokemons.length == 0) return null;
  const { randomPokemon } = useGlobalContext(); 
  
  const imageUri = useMemo(() => {
    return randomPokemon?.sprites?.regular;
  }, [randomPokemon]);

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
    <GestureRecognizer config={config}>
      <Modal
      animationType="slide"
      visible={visible}
      presentationStyle="pageSheet"
      style={{backgroundColor: 'red'}}
    >
      <ParallaxScrollView
      headerImage={
        <Card imageUrl={`${pokemon?.image}/high.png`} />
      }
      headerBackgroundColor={{ dark: "#883a3a", light: "#c7bebe" }}
      >
        <View style={styles.modalContentHeader}>
          <View style={styles.topBar} />
          <Pressable 
          style={[styles.button]}
          onPress={close}>
            <Text style={styles.text}>Fermer</Text>
          </Pressable>
        </View>
        <View style={styles.modalContent}>
          <Text style={styles.name}>{randomPokemon?.name.fr}</Text>
          <View style={{ flexDirection: "row", justifyContent: "center", gap: 10 }}>
            <Text style={styles.subtitle}>{randomPokemon?.name.en}</Text>
            <Text style={styles.subtitle}>/</Text>
            <Text style={styles.subtitle}>{randomPokemon?.name.jp}</Text>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "center", gap: 10 }}>
            {randomPokemon?.types.map((type) => (
              <Image
              key={type.name}
              source={{ uri: type.image }}
              style={{ width: 20, height: 20, borderRadius: 50, marginTop: 5 }}
            />
            ))}
          </View>
          <Image
            source={{ uri: imageUri }}
            style={styles.image}
          />
          <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 10 }}>
            <Text style={styles.subtitle}>Génération: {randomPokemon?.generation}</Text>
            <Text style={styles.subtitle}>Catégorie: {randomPokemon?.category}</Text>
          </View>
        </View>
      </ParallaxScrollView>
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
  modalContentHeader: {
    position: "absolute",
    width: '100%',
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: "#fff4f4",
    alignItems: "center",
    shadowColor: '#171717',
    shadowOffset: {width: 2, height: 10},
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  topBar: {
    width: 50,
    height: 5,
    backgroundColor: "#ccc",
    borderRadius: 5,
    alignSelf: "center",
    position: "absolute",
    top: 10,
  },
  modalContent: {
    position: "relative",
    width: "100%",
    padding: 20,
    marginTop: 100,

  },
  image: {
    width: "100%",
    aspectRatio: 512 / 512,
    marginBottom: 10,
    position: "relative",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {},
  type: {
    fontSize: 14,
    color: "#555",
  },
  text: {
    fontSize: 18,
    color: "#bdbbbb",
  },
  button: {
    position: "relative",
    zIndex: 100,
    padding: 10,
    borderWidth: 2,
    borderColor: "#bdbbbb",
    borderRadius: 5,
    height: 45,
    alignItems: "center",
    alignSelf: "center",
    boxSizing: "border-box",
    marginTop: 5,
  },
});

export default PokemonModal;
