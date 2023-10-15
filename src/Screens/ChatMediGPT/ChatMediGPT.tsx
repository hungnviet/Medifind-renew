import { i18n, LocalizationKey } from "@/Localization";
import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { HStack, Spinner, Heading } from "native-base";
import { User } from "@/Services";
import { themeVariables } from "@/Theme";
import { LinearGradient } from "expo-linear-gradient";
import { ChatScreens } from "..";


export interface IChatMediGPTProps {
  onNavigate: (string: ChatScreens) => void;
}

export const ChatMediGPT = (props: IChatMediGPTProps) => {
  const { onNavigate } = props;

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
			<Text>Updating...</Text>
    </View>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: themeVariables.backgroundColor,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
      },
    });

/*
import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { Dialogflow_V2 } from 'react-native-dialogflow';
import { ChatScreens } from '..';
import { dialogflowConfig } from '../../../env';

export interface IChatMediGPTProps {
  onNavigate: (string: ChatScreens) => void;
}

export const ChatMediGPT = (props: IChatMediGPTProps) => {
  const { onNavigate } = props;

  const BOT_USER = {
    _id: 2,
    name: 'React Native',
    avatar: 'https://placeimg.com/140/140/any',
  };

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    Dialogflow_V2.setConfiguration(
      dialogflowConfig.client_email,
      dialogflowConfig.private_key,
      Dialogflow_V2.LANG_ENGLISH_US,
      dialogflowConfig.project_id
    );

    setMessages([
      {
        _id: Math.random().toString(),
        text: 'Hello',
        createdAt: new Date(),
        user: BOT_USER,
      },
    ]);
  }, []);

  const handleGoogleResponse = (result: any) => {
    let text = result.queryResult.fulfillmentMessages[0].text.text[0];
    sendBotResponse(text);
  };

  const sendBotResponse = (text: string) => {
    let msg = {
      _id: Math.random().toString(), // Generate a unique key
      text,
      createdAt: new Date(),
      user: BOT_USER,
    };
    setMessages((previousMessages) => GiftedChat.append(previousMessages, [msg]));
  };

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) => GiftedChat.append(previousMessages, messages));

    let message = messages[0].text;

    Dialogflow_V2.requestQuery(
      message,
      (result: any) => handleGoogleResponse(result),
      (error: any) => console.log(error)
    );
  }, []);

  const onQuickReply = useCallback((quickReply = []) => {
    setMessages((previousMessages) => GiftedChat.append(previousMessages, quickReply));
    let message = quickReply[0].value;
    Dialogflow_V2.requestQuery(
      message,
      (result: any) => handleGoogleResponse(result),
      (error: any) => console.log(error)
    );
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={onSend}
      onQuickReply={onQuickReply}
      user={{
        _id: 1,
      }}
    />
  );
};
*/