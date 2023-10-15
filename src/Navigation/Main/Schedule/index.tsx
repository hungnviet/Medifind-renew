import { ScheduleScreens } from "@/Screens";
import { ScheduleContainer } from "@/Screens/Schedule";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const ScheduleStack = createNativeStackNavigator<ScheduleStackParamList>();

export type ScheduleStackParamList = {
  [ScheduleScreens.SCHEDULE_LIST]: undefined;
  [ScheduleScreens.SCHEDULE_DETAIL]: undefined;
};

export const ScheduleMedicineStack = () => {
  return (
    <ScheduleStack.Navigator
      initialRouteName={ScheduleScreens.SCHEDULE_LIST}
      screenOptions={{}}
    >
      <ScheduleStack.Screen
        name={ScheduleScreens.SCHEDULE_LIST}
        component={ScheduleContainer}
        options={{
          headerShown: false,
        }}
      />
      {/* <ScheduleStack.Screen
        name={ScheduleScreens.SCHEDULE_DETAIL}
        component={ScheduleDetailContainer}
        options={{}}
      /> */}
    </ScheduleStack.Navigator>
  );
};
