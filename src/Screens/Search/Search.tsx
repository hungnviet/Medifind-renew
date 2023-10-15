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
export const Search = (props: ISearchProps) => {
  const { onNavigate } = props;
  const [success, setSuccess] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState([]);

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
          <View style={{
            backgroundColor: 'white', width: width * 6 / 7, borderRadius: 8, borderColor: color.grey_light, marginTop: 10, borderWidth: 2, paddingTop: 12, paddingLeft: 15, paddingRight: 15, shadowOffset: { width: -5, height: 5, },
            shadowColor: '#171717',
            shadowOpacity: 0.6,
            shadowRadius: 3,
          }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%' }}>
              <Text style={{ fontSize: 18, textTransform: 'uppercase', fontWeight: 'bold' }}>Paradol</Text>
              <Text style={{ fontSize: 16 }}>500mg</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', columnGap: 15, width: '100%' }}>
              <Text style={{ fontSize: 12 }}>SĐK :123456789</Text>
              <Text style={{ fontSize: 12 }}>SQĐ :123456789</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', columnGap: 15, width: '100%' }}>
              <Text style={{ fontSize: 12 }}>Xuất xứ:</Text>
              <Text style={{ fontSize: 12 }}>Hàn Quốc</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', columnGap: 15, width: '100%' }}>
              <Text style={{ fontSize: 12 }}>Công ty:</Text>
              <Text style={{ fontSize: 12 }}>medicine company</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', columnGap: 15, width: '100%' }}>
              <Text style={{ fontSize: 12 }}>Dạng bào chế:</Text>
              <Text style={{ fontSize: 12 }}>Rắn/Lỏng</Text>
            </View>
            <Text style={{ fontSize: 12 }}>Địa chỉ sản xuất:</Text>
            <Text style={{ fontSize: 12 }}>268 Lý Thường Kiệt/ QUận 10/ Thành Phố Hồ Chí Minh</Text>
          </View>


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
    fontSize: 16

  },
  btn_initial: {
    backgroundColor: '#C01C1C',
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
