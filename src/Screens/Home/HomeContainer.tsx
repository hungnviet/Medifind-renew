import { Home } from "./Home";
import React, { useState, useEffect } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainBottomBarParamList } from "@/Navigation/Main";
import { MainScreens } from "..";

type HomeScreenNavigatorProps = NativeStackScreenProps<
  MainBottomBarParamList,
  MainScreens.HOME
>;

export const HomeContainer = ({ navigation }: HomeScreenNavigatorProps) => {
  const onNavigate = (screen: MainScreens) => {
    navigation.navigate(screen);
  };

  return <Home onNavigate={onNavigate} />;
};
