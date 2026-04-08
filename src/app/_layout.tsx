import { CustomTabBar } from "@/components/CustomTabBar";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { useFonts } from "expo-font";
import { Tabs } from "expo-router";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "../global.css";

export default function TabLayout() {
  //TODO:: add this to config plugin (recommended for Android and iOS)
  const [fontsLoaded] = useFonts({
    DINNextRoundedBold: require("@/assets/fonts/DIN_BOLD.ttf"),
    DINNextRoundedRegular: require("@/assets/fonts/DIN_REGULAR.ttf"),
    DINNextRoundedMedium: require("@/assets/fonts/DIN_MEDIUM.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <Tabs
          tabBar={(props) => <CustomTabBar {...props} />}
          screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarActiveTintColor: "#FFFFFF",
            tabBarInactiveTintColor: "#B4B8C3",
          }}
        >
          <Tabs.Screen name="index" />
          <Tabs.Screen name="quest" />
          <Tabs.Screen name="league" />
          <Tabs.Screen name="feed" />
          <Tabs.Screen name="subscription" />
          <Tabs.Screen name="more" />
        </Tabs>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
