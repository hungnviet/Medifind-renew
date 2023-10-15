import React from "react";
import { SignUp } from "./SignUp";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/Navigation";
import { RootScreens } from "..";

type SignUpNavigatorProps = NativeStackScreenProps<
    RootStackParamList,
    RootScreens.SIGNUP
>;

export const SignUpContainer = ({
    navigation,
}: SignUpNavigatorProps) => {
    const onNavigate = (screen: RootScreens) => {
        navigation.navigate(screen);
    };

    return <SignUp onNavigate={onNavigate} />;
};
