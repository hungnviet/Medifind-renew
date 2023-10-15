import { i18n, LocalizationKey } from "@/Localization";
import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, Dimensions, ScrollView, TextInput } from "react-native";
import { StatusBar } from "expo-status-bar";
import { HStack, Spinner, Heading } from "native-base";
import { User } from "@/Services";
import { themeVariables } from "@/Theme";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from '@expo/vector-icons';
import { MainScreens } from "..";
const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;
export interface IHomeProps {
  onNavigate: (string: MainScreens) => void;
}

export const Home = (props: IHomeProps) => {

  const { onNavigate } = props;
  const createAlert = () => {
    Alert.alert(
      'Updating...',
      '',
      [
        {
          text: 'OK',
          onPress: () => console.log('OK Pressed')
        },
      ]
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.header_infor}>
          <View style={styles.avatar}>
            <Image source={require('./iamges/avatar.jpg')} style={{ height: 60, width: 60, borderRadius: 40 }} />
          </View>
          <View style={styles.user_in4}>
            <Text style={{ color: '#B4BAC9' }}>Good morning</Text>
            <Text style={{ fontWeight: '700' }}>X</Text>
          </View>
          <TouchableOpacity style={styles.mess_icon}>
            <Image source={require('./iamges/message_icon.png')} style={{ height: 40, width: 40, borderRadius: 40 }} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.notice_icon}>
            <Image source={require('./iamges/notice_icon.png')} style={{ height: 40, width: 40, borderRadius: 40 }} />
          </TouchableOpacity>


        </View>
        <View style={styles.header_search}>
          <TextInput placeholder=' Medicine, Service' style={{ width: width - 40, height: 55, borderRadius: 10, backgroundColor: '#d3d3d3', paddingLeft: 25 }} />
          <TouchableOpacity style={{ position: 'absolute', zIndex: 100, height: 55, width: 55, right: 0, justifyContent: 'center', alignItems: 'center' }}>
            <Image source={require('./iamges/find.png')} style={{ height: 40, width: 40, borderRadius: 40 }} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.upcoming}>
        <View style={styles.upcoming_header}>
          <Text style={{ fontSize: 16, fontWeight: '700', color: color.blue_black }}>
            Upcoming Apointments
          </Text>
          <TouchableOpacity>
            <Text style={{ fontSize: 14, fontWeight: '500', color: '#407CE2' }}>
              See all
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.upcoming_in4} >
          <View style={styles.upcoming_img}>
            <Image source={require('./iamges/Doctor.png')} style={{ height: 120, width: 120, borderRadius: 80 }} />


          </View>
          <View style={styles.upcoming_content}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white' }}>Take The Pill</Text>
            <Text style={{ fontSize: 14, fontWeight: '600', color: 'white', marginTop: 10 }}>Metformin</Text>
            <Text style={{ fontSize: 12, color: 'white' }}>Note: Take it before meal</Text>
            <Text style={{ fontSize: 12, color: 'white' }}>10:00-10:30 AM</Text>
          </View>


        </View>


      </View>
      <View style={styles.features}  >
        <Text style={{ marginLeft: 20, fontSize: 16, fontWeight: '700', color: color.blue_black }}>
          Service
        </Text>
        <ScrollView horizontal={true} style={{ marginLeft: 10, marginRight: 10 }} showsHorizontalScrollIndicator={false}>
          <View style={styles.feature} >
            <View style={{ flex: 3, height: '100%', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 15, paddingLeft: 1 }}>Medication reminder</Text>
              <TouchableOpacity style={{ backgroundColor: color.blue_normal, justifyContent: 'center', alignItems: 'center', width: '60%', height: '30%', borderRadius: 40 }} onPress={() => onNavigate(MainScreens.SCHEDULE)}>


                <Text style={{ fontWeight: 'bold', color: color.grey_white }}>Set up now</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 2, height: '100%', justifyContent: 'center', alignItems: 'center' }}>
              <Image source={require('./iamges/calendarRed.jpg')} style={{ height: '80%', width: '80%', }} />
            </View>
          </View>
          <View style={styles.feature}>
            <View style={{ flex: 2, marginLeft: 12 }}>
              <Text style={{ fontWeight: '700', fontSize: 16 }}>MediGPT</Text>
              <Text style={{ fontWeight: '300', fontSize: 12 }}>Chat bot powered by chat GPT</Text>
              <TouchableOpacity style={{ backgroundColor: color.blue_normal, width: '50%', height: '25%', justifyContent: 'center', alignItems: 'center', borderRadius: 30 }} onPress={() => onNavigate(MainScreens.CHAT)}>
                <Text style={{ color: color.grey_white }}>Try now</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1, height: '100%', justifyContent: 'center', alignItems: 'center' }}>
              <Image source={require('./iamges/mediGPT.jpg')} style={{ height: '80%', width: '100%', borderRadius: 50 }} />
            </View>
          </View>
          <View style={styles.feature}>
            <View style={{ height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center', rowGap: 20 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Scan your prescription</Text>
              <TouchableOpacity style={{ backgroundColor: color.blue_normal, width: '50%', height: '30%', justifyContent: 'center', alignItems: 'center', borderRadius: 30 }}
                onPress={() => onNavigate(MainScreens.SCAN)}>
                <Text style={{ fontWeight: 'bold', color: color.grey_white }}>Scan now</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View >
      <View style={styles.prophylaxis}>
        <Text style={{ fontSize: 16, fontWeight: 'bold', color: color.blue_dark, marginLeft: 20, marginBottom: 10 }}>Annual prophylaxis</Text>
        <View style={styles.anual_prophylaxis} >
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: color.grey_white, fontWeight: '600', fontSize: 16, marginBottom: 10 }}>Get vaccinated</Text>
            <Text style={{ color: color.grey_white, fontWeight: '300', fontSize: 12, textAlign: 'left', marginLeft: 12 }}>Take the reminder vaccine for improving antibody against covid19</Text>
          </View>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image source={require('./iamges/covid.jpg')} style={{ width: '90%', height: '90%', borderRadius: 70 }} />
          </View>
        </View>
      </View>
    </View >

  );
};

