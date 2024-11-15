import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Image,
  Keyboard,
} from "react-native";
import { useSearchContext } from "@/provider/SearchProvider";
import { useGlobalContext } from "@/provider/GlobalProvider";
import { fetchPokemonCardByName } from "@/api/pokemonTCGApi";
import SearchAnswer from "./SearchList";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  useAnimatedStyle,
  withSequence,
  withTiming,
  withSpring,
  useSharedValue,
} from "react-native-reanimated";
import { Audio } from "expo-av";
import { Sound } from "expo-av/build/Audio";
import { Link } from "expo-router";
import { useAsyncStorageContext } from "@/provider/AsyncStorageProvider";

const WhosThatPokemonImg = require("../../assets/images/whos-that-pokemon.png");
const PokedexImg = require("../../assets/images/pokedex-icon.png");

const PokemonSearch = () => {
  const { randomPokemon, randomPokemonName } = useGlobalContext();
  const { isFocused, pokemonName, setPokemonName, setPokemonData } =
    useSearchContext();
  const { storePokemonIds, getPokemonIds } = useAsyncStorageContext();
  const [error, setError] = useState("");
  const [sound, setSound] = useState<Sound | null>(null);

  const inputRef = useRef<TextInput>(null);

  // Animation shared values
  const blinkingColor = useSharedValue("#00549F");
  const shakeX = useSharedValue(0);

  useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocused]);

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const startErrorAnimations = () => {
    blinkingColor.value = withSequence(
      withTiming("#FF0000", { duration: 0 }),
      withTiming("#00549F", { duration: 1000 })
    );

    shakeX.value = withSequence(
      withSpring(-5, { damping: 3, stiffness: 3000, duration: 125 }),
      withSpring(5, { damping: 3, stiffness: 3000, duration: 125 }),
      withSpring(-5, { damping: 3, stiffness: 3000, duration: 125 }),
      withSpring(0, { damping: 3, stiffness: 3000, duration: 125 })
    );
  };

  const playSound = async () => {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/audio/fuck.mp3")
    );
    setSound(sound);

    console.log("Playing Sound");
    await sound.playAsync();
  };

  const fetchCorrectPokemon = async () => {
    try {
      const pokemonId = randomPokemon?.pokedex_id;
      console.log(pokemonId);

      const data = await fetchPokemonCardByName(pokemonName.trim());

      if (data.status === 404) {
        throw new Error("Pokémon non trouvé");
      } else {
        setPokemonData(data);
        setError("");

        if (pokemonId) {
          const existingIds = await getPokemonIds();
          const updatedIds = [...existingIds, pokemonId];
          await storePokemonIds(updatedIds);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = () => {
    const trimmedPokemonName = pokemonName.trim();

    console.log(randomPokemon);

    if (trimmedPokemonName.toLowerCase() === randomPokemonName.toLowerCase()) {
      fetchCorrectPokemon();
    } else {
      playSound();
      setError("Pokémon non trouvé");
      setPokemonData(null);
      startErrorAnimations();
    }
  };

  const imageUri = useMemo(() => {
    return randomPokemon?.sprites?.regular;
  }, [randomPokemon]);

  const animatedPokemonStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: shakeX.value }, { translateX: "-50%" }],
    };
  });

  const animatedPokemon2Style = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: shakeX.value },
        { translateX: "-48%" },
        { translateY: -10 },
      ],
      tintColor: blinkingColor.value,
    };
  });

  return (
    <LinearGradient colors={["#ff0000", "#ffcc00"]} style={styles.container}>
      <Link style={styles.link} href={"/pokedex"}>
        <Image source={PokedexImg} style={styles.pokedex} />
      </Link>
      <View
        style={styles.searchWrapper}
        onTouchStart={() => Keyboard.dismiss()}
      >
        <View style={styles.imageWrapper}>
          <Image source={WhosThatPokemonImg} style={styles.imgTitle} />
          {imageUri && (
            <Animated.Image
              source={{ uri: imageUri }}
              style={[
                styles.pokemonDefault,
                styles.pokemon1,
                animatedPokemonStyle,
              ]}
            />
          )}
          {imageUri && (
            <Animated.Image
              source={{ uri: imageUri }}
              style={[
                styles.pokemonDefault,
                styles.pokemon2,
                animatedPokemon2Style,
              ]}
            />
          )}
        </View>
        <View style={styles.inputWrapper}>
          <TextInput
            ref={inputRef}
            placeholder="En français le Pokemon stp !!"
            placeholderTextColor={"#000"}
            value={pokemonName}
            returnKeyType="search"
            autoCorrect={false}
            onChangeText={setPokemonName}
            onSubmitEditing={handleSearch}
            style={styles.input}
            onTouchStart={(e) => e.stopPropagation()}
          />
          <Text>Indice: {randomPokemonName}</Text>
        </View>
        {!!error && <Text>{error}</Text>}
      </View>
      <SearchAnswer />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
    height: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  link: {
    position: "absolute",
    top: 60,
    right: 0,
    width: 70,
    height: 70,
    zIndex: 1,
  },
  pokedex: {
    position: "absolute",
    top: 60,
    right: 0,
    width: 70,
    height: 70,

    // aspectRatio: 1.5,
    zIndex: 1,
  },
  searchWrapper: {
    position: "relative",
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "green",
  },
  imageWrapper: {
    position: "relative",
    display: "flex",
    justifyContent: "flex-end",
    width: "100%",
    height: "100%",
  },
  imgTitle: {
    width: "100%",
    aspectRatio: 4 / 3,
    backgroundSize: "contain",
    marginTop: "100%",
    marginBottom: 20,
  },
  pokemonDefault: {
    position: "absolute",
    top: 20,
    left: "50%",
    width: "100%",
    aspectRatio: 512 / 512,
  },
  pokemon1: {
    zIndex: 1,
    tintColor: "#525355",
  },
  pokemon2: {
    zIndex: 2,
  },
  inputWrapper: {
    position: "absolute",
    left: 0,
    bottom: "35%",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    gap: 10,
    padding: 10,
  },
  input: {
    width: "100%",
    fontSize: 18,
    borderRadius: 5,
    backgroundColor: "#f9f9f9",
    padding: 10,
  },
});

export default PokemonSearch;
