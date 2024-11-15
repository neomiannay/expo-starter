// Card.tsx
import React, { useState, useEffect } from "react";
import { StyleSheet, View, Animated, Text } from "react-native";
import { DeviceMotion } from "expo-sensors";

type CardProps = {
  imageUrl: string | null;
};

export default function Card({ imageUrl }: CardProps) {
  // State for 3D rotation
  const [rotationX, setRotationX] = useState(new Animated.Value(0));
  const [rotationY, setRotationY] = useState(new Animated.Value(0));

  // Set up the gyroscope listener
  useEffect(() => {
    DeviceMotion.setUpdateInterval(50);

    const subscription = DeviceMotion.addListener(({ rotation }) => {
      if (!rotation) return;
      const { beta, gamma } = rotation; // Roll and pitch

      // Map beta and gamma values to card rotation (scaled down for subtle movement)
      const newRotationX = -beta * 100; // Rotation around X-axis
      const newRotationY = gamma * 100; // Rotation around Y-axis

      Animated.timing(rotationX, {
        toValue: newRotationX,
        duration: 100,
        useNativeDriver: true,
      }).start();

      Animated.timing(rotationY, {
        toValue: newRotationY,
        duration: 100,
        useNativeDriver: true,
      }).start();      
    });

    // Cleanup listener on component unmount
    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <Animated.View
      style={[
        styles.card,
        {
          transform: [
            {
              rotateX: rotationX.interpolate({
                inputRange: [-180, 180],
                outputRange: ["-75deg", "75deg"],
              }),
            },
            {
              rotateY: rotationY.interpolate({
                inputRange: [-180, 180],
                outputRange: ["-75deg", "75deg"],
              }),
            },
          ],
        },
      ]}
    >
      <Animated.Image
        source={require("../assets/images/Sparkles.gif")}
        style={styles.imageAfter}
      />
      <Animated.Image source={{ uri: imageUrl }} style={styles.image} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    aspectRatio: 600 / 825,
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    position: "relative",
  },
  imageAfter: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 3,
    opacity: 0.15,
    height: "100%",
    width: "100%",
  },
  image: {
    width: "100%",
    // marginBottom: 10,
    aspectRatio: 600 / 825,
    position: "relative",
  },
});
