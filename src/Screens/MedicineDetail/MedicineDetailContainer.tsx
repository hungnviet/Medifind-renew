import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MedicineDetail } from "./MedicineDetail";
import { ScanStackParamList } from "@/Navigation/Main/Scan";
import { ScanScreens } from "..";
import { IMedicine } from "@/Services";

type MedicineDetailScreenNavigatorProps = NativeStackScreenProps<
  ScanStackParamList,
  ScanScreens.MEDICINE_DETAIL
>;

export const MedicineDetailContainer = ({
  route,
  navigation,
}: MedicineDetailScreenNavigatorProps) => {
  const { item } = route.params;

  return <MedicineDetail data={item} />;
};
