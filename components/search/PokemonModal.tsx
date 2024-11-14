import { PokemonType } from "@/types/Pokemon";
import React, { useEffect, useMemo, useState } from "react";
import { Modal, View, Text, Image, StyleSheet, Button, EventSubscription } from "react-native";
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

  // const [{ x, y, z }, setData] = useState({
  //   x: 0,
  //   y: 0,
  //   z: 0,
  // });
  // const [subscription, setSubscription] = useState<Subscription | null>(null);

  // const _slow = () => Gyroscope.setUpdateInterval(1000);
  // const _fast = () => Gyroscope.setUpdateInterval(16);

  // const _subscribe = () => {
  //   setSubscription(
  //     Gyroscope.addListener(gyroscopeData => {
  //       setData(gyroscopeData);
  //     })
  //   );
  // };

  // const _unsubscribe = () => {
  //   subscription && subscription.remove();
  //   setSubscription(null);
  // };

  // useEffect(() => {
  //   _subscribe();
  //   return () => _unsubscribe();
  // }, []);

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
        // <Image
        //       source={{ uri: `${pokemon?.image}/high.png` }}
        //       style={styles.image}
        //     />
        <Card imageUrl={`${pokemon?.image}/high.png`} />
      }
      headerBackgroundColor={{ dark: "#883a3a", light: "#FFFFFF" }}>
        {/* <View style={styles.modalContainer}> */}
          {/* <View style={styles.modalContent}> */}
          {/* <Text style={styles.text}>Gyroscope:</Text>
          <Text style={styles.text}>x: {x}</Text>
          <Text style={styles.text}>y: {y}</Text>
          <Text style={styles.text}>z: {z}</Text> */}
            <Image
              source={{ uri: `${pokemon?.image}/high.png` }}
              style={styles.image}
            />
            {/* <Text style={styles.name}>{pokemon.name.fr}</Text> */}
            {/* <Text style={styles.type}>{pokemon.category}</Text> */}
            <Button title="Fermer" onPress={close} />
          {/* </View> */}
        {/* </View> */}
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
    color: "#fff",
  }
});

export default PokemonModal;
