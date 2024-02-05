import React from "react";
import { Login } from "./Login";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/Navigation";
import { RootScreens, MainScreens } from "..";
import { CompositeScreenProps } from "@react-navigation/native";
import { MainBottomBarParamList } from "@/Navigation/Main";

type LogInNavigatorProps = CompositeScreenProps<
NativeStackScreenProps<RootStackParamList, RootScreens.LOGIN>,
NativeStackScreenProps<MainBottomBarParamList>
>;

export const LoginContainer = ({
    navigation,
}: LogInNavigatorProps) => {
    const onNavigate = (screen: RootScreens) => {
        navigation.navigate(screen);
    };
    const onNavigateHome = (userID: string) => {
        navigation.navigate(MainScreens.HOME, {userID: userID});
    }

    return <Login onNavigate={onNavigate} onNavigateHome={onNavigateHome} />;
};
