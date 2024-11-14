import { PokemonType } from "@/types/Pokemon";
import React, { useEffect, useMemo, useState } from "react";
import { Modal, View, Text, Image, StyleSheet, Button, EventSubscription, Pressable } from "react-native";
import GestureRecognizer from "react-native-swipe-gestures";
import ParallaxScrollView from "../ParallaxScrollView";
import { Gyroscope } from 'expo-sensors';
import { Subscription } from "expo-sensors/build/Pedometer";
import Card from "../Card";

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
      style={{backgroundColor: 'red'}}
    >
      <ParallaxScrollView
      headerImage={
        <Card imageUrl={`${pokemon?.image}/high.png`} />
      }
      headerBackgroundColor={{ dark: "#883a3a", light: "#FFFFFF" }}
      >
        <View style={styles.topBar} />
        <Pressable 
        style={[styles.button]}
        onPress={close}>
          <Text style={styles.text}>Fermer</Text>
        </Pressable>
        <Image
          source={{ uri: `${pokemon?.image}/high.png` }}
          style={styles.image}
        />
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
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
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
  text: {
    fontSize: 18,
    color: "#ccc",
  },
  button: {
    position: "relative",
    zIndex: 100,
    padding: 10,
    borderWidth: 2,
    borderColor: "#ccc",
    borderRadius: 5,
    height: 45,
    alignItems: "center",
    alignSelf: "center",
  },
});

export default PokemonModal;
