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
      <View style={{ flexDirection:'column', justifyContent: 'space-around', width: '100%' }}>
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

export const Search = (props: ISearchProps) => {
  const { onNavigate } = props;
  const [success, setSuccess] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState<inforPobs[]>([]);

  function handleSearch() {
    setLoading(true);
    setSuccess(true);
    /// đợi cái api sống lại thì khúc này là fetch api
    /*  setLoading(true);
    fetch(
      `https://api.medifindlabs.com/medicines/search?searchText=${searchText}&database=vietnam`
    )
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        setSearchResult(data.data);
        setSuccess(true)
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error searching for medicine:", error);
      });
 */
    /*
        const text = searchText.toLowerCase();
        const res: inforPobs[] = dataList.filter(el => el.ten === text);
        setSearchResult(res);
        */
    fetch(`http://192.168.1.13:3000/api/v1/drug/${searchText}`)
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
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
  return (
    <View style={styles.container}>
      <View style={styles.search_bar_container}>
        <TextInput style={styles.input} placeholder="which medicine you want to find?" value={searchText} onChangeText={newText => setSearchText(newText)}></TextInput>
        {success ? <TouchableOpacity style={styles.btn_succes} onPress={handleAgain}>
          <Text style={{ fontSize: 18, color: 'white' }}>Again</Text>
        </TouchableOpacity> : <TouchableOpacity style={styles.btn_initial} onPress={handleSearch}>
          <Text style={{ fontSize: 18, color: 'white' }}>Search</Text>
        </TouchableOpacity>}
      </View>
      {!success ? <View style={{ width: width, height: height * 3 / 5, }}>
        <Image source={require('./images/doctor.jpg')} style={{ width: '100%', height: '100%', borderTopRightRadius: 50, borderTopLeftRadius: 50 }}></Image>
      </View> : <View style={styles.res_container} >
        <Text style={{ color: 'white', paddingBottom: 12 }}> {searchResult.length} {searchResult.length > 0 ? 'results' : 'result'} was found</Text>

        <ScrollView showsVerticalScrollIndicator={false}>
          {
            searchResult.length > 0 ? searchResult.map((data, index) => <InforContainer key={index} infor={data} />) : <Text style={{ color: 'grey', fontSize: 18, paddingLeft: 20 }}>Sorry! There was any error when search please do it again</Text>
          }
        </ScrollView>
      </View>}

    </View >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 50

  },
  search_bar_container: {
    flex: 2,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: 10
  },
  res_container: {
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    flex: 6,
    justifyContent: 'center',
    alignItems: 'center'
  },

  input: {
    width: width * 4 / 5,
    height: 55,
    borderColor: '#B4BAC9',
    borderWidth: 1,
    borderRadius: 22,
    fontSize: 16,
    paddingLeft: 20

  },
  btn_initial: {
    backgroundColor: '#407CE2',
    width: width * 4 / 5,
    height: 55,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn_succes: {
    backgroundColor: '#FF6666',
    width: width * 4 / 5,
    height: 55,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
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