const styles = StyleSheet.create(
  {
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      rowGap: 10,
      paddingTop: 50,
      backgroundColor: 'white',
      paddingBottom: 20
    },
    header: {
      flex: 3,
      width: width,
      justifyContent: 'center',
      alignItems: 'center',


    },
    upcoming: {
      flex: 5,
      width: width,

    },
    features: {
      flex: 5,
      width: width,
      rowGap: 10

    },
    feature: {
      borderWidth: 2, borderColor: '#B4BAC9', height: height / 6, width: width - 40, marginLeft: 10, marginRight: 10, borderRadius: 30,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',


    },

    prophylaxis: {
      flex: 5,
      width: width
    },
    header_infor: {
      flexDirection: 'row',
      flex: 3,
      justifyContent: 'center',
      alignItems: 'center',
      columnGap: 10
    },
    avatar: {
      flex: 1,
      marginRight: 10,
      marginLeft: 15

    },
    user_in4: {
      flex: 4,
      flexDirection: 'column',
      justifyContent: 'flex-start'

    },
    mess_icon: {
      flex: 1,
      height: '80%',
      justifyContent: 'center',
      alignItems: 'center',

    },
    notice_icon: {
      flex: 1,
      height: '80%',
      justifyContent: 'center',
      alignItems: 'center'
    },

    header_search: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center',
    },

    upcoming_header: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingRight: 20,
      paddingLeft: 20,

    },
    upcoming_in4: {
      backgroundColor: '#407CE2',
      flex: 4,
      flexDirection: 'row',
      columnGap: 10,
      marginLeft: 20,
      marginRight: 20,
      borderRadius: 10
    },
    anual_prophylaxis: {
      flex: 3,
      flexDirection: 'row',
      columnGap: 10,
      marginLeft: 20,
      marginRight: 20,
      borderRadius: 10,
      backgroundColor: '#407CE2'
    },
    upcoming_img: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center'

    },
    upcoming_content: {
      flex: 3,
      justifyContent: 'center',
      rowGap: 3

    },
    iconContainer: {
      width: 30,
      height: 30,
      justifyContent: 'center',
      alignItems: 'center',
    },
    Icon: {
      height: '100%',
      width: '100%'
    },
    activityComponent: {
      flexDirection: "row",
      backgroundColor: themeVariables.backgroundColor,
      width: "100%",
      height: 80,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: themeVariables.lightGraySecondaryTextColor,
      marginVertical: 5,
    },
    thumbnailContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    thumbnail: {
      resizeMode: "contain",
      width: 50,
      height: 50,
    },
    contentContainer: {
      flex: 3,
      marginVertical: 5,
    },
    titleContainer: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    categoryContainer: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
    },

  }
)
const color = {
  grey_white: '#F3F5Fc',
  grey_light: '#F1F3F5',
  grey_medium: '#B4BAC9',
  blue_light: '#98B3E1',
  blue_normal: '#407CE2',
  blue_dark: '#223A6A',
  blue_black: '#213359'

}

