import { Home } from "./Home";
import React, { useState, useEffect } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainBottomBarParamList } from "@/Navigation/Main";
import { MainScreens } from "..";
import { CompositeScreenProps } from "@react-navigation/native";
import { RootStackParamList } from "@/Navigation";

type HomeScreenNavigatorProps = NativeStackScreenProps<
  MainBottomBarParamList,
  MainScreens.HOME
>;

export const HomeContainer = ({ navigation, route }: HomeScreenNavigatorProps) => {
  const [userID, setUserID] = useState(route.params.userID);
  console.log(userID);
  const onNavigate = (screen: MainScreens) => {
    navigation.navigate(screen);
  };
  // onNavigate a screen with params
  // Example
  // const onNavigateSearch = (text: string) => {
  //   navigation.push(MainScreens.SEARCH, { text: string });
  // };
  return <Home onNavigate={onNavigate} />;
};
