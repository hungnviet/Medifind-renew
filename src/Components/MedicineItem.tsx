import React from "react";
import { TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { noop } from "lodash";
import { BaseText } from "./BaseText";
import { Flex } from "./Flex";
import { DatabaseSource, IDrugBankMedicine, IMedicine } from "@/Services";
import { Colors, themeVariables } from "@/Theme/Variables";

interface IProps {
  key?: string;
  data: IMedicine | IDrugBankMedicine;
  database: DatabaseSource;
  onPress?: (data: IMedicine | IDrugBankMedicine) => void;
}

const renderVietnamDrug = (data: IMedicine) => {
  return (
    <Flex
      align="stretch"
      justify="between"
      style={{
        marginRight: 16,
      }}
    >
      <BaseText align="left" bold>
        {data.tenThuoc}
      </BaseText>
      <Flex
        direction="row"
        justify="between"
        wrap="nowrap"
        style={{
          marginTop: 4,
        }}
      >
        <Flex align="start">
          <BaseText align="left" size={12} color={Colors.PRIMARY}>
            {data?.thongTinThuocCoBan?.dongGoi}
          </BaseText>
        </Flex>
        <Flex flex={0} align="end">
          <BaseText align="right" bold size={12} color={Colors.TEXT}>
            {data.congTySanXuat?.nuocSanXuat}
          </BaseText>
        </Flex>
      </Flex>
    </Flex>
  );
};

/**
 * Render Drug Bank information
 * @author Thanh Hoang-Le-Hai
 * @param data Pill Data from Drug Bank
 */
const renderDrugBankDrug = (data: IDrugBankMedicine) => {
  return (
    <Flex
      align="stretch"
      justify="between"
      style={{
        marginRight: 16,
      }}
    >
      <BaseText align="left" bold>
        {data.name}
      </BaseText>
      <Flex
        direction="row"
        justify="between"
        wrap="nowrap"
        style={{
          marginTop: 4,
        }}
      >
        <Flex align="start">
          <BaseText align="left" size={12} color={Colors.PRIMARY}>
            {data.categories}
          </BaseText>
        </Flex>
        <Flex align="end">
          <BaseText align="right" bold size={12} color={Colors.SECONDARY}>
            {data.type}
          </BaseText>
        </Flex>
      </Flex>
    </Flex>
  );
};

export const MedicineItem = (props: IProps) => {
  const { data, onPress = noop, database } = props;
  return (
    <TouchableOpacity
      onPress={() => onPress(data)}
      style={{
        flex: 1,
        alignContent: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        borderRadius: 10,
        backgroundColor: "#e6f6ff",
        paddingVertical: 8,
      }}
    >
      <Flex
        direction="row"
        align="center"
        justify="center"
        style={{
          justifyContent: "center",
          maxHeight: themeVariables.buttonActionHeight,
          minHeight: themeVariables.buttonActionHeight,
          maxWidth: themeVariables.buttonActionWidth,
          minWidth: themeVariables.buttonActionWidth,
          borderRadius: themeVariables.buttonActionWidth / 2,
          borderWidth: 0.5,
          borderColor: data.isAntibiotics
            ? themeVariables.redSecondaryTextColor
            : themeVariables.primaryTextColor,
          marginLeft: themeVariables.spacing_lg,
          marginRight: themeVariables.spacing_xl,
          alignSelf: "center",
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <MaterialCommunityIcons
            size={28}
            color={
              data.isAntibiotics
                ? themeVariables.redSecondaryTextColor
                : themeVariables.primaryTextColor
            }
            name={"pill"}
          />
        </View>
      </Flex>
      {database === DatabaseSource.VIETNAM
        ? renderVietnamDrug(data as IMedicine)
        : renderDrugBankDrug(data as IDrugBankMedicine)}
    </TouchableOpacity>
  );
};