/*
  <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.header_infor}>
          <View style={styles.avatar}>
            <Image source={require('./iamges/avatar.jpg')} style={{ height: 60, width: 60, borderRadius: 40 }} />
          </View>
          <View style={styles.user_in4}>
            <Text style={{ color: '#B4BAC9' }}>Good morning</Text>
            <Text style={{ fontWeight: '700' }}>X</Text>
          </View>
          <TouchableOpacity style={styles.mess_icon}>
            <Image source={require('./iamges/message_icon.png')} style={{ height: 40, width: 40, borderRadius: 40 }} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.notice_icon}>
            <Image source={require('./iamges/notice_icon.png')} style={{ height: 40, width: 40, borderRadius: 40 }} />
          </TouchableOpacity>

        </View>
        <View style={styles.header_search}>
          <TextInput placeholder=' Medicine, Service' style={{ width: width - 40, height: 55, borderRadius: 10, backgroundColor: '#eeeeee', paddingLeft: 25 }} />
          <TouchableOpacity style={{ position: 'absolute', zIndex: 100, height: 55, width: 55, right: 0, justifyContent: 'center', alignItems: 'center' }}>
            <Image source={require('./iamges/find.png')} style={{ height: 40, width: 40, borderRadius: 40 }} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.upcoming}>
        <View style={styles.upcoming_header}>
          <Text style={{ fontSize: 16, fontWeight: '700', color: color.blue_black }}>
            Upcoming Apointments
          </Text>
          <TouchableOpacity>
            <Text style={{ fontSize: 14, fontWeight: '500', color: '#407CE2' }}>
              See all
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.upcoming_in4} >
          <View style={styles.upcoming_img}>
            <Image source={require('./iamges/Doctor.png')} style={{ height: 120, width: 120, borderRadius: 80 }} />

          </View>
          <View style={styles.upcoming_content}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white' }}>Take The Pill</Text>
            <Text style={{ fontSize: 14, fontWeight: '600', color: 'white', marginTop: 10 }}>Metformin</Text>
            <Text style={{ fontSize: 12, color: 'white' }}>Note: Take it before meal</Text>
            <Text style={{ fontSize: 12, color: 'white' }}>10:00-10:30 AM</Text>
          </View>

        </View>

      </View>
      <View style={styles.features}  >
        <Text style={{ marginLeft: 20, fontSize: 16, fontWeight: '700', color: color.blue_black }}>
          Service
        </Text>
        <View style={{ flexDirection: 'row', width: width - 40, height: '80%', marginLeft: 20, columnGap: 20 }}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', height: 70, width: 70, backgroundColor: '#cfd4de', borderRadius: 50, borderWidth: 1, borderColor: 'grey' }}>
              <Image source={require('./iamges/calendar.png')} style={{ height: 40, width: 40 }} />
            </TouchableOpacity>
            <Text style={{ fontWeight: '600' }}>Calendar</Text>

          </View>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', height: 70, width: 70, backgroundColor: '#cfd4de', borderRadius: 50, borderWidth: 1, borderColor: 'grey' }}>
              <Image source={require('./iamges/scan.png')} />
            </TouchableOpacity>
            <Text style={{ fontWeight: '600' }}>Scan</Text>

          </View>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', height: 70, width: 70, backgroundColor: '#cfd4de', borderRadius: 50, borderWidth: 1, borderColor: 'grey' }}>
              <Image source={require('./iamges/mediGpt.png')} />
            </TouchableOpacity>
            <Text style={{ fontWeight: '600' }}>MediGPT</Text>

          </View>
        </View>

      </View >
      <View style={styles.prophylaxis}>
        <Text style={{ fontSize: 16, fontWeight: 'bold', color: color.blue_dark, marginLeft: 20, marginBottom: 10 }}>Annual prophylaxis</Text>
        <View style={styles.anual_prophylaxis} >
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: color.grey_white, fontWeight: '600', fontSize: 16, marginBottom: 10 }}>Get vaccinated</Text>
            <Text style={{ color: color.grey_white, fontWeight: '300', fontSize: 12, textAlign: 'left', marginLeft: 12 }}>Take the reminder vaccine for improving antibody against covid19</Text>
          </View>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image source={require('./iamges/covid.jpg')} style={{ width: '90%', height: '90%', borderRadius: 70 }} />
          </View>
        </View>
      </View>
    </View >
*/