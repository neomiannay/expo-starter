import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { HapticTab } from "@/core/HapticTab";
import { useSearchContext } from "@/provider/SearchProvider";
import { useState, useEffect } from "react";

export default function TabLayout() {
  const { setIsFocused } = useSearchContext();
  const [currentTab, setCurrentTab] = useState("index");
  const [clickedTwice, setClickedTwice] = useState(false);

  useEffect(() => {
    if (clickedTwice) {
      console.log("Double clic détecté");
      setClickedTwice(false);
    }
  }, [clickedTwice]);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        headerShadowVisible: false,
        tabBarActiveTintColor: "#ffd33d",
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: "#25292e",
        },
      }}
    >
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "search" : "search-outline"}
              color={color}
              size={24}
            />
          ),
        }}
        listeners={() => ({
          tabPress: () => {
            if (currentTab === "search") {
              console.log("focus");
              setIsFocused(true);
              setClickedTwice(true);
            }
            setCurrentTab("search");
          },
        })}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "home-sharp" : "home-outline"}
              color={color}
              size={24}
            />
          ),
        }}
        listeners={() => ({
          tabPress: () => {
            setIsFocused(false);
            setClickedTwice(false);
            setCurrentTab("index");
          },
        })}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: "About",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={
                focused ? "information-circle" : "information-circle-outline"
              }
              color={color}
              size={24}
            />
          ),
        }}
        listeners={() => ({
          tabPress: () => {
            setIsFocused(false);
            setClickedTwice(false);
            setCurrentTab("about");
          },
        })}
      />
    </Tabs>
  );
}
