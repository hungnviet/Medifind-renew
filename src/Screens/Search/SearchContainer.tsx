import { Search } from "./Search";
import React, { useState, useEffect } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainBottomBarParamList } from "@/Navigation/Main";
import { MainScreens } from "..";

type SearchScreenNavigatorProps = NativeStackScreenProps<
  MainBottomBarParamList,
  MainScreens.SEARCH
>;

export const SearchContainer = ({ navigation, route }: SearchScreenNavigatorProps) => {
  // get params passed into this screen
  // Example
  // const [text, setText] = useState(route.params.text);
  const onNavigate = (screen: MainScreens) => {
    navigation.navigate(screen);
  };

  return <Search onNavigate={onNavigate} />;
};