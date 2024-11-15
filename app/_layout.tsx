import { GlobalProvider } from "@/provider/GlobalProvider";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <GlobalProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="pokedex" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </GlobalProvider>
  );
}
