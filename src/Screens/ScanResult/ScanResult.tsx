import {
  DatabaseSource,
  getMedicineIdentifier,
  IDrugBankMedicine,
  IMedicine,
  IScanResult,
} from "@/Services";
import { Colors, deviceData, themeVariables } from "@/Theme/Variables";
import { CameraCapturedPicture } from "expo-camera";
import {
  Heading,
  HStack,
  ScrollView,
  Spinner,
  Text,
  VStack,
} from "native-base";
import React from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  TouchableOpacity,
  View,
} from "react-native";
import Lottie from "lottie-react-native";
import { getAntibioticsData } from "./analytics";
import { Text as SVGText } from "react-native-svg";
import { MedicineItem } from "@/Components/MedicineItem";
import Tooltip from "rn-tooltip";
import { BaseText } from "@/Components/BaseText";


interface IScanResultProps {
  image: CameraCapturedPicture;
  data: IScanResult[];
  isSuccess: boolean;
  isLoading: boolean;
  error?: any;
  handlePressToolTip: (item: IMedicine | IDrugBankMedicine) => void;
}

export const ScanResult = (props: IScanResultProps) => {
  const { image, data, isLoading, handlePressToolTip, error } = props;

  const tooltips: { [id: string]: Tooltip } = {};

  const getFullScreenImageSize = () => {
    const deviceHeight = deviceData.getDeviceHeight();
    const deviceWidth = deviceData.getDeviceWidth();
    const imageRatio = image.height / image.width;
    const deviceRatio = deviceHeight / deviceWidth;
    return imageRatio < deviceRatio
      ? {
        width: deviceWidth,
        height: deviceWidth * imageRatio,
        widthRatio: deviceWidth / image.width,
        heightRatio: (deviceWidth * imageRatio) / image.height,
      }
      : {
        width: deviceHeight / imageRatio,
        height: deviceHeight,
        widthRatio: deviceHeight / imageRatio / image.width,
        heightRatio: deviceHeight / image.height,
      };
  };

  const renderImage = () => {
    const imageSize = getFullScreenImageSize();
    return (
      <Image
        style={{
          width: imageSize.width,
          height: imageSize.height,
        }}
        source={{ uri: image.uri }}
      />
    );
  };

  const renderAntibioticsAnalytics = () => {
    const result = getAntibioticsData(data);
    const Labels = ({ slices, height, width }: any) => {
      return slices.map((slice: any, index: number) => {
        const { labelCentroid, pieCentroid, data } = slice;
        return (
          <SVGText
            key={index}
            x={pieCentroid[0]}
            y={pieCentroid[1]}
            fill={"white"}
            textAnchor={"middle"}
            alignmentBaseline={"middle"}
            fontSize={14}
            stroke={"black"}
            strokeWidth={0.2}
          >
            {`${data.amount.toFixed(2)}%`}
          </SVGText>
        );
      });
    };

    if (result.antiBiotics.length > 0) {
      const pieChartData = [
        data.length - result.antiBiotics.length,
        result.antiBiotics.length,
      ].map((value: number, index: number) => ({
        value,
        amount: (value * 100) / data.length,
        svg: {
          fill: index === 0 ? Colors.PRIMARY : Colors.SECONDARY,
          onPress: () => console.log("press", index),
        },
        key: `pie-${index}`,
      }));

      // const barChartData = Object.keys(result.sideEffects).map(
      //   (name: string) => ({
      //     value: result.sideEffects[name],
      //     label: name.substring(0, 4),
      //   }),
      // );

      return (
        <VStack
          justifyContent="flex-start"
          alignItems="stretch"
          style={{
            width: "100%",
            padding: 16,
          }}
        >
          <VStack alignItems="flex-start" justifyContent="flex-start">
            <Text textAlign="left" bold fontSize={16}>
              {"Antibiotics Analytics"}
            </Text>
          </VStack>
          <VStack
            direction="row"
            style={{
              flex: 0,
              width: "100%",
              marginVertical: 24,
            }}
          >
            <VStack flex={4} alignItems="flex-start" justifyContent="center">
              <VStack
                flex={0}
                direction="row"
                justifyContent="flex-start"
                style={{ marginBottom: 12 }}
              >
                <View
                  style={{
                    width: 15,
                    height: 15,
                    backgroundColor: Colors.SECONDARY,
                    marginRight: 4,
                  }}
                />
                <Text bold fontSize={8}>
                  {"Antibiotics"}
                </Text>
              </VStack>
              <VStack flex={0} direction="row" justifyContent="flex-start">
                <View
                  style={{
                    width: 15,
                    height: 15,
                    backgroundColor: Colors.INPUT_BACKGROUND,
                    marginRight: 12,
                  }}
                />
                <Text bold fontSize={8}>
                  {"Others"}
                </Text>
              </VStack>
            </VStack>
          </VStack>
          <VStack alignItems="flex-start" justifyContent="flex-start">
            <Text bold fontSize={14} style={{ marginBottom: 12 }}>
              {"Side Effects"}
            </Text>
          </VStack>
          <VStack alignItems="flex-start">
            {Object.keys(result.sideEffects).map((name: string) => {
              return (
                <Text style={{ marginBottom: 8 }} key={name} fontSize={14}>
                  {`- ${name} (Found in ${result.sideEffects[name]} drug(s))`}
                </Text>
              );
            })}
          </VStack>
        </VStack>
      );
    }
    return null;
  };

  const renderResultItem = ({ item }: { item: IScanResult }) => {
    const id = getMedicineIdentifier(item.medicine.item);
    return (
      <MedicineItem
        onPress={() => handlePressToolTip(item.medicine.item)}
        database={DatabaseSource.VIETNAM}
        key={id}
        data={item.medicine.item}
      />
    );
  };

  const renderOverlayResults = () => {
    return data.map((result) => renderOverlayResult(result));
  };

  const renderPopover = (medicine: IMedicine & IDrugBankMedicine) => {
    const id = medicine.id || medicine.drugbank_id;
    return (
      <TouchableOpacity
        style={{
          padding: themeVariables.spacing_md,
        }}
        onPress={() => {
          tooltips[id].toggleTooltip();
          handlePressToolTip(medicine);
        }}
      >
        <BaseText bold size={themeVariables.fontSize_xs}>
          {medicine.tenThuoc || medicine.name}
        </BaseText>
      </TouchableOpacity>
    );
  };

  const renderOverlayResult = (result: IScanResult) => {
    const imageSize = getFullScreenImageSize();
    const boundingBox = result.boundingBox
      .split(",")
      .map((position) => parseInt(position, 10));
    const width = boundingBox[2] * imageSize.widthRatio + 5;
    const height = boundingBox[3] * imageSize.heightRatio + 5;
    const id = getMedicineIdentifier(result.medicine.item);

    return (
      <View
        key={id}
        style={{
          height,
          width,
          position: "absolute",
          zIndex: 99,
          backgroundColor: result.medicine.item.isAntibiotics
            ? "red"
            : "yellow",
          opacity: 0.5,
          left: boundingBox[0] * imageSize.widthRatio,
          top: boundingBox[1] * imageSize.heightRatio,
        }}
      >
        <Tooltip
          key={id}
          actionType="press"
          ref={(ref: Tooltip) => (tooltips[id] = ref)}
          containerStyle={{
            width: undefined,
            height: undefined,
            alignItems: "stretch",
            padding: 0,
          }}
          overlayColor={"rgba(0, 0, 0, 0.5)"}
          backgroundColor="white"
          popover={renderPopover(result.medicine.item)}
        >
          <Text>{""}</Text>
        </Tooltip>
      </View>
    );
  };

  return (
    <SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          justifyContent: "flex-start",
        }}
        style={{
          height: "100%",
          width: "100%",
        }}
      >
        {image ? (
          renderImage()
        ) : (
          <Text bold color="white">
            {"No image found"}
          </Text>
        )}
        {isLoading ? (
          <VStack
            justifyContent={"center"}
            alignItems={"center"}
            flex={1}
            style={{
              paddingTop: 48,
            }}
          >
            <Lottie
              style={{
                width: 128,
                height: 128,
              }}
              autoPlay={true}
              loop={true}
              speed={1.5}
              source={require("../../Assets/Lottie/medicine-online.json")}
            />
            <Heading
              style={{
                marginVertical: 16,
              }}
              color={Colors.PRIMARY}
              fontSize="sm"
            >
              {"Analyzing your image..."}
            </Heading>
          </VStack>
        ) : (
          <>
            {renderOverlayResults()}
            <VStack
              justifyContent="flex-start"
              alignItems="stretch"
              style={{
                width: "100%",
                padding: 18,
                flex: 1,
              }}
            >
              <VStack alignItems="flex-start" justifyContent="flex-start">
                <Text textAlign="left" bold fontSize={14}>
                  {`Found ${data.length} results`}
                </Text>
              </VStack>
              <VStack
                alignItems="stretch"
                style={{
                  marginTop: 24,
                }}
              >
                {data.map((result: IScanResult) => {
                  return (
                    <>
                      {renderResultItem({ item: result })}
                      <View
                        key={
                          getMedicineIdentifier(result.medicine.item) + "line"
                        }
                        style={{
                          height: 18,
                        }}
                      />
                    </>
                  );
                })}
                {/* <FlatList
                    scrollEnabled={true}
                    renderItem={renderResultItem}
                    keyExtractor={(item: IScanResult) =>
                      getMedicineIdentifier(item.medicine.item)
                    }
                    style={{
                      flex: 0,
                    }}
                    data={data}
                    showsVerticalScrollIndicator={false}
                    ItemSeparatorComponent={() => (
                      <View
                        style={{
                          height: 18,
                        }}
                      />
                    )}
                    // onRefresh={onRefresh}
                  /> */}
              </VStack>
              {renderAntibioticsAnalytics()}
            </VStack>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};