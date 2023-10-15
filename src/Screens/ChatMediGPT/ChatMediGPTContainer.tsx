import { ChatMediGPT } from "./ChatMediGPT";
import React, { useState, useEffect } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ChatScreens } from "..";
import { ChatStackParamList } from "@/Navigation/Main/Chat";

type ChatMediGPTScreenNavigatorProps = NativeStackScreenProps<
  ChatStackParamList,
  ChatScreens.CHAT_MEDIGPT
>;

export const ChatMediGPTContainer = ({ navigation }: ChatMediGPTScreenNavigatorProps) => {
  const onNavigate = (screen: ChatScreens) => {
    navigation.navigate(screen);
  };

  return <ChatMediGPT onNavigate={onNavigate} />;
};