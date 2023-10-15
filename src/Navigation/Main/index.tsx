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
  [MainScreens.HOME]: undefined;
  [MainScreens.CHAT]: undefined;
  [MainScreens.SCAN]: undefined;
  [MainScreens.SEARCH]: undefined;
  [MainScreens.SCHEDULE]: undefined;
  [MainScreens.HISTORY]: undefined;
};

const Tab = createBottomTabNavigator<MainBottomBarParamList>();

// @refresh reset
export const MainNavigator = () => {
  return (

    <Tab.Navigator >
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
