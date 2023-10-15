import { ChatScreens } from "@/Screens";
import { ChatMediGPTContainer } from "@/Screens/ChatMediGPT";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const ChatStack = createNativeStackNavigator<ChatStackParamList>();

export type ChatStackParamList = {
  [ChatScreens.CHAT_LIST]: undefined;
  [ChatScreens.CHAT_MEDIGPT]: undefined;
  [ChatScreens.CHAT_DOCTOR]: undefined;
};

export const ChatMedicineStack = () => {
  return (
    <ChatStack.Navigator
      initialRouteName={ChatScreens.CHAT_MEDIGPT}
      screenOptions={{}}
    >
      {/* <ChatStack.Screen
        name={ChatScreens.CHAT_LIST}
        component={ChatContainer}
        options={{}}
      /> */}
      <ChatStack.Screen
        name={ChatScreens.CHAT_MEDIGPT}
        component={ChatMediGPTContainer}
        options={{
            headerShown: false,
        }}
      />
      {/* <ChatStack.Screen
        name={ChatScreens.CHAT_DOCTOR}
        component={ChatDoctorContainer}
        options={{}}
      /> */}
    </ChatStack.Navigator>
  );
};
