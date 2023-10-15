import React from "react";
import { Login } from "./Login";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/Navigation";
import { RootScreens } from "..";

type LogInNavigatorProps = NativeStackScreenProps<
    RootStackParamList,
    RootScreens.LOGIN
>;

export const LoginContainer = ({
    navigation,
}: LogInNavigatorProps) => {
    const onNavigate = (screen: RootScreens) => {
        navigation.navigate(screen);
    };

    return <Login onNavigate={onNavigate} />;
};
