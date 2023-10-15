import { Schedule } from "./Schedule";
import React, { useState, useEffect } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainBottomBarParamList } from "@/Navigation/Main";
import { ScheduleScreens } from "..";
import { ScheduleStackParamList } from "@/Navigation/Main/Schedule";

type ScheduleScreenNavigatorProps = NativeStackScreenProps<
  ScheduleStackParamList,
  ScheduleScreens.SCHEDULE_LIST
>;

export const ScheduleContainer = ({ navigation }: ScheduleScreenNavigatorProps) => {
  const onNavigate = (screen: ScheduleScreens) => {
    navigation.navigate(screen);
  };

  return <Schedule onNavigate={onNavigate} />;
};