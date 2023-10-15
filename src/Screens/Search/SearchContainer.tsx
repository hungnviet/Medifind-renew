import { Search } from "./Search";
import React, { useState, useEffect } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainBottomBarParamList } from "@/Navigation/Main";
import { MainScreens } from "..";

type SearchScreenNavigatorProps = NativeStackScreenProps<
  MainBottomBarParamList,
  MainScreens.SEARCH
>;

export const SearchContainer = ({ navigation }: SearchScreenNavigatorProps) => {
  const onNavigate = (screen: MainScreens) => {
    navigation.navigate(screen);
  };

  return <Search onNavigate={onNavigate} />;
};