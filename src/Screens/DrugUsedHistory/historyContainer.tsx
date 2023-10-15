import React from "react";
import { History } from "./history";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainBottomBarParamList } from "@/Navigation/Main";
import { MainScreens } from "..";

type HistoryScreenNavigatorProps = NativeStackScreenProps<
    MainBottomBarParamList,
    MainScreens.HISTORY
>;

export const HistoryContainer = ({ navigation }: HistoryScreenNavigatorProps) => {
    const onNavigate = (screen: MainScreens) => {
        navigation.navigate(screen);
    };

    return <History onNavigate={onNavigate} />;
};
