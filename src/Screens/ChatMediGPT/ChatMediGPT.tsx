import { i18n, LocalizationKey } from "@/Localization";
import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from "react-native";
import { StatusBar } from "expo-status-bar";
import { HStack, Spinner, Heading } from "native-base";
import { User } from "@/Services";
import { themeVariables } from "@/Theme";
import { LinearGradient } from "expo-linear-gradient";
import { ChatScreens } from "..";
import { useState, useEffect } from "react";
import { IMessage } from "react-native-gifted-chat";
import { GiftedChat, InputToolbar, Send } from "react-native-gifted-chat";
import { Icon } from "native-base";
const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;
import Ionicons from "@expo/vector-icons/Ionicons";
import { Keyboard } from 'react-native';
export interface IChatMediGPTProps {
  onNavigate: (string: ChatScreens) => void;
}




export const ChatMediGPT: React.FC = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);


  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );


    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );


    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);




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
  const customtInputToolbar = (props: any) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          backgroundColor: "white",
          borderColor: "#E8E8E8",
          borderWidth: 1,
          borderRadius: 10,
          height: height / 18,
          marginLeft: 5,
          marginRight: 5,
          marginBottom: isKeyboardVisible ? 5 : 0,
        }}
      />
    );
  };
  return (
    <View style={styles.container}>

      <TouchableOpacity style={{
        position: "absolute",
        top: 50,
        left: 20, backgroundColor: '#407CE2', width: 50, height: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 30
      }}
        onPress={() => alert('helo')}>
        <Ionicons name="home-outline" color={'white'} size={24} />
      </TouchableOpacity>



      <View style={styles.header}>
        <Text style={{ fontWeight: '800', color: "#407CE2", fontSize: 18 }}>MEDI GPT</Text>
      </View>
      <View style={styles.chatScreen}>
        <GiftedChat
          messages={messages}
          onSend={(newMessages) => onSend(newMessages)}
          user={{
            _id: 1,
          }}
          renderInputToolbar={props => customtInputToolbar(props)}
          listViewProps={{
            style: {
              marginTop: -50,

            },
          }}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chatScreen: {
    marginTop: 50,
    flex: 20,
    padding: 0
  },


  btn: {
    position: "absolute",
    top: 50,
    left: 20,
    backgroundColor: "#407CE2",
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50


  },
  header: {
    width: width,
    flex: 2,
    //backgroundColor: 'red'
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 40
  },




});


















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

