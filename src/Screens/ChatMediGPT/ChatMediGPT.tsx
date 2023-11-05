import { i18n, LocalizationKey } from "@/Localization";
import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { HStack, Spinner, Heading } from "native-base";
import { User } from "@/Services";
import { themeVariables } from "@/Theme";
import { LinearGradient } from "expo-linear-gradient";
import { ChatScreens } from "..";
import { useState } from "react";
import { IMessage } from "react-native-gifted-chat";
import { GiftedChat } from "react-native-gifted-chat";

export interface IChatMediGPTProps {
  onNavigate: (string: ChatScreens) => void;
}
/*
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
*/

export const ChatMediGPT: React.FC = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);

  const onSend = (newMessages: IMessage[]) => {
    setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessages));

    // Simulate the chatbot responses
    for (let i = 0; i < newMessages.length; i++) {
      if (newMessages[i].user._id === 1) {
        // User message
        setTimeout(() => {
          const botResponse = getChatBotResponse(newMessages[i].text);
          setMessages((prevMessages) =>
            GiftedChat.append(prevMessages, botResponse)
          );
        }, 1000);
      }
    }
  };
  const getChatBotResponse = (userMessage: string): IMessage[] => {
    // Simulate a chatbot response based on user input
    const botMessages: IMessage[] = [];

    if (userMessage.toLowerCase().includes("health solution")) {
      botMessages.push({
        _id: new Date().getTime().toString(),
        text: "Of course, I'd be happy to help. Can you please describe your symptoms or what's been bothering you?",
        createdAt: new Date(),
        user: { _id: 2, name: "ChatBot" },
      });
    } else if (userMessage.toLowerCase().includes("headache") || userMessage.toLowerCase().includes("sore throat")) {
      botMessages.push({
        _id: new Date().getTime().toString(),
        text: "I'm sorry to hear that. Headaches, sore throats, and fatigue can have various causes. Have you taken any medication or tried any remedies so far?",
        createdAt: new Date(),
        user: { _id: 2, name: "ChatBot" },
      });
    } else if (userMessage.toLowerCase().includes("over-the-counter pain relievers") || userMessage.toLowerCase().includes("tea with honey")) {
      botMessages.push({
        _id: new Date().getTime().toString(),
        text: "It's good that you've tried some home remedies. However, persistent symptoms like these may require a more detailed evaluation. I recommend that you consult with a healthcare professional for a proper diagnosis. They can provide you with personalized advice and treatment options.",
        createdAt: new Date(),
        user: { _id: 2, name: "ChatBot" },
      });
    } else {
      botMessages.push({
        _id: new Date().getTime().toString(),
        text: "I recommend that you consult with a healthcare professional for a proper diagnosis. They can provide you with personalized advice and treatment options.",
        createdAt: new Date(),
        user: { _id: 2, name: "ChatBot" },
      });
    }

    return botMessages;
  };
  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        onSend={(newMessages) => onSend(newMessages)}
        user={{
          _id: 1,
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
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