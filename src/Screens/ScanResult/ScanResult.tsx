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
  StyleSheet,
  Dimensions
} from "react-native";
import Lottie from "lottie-react-native";
import { getAntibioticsData } from "./analytics";
import { Text as SVGText } from "react-native-svg";
import { MedicineItem } from "@/Components/MedicineItem";
import Tooltip from "rn-tooltip";
import { BaseText } from "@/Components/BaseText";

const width = Dimensions.get('screen').width;
interface IScanResultProps {
  image: CameraCapturedPicture;
  data: IScanResult[];
  isSuccess: boolean;
  isLoading: boolean;
  error?: any;
  handlePressToolTip: (item: IMedicine | IDrugBankMedicine) => void;
}
interface inforPobs {
  ten: string,
  hoatChatChinh: string,
  SDK: string,
  SQD: string,
  xuatSu: string,
  congTy: string,
  dangBaoChe: string,
  diaChiSX: string,
}

export function InforContainer({ infor }: { infor: inforPobs }) {
  return (
    <View style={{
      backgroundColor: 'white', width: width * 8 / 9, borderRadius: 8, borderColor: '#F1F3F5', marginTop: 10, borderWidth: 2, paddingTop: 12, paddingLeft: 15, paddingRight: 15, shadowOffset: { width: -5, height: 5, },
      shadowColor: '#171717',
      shadowOpacity: 0.6,
      shadowRadius: 3,
    }}>
      <View style={{ flexDirection: 'column', justifyContent: 'space-around', width: '100%' }}>
        <Text style={{ fontSize: 18, textTransform: 'uppercase', fontWeight: 'bold' }}>{infor.ten}</Text>
        <Text style={{ fontSize: 12 }}>Hoạt chất chính: {infor.hoatChatChinh}</Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-start', columnGap: 15, width: '100%' }}>
        <Text style={{ fontSize: 12 }}>SĐK :{infor.SDK}</Text>
        <Text style={{ fontSize: 12 }}>SQĐ :{infor.SQD}</Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-start', columnGap: 15, width: '100%' }}>
        <Text style={{ fontSize: 12 }}>Xuất xứ:</Text>
        <Text style={{ fontSize: 12 }}>{infor.xuatSu}</Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-start', columnGap: 15, width: '100%' }}>
        <Text style={{ fontSize: 12 }}>Công ty:</Text>
        <Text style={{ fontSize: 12 }}>{infor.congTy}</Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-start', columnGap: 15, width: '100%' }}>
        <Text style={{ fontSize: 12 }}>Dạng bào chế:</Text>
        <Text style={{ fontSize: 12 }}>{infor.dangBaoChe}</Text>
      </View>
      <Text style={{ fontSize: 12 }}>Địa chỉ sản xuất:</Text>
      <Text style={{ fontSize: 12 }}>{infor.diaChiSX}</Text>
    </View>

  )
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

  const information: inforPobs[] = [
    {
      ten: "Augmentin 1g tablets",
      hoatChatChinh: "Amoxicillin; Acid clavulanic",
      SDK: "VN-5377-10",
      SQD: "07/QĐ-QLD",
      xuatSu: "Anh",
      congTy: "SmithKline Beecham Pharmaceuticals",
      dangBaoChe: "Viên nén bao phim",
      diaChiSX: "Clarendon Road, Worthing, West Sussex BN14 8QH",
    },
    {
      ten: "Tavanic",
      hoatChatChinh: "Levofloxacin hemihydrate",
      SDK: "VN-10551-10",
      SQD: "240/QĐ-QLD",
      xuatSu: "Pháp",
      congTy: "Sanofi Winthrop Industrie",
      dangBaoChe: "Viên nén bao phim",
      diaChiSX: "56, Route de Choisy-au-Bac 60205 Compiègne",
    },
    {
      ten: "New Ameflu Day Time",
      hoatChatChinh: "Acetaminophen, Guaifenesin, Phenylephrin HCl, Dextromethorphan HBr",
      SDK: "VD-16568-12",
      SQD: "99/QĐ-QLD",
      xuatSu: "Việt Nam",
      congTy: "Công ty cổ phần Dược phẩm OPV",
      dangBaoChe: "--",
      diaChiSX: "Số 27, đường 3A, Khu công nghiệp Biên Hoà 2, Đồng Nai",
    },
    {
      ten: "Vitacap",
      hoatChatChinh: "Hỗn hợp các Vitamin và khoáng chất",
      SDK: "VN-15979-12",
      SQD: "241/QLD-ÐK",
      xuatSu: "Thái Lan",
      congTy: "Mega Lifesciences Ltd.",
      dangBaoChe: "Viên nang mềm",
      diaChiSX: "384 Soi 6, Pattana 3 Road, Bangpoo Industrial Estate, Samutprakarn 10280",
    },
    {
      ten: "Nexium",
      hoatChatChinh: "Esomeprazole (dưới dạng Esomeprazole magnesi trihydrate) 10mg",
      SDK: "VN-17834-14",
      SQD: "294/QÐ-QLD",
      xuatSu: "Thụy Điển",
      congTy: "AstraZeneca AB",
      dangBaoChe: "Cốm kháng dịch dạ dày để pha hỗn dịch uống",
      diaChiSX: "SE-151 85 Sodertalje",
    },
    {
      ten: "Pivalone 1%",
      hoatChatChinh: "Tixocortol pivalate 1% (0,1g/10mL)",
      SDK: "VN-18042-14",
      SQD: "294/QÐ-QLD",
      xuatSu: "Pháp",
      congTy: "Farmea",
      dangBaoChe: "Hỗn dịch xịt mũi",
      diaChiSX: "10 rue Bouche- Thomas-49007 Angers Cedex 01",
    },
    {
      ten: "Zithromax",
      hoatChatChinh: "Azithromycin ( dưới dạng Azithromycin dihydrat) 250mg",
      SDK: "VN-18403-14",
      SQD: "536/QÐ-QLD",
      xuatSu: "Australia",
      congTy: "Pfizer (Australia) Pty., Ltd.",
      dangBaoChe: "Viên nang cứng",
      diaChiSX: "38-42 Wharf Road West Ryde, NSW 2114",
    },
  ];

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
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontWeight: 'bold', fontSize: 18, marginTop: 10 }}>Result</Text>
          {
            information.map((el, index) => <InforContainer infor={el} key={index} />)
          }

        </View>
      </ScrollView>
    </SafeAreaView>
  );

};
const styles = StyleSheet.create({

})