import { Flex } from "@/Components";
import { BaseText } from "@/Components/BaseText";
import { DatabaseSource } from "@/Services";
import { themeVariables } from "@/Theme/Variables";
import { get } from "lodash";
import React from "react";
import { SafeAreaView, ScrollView, Image } from "react-native";
import { Header } from "react-native/Libraries/NewAppScreen";

export const MedicineDetail = (props: any) => {
  const { data, database = DatabaseSource.VIETNAM } = props;
  return (
    <Flex
      style={{
        backgroundColor: "#e6f6ff",
      }}
    >
      <SafeAreaView
        style={{
          width: "100%",
          flex: 1,
        }}
      >
        <Flex
          align="stretch"
          justify="start"
          style={{
            width: "100%",
            marginTop: Header.HEIGHT,
            backgroundColor: "#e6f6ff",
            paddingHorizontal: themeVariables.spacing_lg,
          }}
        >
          <Flex flex={0} align="start" wrap="nowrap">
            <Flex flex={0} style={{ marginTop: 16 }}>
              <BaseText size={themeVariables.fontSize_lg} bold>
                {database === DatabaseSource.VIETNAM
                  ? data.tenThuoc
                  : data.name}
              </BaseText>
            </Flex>
            <Flex flex={0}>
              <BaseText
                color={themeVariables.redSecondaryTextColor}
                size={themeVariables.fontSize_xs}
                bold
              >
                {data.isAntibiotics ? "Antibiotics" : ""}
              </BaseText>
            </Flex>
          </Flex>
          <Flex
            justify="around"
            align="stretch"
            style={{
              marginRight: themeVariables.spacing_xl,
            }}
          >
            <Flex align="start" flex={0}>
              <BaseText
                color={themeVariables.graySecondaryTextColor}
                size={themeVariables.fontSize_sm}
                style={{
                  marginBottom: themeVariables.spacing_xs,
                }}
              >
                {"Packaging size"}
              </BaseText>
              <BaseText bold>
                {database === DatabaseSource.VIETNAM
                  ? get(data, "thongTinThuocCoBan.dongGoi")
                  : data.categories}
              </BaseText>
            </Flex>
            <Flex align="start" flex={0}>
              <BaseText
                color={themeVariables.graySecondaryTextColor}
                size={themeVariables.fontSize_sm}
                style={{
                  marginBottom: themeVariables.spacing_xs,
                }}
              >
                {"Country of origin"}
              </BaseText>
              <BaseText bold>
                {database === DatabaseSource.VIETNAM
                  ? data.congTySanXuat.nuocSanXuat
                  : data.drugbank_id}
              </BaseText>
            </Flex>
          </Flex>
        </Flex>
        <Flex
          style={{
            backgroundColor: themeVariables.backgroundColor,
            paddingVertical: themeVariables.spacing_lg,
          }}
        >
          <ScrollView
            scrollEventThrottle={50}
            contentContainerStyle={{}}
            style={{
              flex: 1,
              width: "100%",
              paddingHorizontal: themeVariables.spacing_lg,
            }}
          >
            <Flex align="start" flex={0}>
              <BaseText
                style={{
                  marginBottom: themeVariables.spacing_xs,
                }}
                color={themeVariables.graySecondaryTextColor}
                bold
              >
                {"Drug classification"}
              </BaseText>
              <BaseText size={themeVariables.fontSize_sm}>
                {database === DatabaseSource.VIETNAM
                  ? data.phanLoaiThuocEnum === 2
                    ? "Thuốc kê đơn"
                    : "Thuốc không kê đơn"
                  : data.type}
              </BaseText>
            </Flex>
            <Flex
              align="start"
              flex={0}
              style={{
                marginTop: themeVariables.spacing_lg,
              }}
            >
              <BaseText
                style={{
                  marginBottom: themeVariables.spacing_xs,
                }}
                color={themeVariables.graySecondaryTextColor}
                bold
              >
                {"Active ingredients"}
              </BaseText>
              <BaseText size={themeVariables.fontSize_sm}>
                {database === DatabaseSource.VIETNAM
                  ? get(data, "thongTinThuocCoBan.hoatChatChinh")
                  : data.description}
              </BaseText>
            </Flex>
            {database === DatabaseSource.VIETNAM ? (
              <>
                <Flex
                  align="start"
                  flex={0}
                  style={{
                    marginTop: themeVariables.spacing_lg,
                  }}
                >
                  <BaseText
                    style={{
                      marginBottom: themeVariables.spacing_xs,
                    }}
                    color={themeVariables.graySecondaryTextColor}
                    bold
                  >
                    {"Pharmaceutical form"}
                  </BaseText>
                  <BaseText size={themeVariables.fontSize_sm}>
                    {get(data, "thongTinThuocCoBan.dangBaoChe")}
                  </BaseText>
                </Flex>
                <Flex
                  align="start"
                  flex={0}
                  style={{
                    marginTop: themeVariables.spacing_lg,
                  }}
                >
                  <BaseText
                    style={{
                      marginBottom: themeVariables.spacing_xs,
                    }}
                    color={themeVariables.graySecondaryTextColor}
                    bold
                  >
                    {"Life Span"}
                  </BaseText>
                  <BaseText size={themeVariables.fontSize_sm}>{`${get(
                    data,
                    "thongTinThuocCoBan.tuoiTho"
                  )}`}</BaseText>
                </Flex>
                <Flex
                  align="start"
                  flex={0}
                  style={{
                    marginTop: themeVariables.spacing_lg,
                  }}
                >
                  <BaseText
                    style={{
                      marginBottom: themeVariables.spacing_xs,
                    }}
                    color={themeVariables.graySecondaryTextColor}
                    bold
                  >
                    {"Manufactured at"}
                  </BaseText>
                  <BaseText size={themeVariables.fontSize_sm}>
                    {`${get(data, "congTySanXuat.tenCongTySanXuat")}\n${get(
                      data,
                      "congTySanXuat.diaChiSanXuat"
                    )}`}
                  </BaseText>
                </Flex>
              </>
            ) : null}
          </ScrollView>
        </Flex>
        {/* Overlay component */}
        <Flex
          direction="column"
          justify="center"
          align="stretch"
          style={{
            position: "absolute",
            zIndex: 99,
            top: "40%",
            left: "50%",
            width: "50%",
            height: "30%",
          }}
        >
          <Flex
            direction="column"
            justify="center"
            style={{
              padding: themeVariables.spacing_lg,
            }}
          >
            <Image
              style={{
                width: 196,
                height: 196,
                resizeMode: "cover",
              }}
              source={require("../../Assets/Images/pill-detail.png")}
            />
          </Flex>
          {/*
              <Flex
                flex={0}
                direction="row"
                justify="between"
                style={{
                  marginVertical: themeVariables.spacing_xl,
                }}
              >
                <Flex justify="start" direction="row" flex={4}>
                  <BaseText bold size={themeVariables.fontSize_lg}>
                    {data.tenThuoc}
                  </BaseText>
                </Flex>
                <Flex justify="center" direction="row" flex={1}>
                  <TouchableOpacity onPress={this.onSetFavoriteStatus}>
                    <IconComponent
                      size={20}
                      color={
                        isFavorite
                          ? themeVariables.redSecondaryTextColor
                          : themeVariables.lightGraySecondaryTextColor
                      }
                      name={isFavorite ? 'heart' : 'hearto'}
                    />
                  </TouchableOpacity>
                </Flex>
              </Flex>
              <Flex
                direction="row"
                justify="start"
                align="start"
                flex={1}
                style={{ marginVertical: themeVariables.spacing_md }}
              >
                <Flex align="stretch">
                  <Flex align="start" flex={1}>
                    <BaseText
                      style={{ marginVertical: themeVariables.spacing_xs }}
                      size={themeVariables.fontSize_sm}
                    >
                      {`• ${data.soDangKy}`}
                    </BaseText>
                  </Flex>
                  <Flex align="start" flex={1}>
                    <BaseText
                      style={{ marginVertical: themeVariables.spacing_xs }}
                      size={themeVariables.fontSize_sm}
                    >
                      {`• ${data.phanLoai}`}
                    </BaseText>
                  </Flex>
                </Flex>
                <Flex align="stretch">
                  <Flex align="start" flex={1}>
                    <BaseText
                      style={{ marginVertical: themeVariables.spacing_xs }}
                      size={themeVariables.fontSize_sm}
                    >
                      {`• ${data.baoChe}`}
                    </BaseText>
                  </Flex>
                  <Flex align="start" flex={1}>
                    <BaseText
                      style={{ marginVertical: themeVariables.spacing_xs }}
                      size={themeVariables.fontSize_sm}
                    >
                      {`• ${data.nuocSx}`}
                    </BaseText>
                  </Flex>
                </Flex>
              </Flex>
              <Flex justify="start" flex={2}>
                <BaseText align="justify" size={themeVariables.fontSize_sm}>
                  {
                    // tslint:disable-next-line:max-line-length
                    'Duis aute irure dolor in reprehenderit in voluptate velit ess
                    // e cillum dolore eu fugiat nulla pariatur'
                  }
                </BaseText>
              </Flex>
            </Flex> */}
        </Flex>
      </SafeAreaView>
    </Flex>
  );
};
