import React, { useState, useEffect } from "react";
import { i18n, LocalizationKey } from "@/Localization";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { HStack, Spinner, Heading } from "native-base";
import { User } from "@/Services";
import { themeVariables } from "@/Theme";
import { LinearGradient } from "expo-linear-gradient";
import { ScheduleScreens } from "..";
import RNCalendarEvents from "react-native-calendar-events";
import { Calendar, Agenda, AgendaList, CalendarProvider, ExpandableCalendar } from "react-native-calendars";
import ExpandableCalendarScreen from "./screens/expandableCalendarScreen";

export interface IScheduleProps {
  onNavigate: (string: ScheduleScreens) => void;
}

export const Schedule = (props: IScheduleProps) => {
  const { onNavigate } = props;

  const [selected, setSelected] = useState('');

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {/* <CalendarProvider
        date={'2023-07-10'}
        showTodayButton
      >
        <ExpandableCalendar
        />
        <AgendaList
          sections={[]}
          // renderItem={renderItem}
          sectionStyle={styles.section}
        />
      </CalendarProvider> */}
      <ExpandableCalendarScreen />
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
  section: {
    backgroundColor: "gray",
    color: 'grey',
    textTransform: 'capitalize'
  }
});