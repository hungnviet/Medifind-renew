import { ScanResult } from "./ScanResult";
import React, { useEffect } from "react";
import {
  IDrugBankMedicine,
  IMedicine,
  IScanResult,
  useScanPrescriptionMutation,
} from "@/Services";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ScanStackParamList } from "@/Navigation/Main/Scan";
import { ScanScreens } from "..";
import { Platform } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

type ScanResultScreenNavigatorProps = NativeStackScreenProps<
  ScanStackParamList,
  ScanScreens.SCAN_RESULT
>;

export const ScanResultContainer = ({
  navigation,
  route,
}: ScanResultScreenNavigatorProps) => {
  const [uploadPrescription, { data, isSuccess, isLoading, error }] =
    useScanPrescriptionMutation();

  const { image } = route.params;

  useEffect(() => {
    const uri = image?.uri || "";
    const fileUri =
      Platform.OS === "android" ? uri : uri.replace("file://", "");
    const uriParts = uri.split(".");
    const fileType = uriParts[uriParts.length - 1];
    const formData = new FormData();
    formData.append("photo", {
      uri: fileUri,
      name: `photo.${fileType}`,
      type: `image/${fileType}`,
    } as any);
    uploadPrescription(formData);
  }, [image]);

  const navigateToMedicineDetail = (item: IMedicine | IDrugBankMedicine) => {
    navigation.navigate(ScanScreens.MEDICINE_DETAIL, {
      item,
    });
  };

  const storeData = async (value: any) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('my-key', jsonValue);
    } catch (e) {
      // saving error
    }
  };

  storeData(data);

  return (
    <ScanResult
      image={route.params?.image}
      data={(data as IScanResult[]) || []}
      isSuccess={isSuccess}
      handlePressToolTip={navigateToMedicineDetail}
      isLoading={isLoading}
      error={error}
    />
  );
};