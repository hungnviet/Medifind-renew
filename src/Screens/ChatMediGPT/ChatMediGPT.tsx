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


export const ChatMediGPT: React.FC = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);

  const onSend = async (newMessages: IMessage[]) => {
    setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessages));

    // Simulate the chatbot responses
    for (let i = 0; i < newMessages.length; i++) {
      if (newMessages[i].user._id === 1) {
        // User message
        setTimeout(async () => {
          const botResponse = await getChatBotResponse(newMessages[i].text); // Use 'await' here
          setMessages((prevMessages) =>
            GiftedChat.append(prevMessages, botResponse)
          );
        }, 0);
      }
    }
  };
  /*
  const getChatBotResponse = async (userMessage: string): Promise<IMessage[]> => {
    const botMessages: IMessage[] = [];
    const obj = { message: { userMessage } };
    try {
      const response = await fetch(`(http://192.168.1.13:3000/api/v1/chatBot`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj)
      });
      const data = await response.json();

      botMessages.push({
        _id: new Date().getTime().toString(),
        text: data.reply.reply || "I'm sorry, I could not find any information on that topic.Please just send the key word for me",
        createdAt: new Date(),
        user: { _id: 2, name: "ChatBot" },
      });
    } catch (error) {
      // Handle errors here and return a specific message
      botMessages.push({
        _id: new Date().getTime().toString(),
        text: "We cannot find this information. Please try again later.",
        createdAt: new Date(),
        user: { _id: 2, name: "ChatBot" },
      });
    }
    return botMessages;

  };
  */
  const getChatBotResponse = async (userMessage: string): Promise<IMessage[]> => {
    const botMessages: IMessage[] = [];
    try {
      const response = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(userMessage)}`);
      const data = await response.json();

      botMessages.push({
        _id: new Date().getTime().toString(),
        text: data.extract || "I'm sorry, I could not find any information on that topic.Please just send the key word for me",
        createdAt: new Date(),
        user: { _id: 2, name: "ChatBot" },
      });
    } catch (error) {
      // Handle errors here and return a specific message
      botMessages.push({
        _id: new Date().getTime().toString(),
        text: "We cannot find this information. Please try again later.",
        createdAt: new Date(),
        user: { _id: 2, name: "ChatBot" },
      });
    }
    return botMessages;

  };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btn}><Text style={{ color: 'red' }}>back</Text></TouchableOpacity>
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
  btn: {
    position: "absolute",
    top: 50,
    left: 5,

  }
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