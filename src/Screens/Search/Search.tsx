import { i18n, LocalizationKey } from "@/Localization";
import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Dimensions, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { HStack, Spinner, Heading, Toast } from "native-base";
import { User } from "@/Services";
import { themeVariables } from "@/Theme";
import { LinearGradient } from "expo-linear-gradient";
import { MainScreens } from "..";
import { unescape, upperCase } from "lodash";

export interface ISearchProps {
  onNavigate: (string: MainScreens) => void;
}

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;
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
      backgroundColor: 'white', width: width * 8 / 9, borderRadius: 8, borderColor: color.grey_light, marginTop: 10, borderWidth: 2, paddingTop: 12, paddingLeft: 15, paddingRight: 15, shadowOffset: { width: -5, height: 5, },
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
const informationArray: inforPobs[] = [
  {
    ten: "Panadol cảm cúm",
    hoatChatChinh: "Mỗi viên chứa: Paracetamol 500mg; Cafein 25mg; Phenylephrine HCl 5mg",
    SDK: "VD-16582-12",
    SQD: "99/QĐ-QLD",
    xuatSu: "Việt Nam",
    congTy: "Công ty Cổ phần Dược phẩm Sanofi-Synthelabo Việt Nam",
    dangBaoChe: "Hộp 10 vỉ x 10 viên nén bao phim",
    diaChiSX: "15/6C Đặng Văn Bi-Thủ Đức-Tp Hồ Chí Minh",
  },
  {
    ten: "Panadol extra",
    hoatChatChinh: "Paracetamol 500mg; Caffein 65mg",
    SDK: "VD-21189-14",
    SQD: "296/QÐ-QLD",
    xuatSu: "Việt Nam",
    congTy: "Công ty Cổ phần Dược phẩm Sanofi-Synthelabo Việt Nam",
    dangBaoChe: "Hộp 15 vỉ x 12 viên",
    diaChiSX: "15/6C Đặng Văn Bi-Thủ Đức-Tp Hồ Chí Minh",
  },
  {
    ten: "Panadol",
    hoatChatChinh: "Paracetamol 500mg",
    SDK: "VD-29584-18",
    SQD: "99/QÐ-QLD",
    xuatSu: "Việt Nam",
    congTy: "Công ty Cổ phần Dược phẩm Sanofi-Synthelabo Việt Nam",
    dangBaoChe: "Hộp 10 vỉ x 12 viên",
    diaChiSX: "15/6C Đặng Văn Bi-Thủ Đức-Tp Hồ Chí Minh",
  },
  {
    ten: "Panadol",
    hoatChatChinh: "Paracetamol",
    SDK: "VN-12465-11",
    SQD: "127/QĐ-QLD",
    xuatSu: "Malaysia",
    congTy: "Sterling Drug (M) Sdn. Bhd.",
    dangBaoChe: "Hộp 10 vỉ x 10 viên",
    diaChiSX: "Lot 89, Jalan Enggang, Ampang-Ulu Kelang Industrial Estate, 54200 Selangor",
  },
];


export const Search = (props: ISearchProps) => {
  const { onNavigate } = props;
  const [success, setSuccess] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState<inforPobs[]>([]);

  async function handleSearch() {
    if (searchText === "") {
      alert('please enter medicines name');
    }
    setLoading(true);
    await fetch(`https://medifind-be.proudsea-d3f4859a.eastasia.azurecontainerapps.io/api/v1/drug/${searchText}`)
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        setSuccess(true);
        setRes(searchText);
        setSearchText("");
        if (data.status === "success") {
          setSearchResult(data.data.result);
        } else {
          console.error("Error searching for medicine: Invalid response status");
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error searching for medicine:", error);
      });
  };
  function handleAgain() {
    setLoading(false);
    setSuccess(false);
    setSearchResult([]);
    setSearchText("");


  };


  const [res, setRes] = useState<string>("");
  const [searchHistory, setSearchHistory] = useState<string[]>(['Panadol Extra', 'Phospholugel', 'Cometrix']);
  return (
    <View style={styles.container}>
      <Text style={{ fontWeight: 'bold', fontSize: 24 }} >Search</Text>
      <View style={styles.searchContainer} >
        <Image source={require('./images/Search.png')} style={styles.iconSearch}></Image>
        <TextInput placeholder="Search medicines" value={searchText} onChangeText={setSearchText} style={styles.textInput}></TextInput>
        <TouchableOpacity style={styles.btnSearch} onPress={handleSearch}>
          <Text>GO</Text>
        </TouchableOpacity>
      </View>
      {
        loading === false && success === false && (
          <View style={styles.historyContainer}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>Recently search</Text>
            <View>
              {
                searchHistory.map((el, index) =>
                  <Text style={{ color: '#ADADAD', fontWeight: 'bold' }} key={index}>{el}</Text>
                )
              }
            </View>
          </View>
        )
      }
      {
        success === true && (
          <View style={styles.historyContainer}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>{res}</Text>
            <ScrollView style={{ marginBottom: 200 }}>
              {
                searchResult.map((el, index) => <InforContainer infor={el} key={index} />)
              }
            </ScrollView>

          </View>
        )
      }
      {
        loading === true && (
          <View>
            <Text>searching...</Text>
          </View>
        )
      }

    </View >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 50,
    alignItems: 'center'
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width * 90 / 100,
    height: 70,
    alignItems: 'center',
    marginTop: 20
  },
  textInput: {
    backgroundColor: '#ADADAD',
    width: width * 75 / 100,
    height: 60,
    borderRadius: 10,
    paddingLeft: 55
  }, iconSearch: {
    position: 'absolute',
    zIndex: 10000,
    left: 5
  },
  btnSearch: {
    backgroundColor: '#BDE0FE',
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  historyContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: width * 90 / 100,
    marginTop: 20
  }
});
const color = {
  grey_white: '#F3F5Fc',
  grey_light: '#F1F3F5',
  grey_medium: '#B4BAC9',
  blue_light: '#98B3E1',
  blue_normal: '#407CE2',
  blue_dark: '#223A6A',
  blue_black: '#213359'

}
