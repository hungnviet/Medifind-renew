import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeContainer } from "@/Screens/Home";
import { MainScreens } from "@/Screens";
import { ScanMedicineStack } from "./Scan";
import { ScheduleMedicineStack } from "./Schedule";
import { ChatMedicineStack } from "./Chat";
import { SearchContainer } from "@/Screens/Search";
import { HistoryContainer } from "@/Screens/DrugUsedHistory";
import Ionicons from "@expo/vector-icons/Ionicons";
import { View, Text } from "native-base";
import { StyleSheet } from "react-native";
export type MainBottomBarParamList = {
  // pass params between the screens
  // Example 
  // [MainScreens.SEARCH]: { text: string };
  [MainScreens.HOME]: { userID: string | undefined };
  [MainScreens.CHAT]: undefined;
  [MainScreens.SCAN]: { userID: string | undefined };
  [MainScreens.SEARCH]: { userID: string | undefined, searchText: string | undefined };
  [MainScreens.SCHEDULE]: { userID: string | undefined };
  [MainScreens.HISTORY]: { userID: string | undefined };
};

const Tab = createBottomTabNavigator<MainBottomBarParamList>();

// @refresh reset
export const MainNavigator = () => {
  return (

    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
      }} >
      <Tab.Screen
        name={MainScreens.HOME}
        component={HomeContainer}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
          tabBarLabelPosition: "below-icon",
        }}
      />
      <Tab.Screen
        name={MainScreens.CHAT}
        component={ChatMedicineStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbox-ellipses-outline" color={color} size={size} />
          ),
          tabBarLabelPosition: "below-icon",

        }}
      />
      <Tab.Screen
        name={MainScreens.SCAN}
        component={ScanMedicineStack}
        options={{
          tabBarStyle: { display: "none" },
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="scan-outline" color={color} size={size} />
          ),
          tabBarLabelPosition: "below-icon",

        }}
      />
      <Tab.Screen
        name={MainScreens.SEARCH}
        component={SearchContainer}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search-outline" color={color} size={size} />
          ),
          tabBarLabelPosition: "below-icon",

        }}
      />
      <Tab.Screen
        name={MainScreens.SCHEDULE}
        component={ScheduleMedicineStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar-outline" color={color} size={size} />
          ),
          tabBarLabelPosition: "below-icon",
        }}
      />
      <Tab.Screen
        name={MainScreens.HISTORY}
        component={HistoryContainer}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="menu" color={color} size={size} />
          ),
          tabBarLabelPosition: "below-icon",
        }}
      />
    </Tab.Navigator>

  );
};
