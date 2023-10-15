import { Scan } from "./Scan";
import React, { useState, useEffect } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { ScanScreens } from "..";
import { ScanStackParamList } from "@/Navigation/Main/Scan";
import { CameraCapturedPicture } from "expo-camera";

type ScanScreenNavigatorProps = NativeStackScreenProps<
  ScanStackParamList,
  ScanScreens.SCAN_CAMERA
>;

export const ScanContainer = ({ navigation }: ScanScreenNavigatorProps) => {
  const handleNavigateToScanResult = (image: CameraCapturedPicture) => {
    navigation.navigate(ScanScreens.SCAN_RESULT, {
      image,
    });
  };

  return <Scan onCaptureSuccess={handleNavigateToScanResult} />;
};
