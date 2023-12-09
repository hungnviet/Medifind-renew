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

export function TaskContainer({ time, taskList, color }: { time: string, taskList: string[], color: string }) {
  return (
    <View style={styles.each_schedule_container}>
      <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{time}</Text>
      <ScrollView style={{ height: "100%", backgroundColor: `${color}`, marginTop: 10, borderRadius: 20, padding: 10 }}>
        {taskList.map(el => {
          return (
            <Text style={{ color: 'white', fontSize: 16 }}>{el}</Text>
          )
        })}
      </ScrollView>
    </View>
  )

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
  let taskMorning: string[] = ["Paracetamol", "Phospholugel"]
  let taskNoon: string[] = ["Cefpodoxime", "cenerta"];
  let taskEvening: string[] = ["Cefena", "Cephalaxin"];
  let time1 = "Morning"
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View>
          <Text style={styles.textHeader}>Find your desire health solution</Text>
        </View>
        <View>
          <Image source={require('./iamges/notice_icon2.png')} />
        </View>
      </View>
      <View style={styles.searchContainer}>
        <TextInput placeholder="Search drugs,articles,..." style={styles.search}></TextInput>
        <Image source={require('./iamges/find.png')} style={styles.find_icon} />
      </View>
      <View style={styles.functionContainer}>
        <View style={styles.eachFunctionContainer}>
          <TouchableOpacity style={styles.btn_function} onPress={() => onNavigate(MainScreens.SCAN)}>
            <Image source={require('./iamges/scan.png')} style={styles.icon_function} />
          </TouchableOpacity>
          <Text style={{ color: "#A1A8B0" }}>Scan</Text>
        </View>
        <View style={styles.eachFunctionContainer} >
          <TouchableOpacity style={styles.btn_function} onPress={() => onNavigate(MainScreens.CHAT)}>
            <Image source={require('./iamges/mediGpt.png')} style={styles.icon_function} />
          </TouchableOpacity>
          <Text style={{ color: "#A1A8B0" }}>Chat</Text>
        </View>
        <View style={styles.eachFunctionContainer}>
          <TouchableOpacity style={styles.btn_function} onPress={() => onNavigate(MainScreens.SEARCH)}>
            <Image source={require('./iamges/pharmacy.png')} style={styles.icon_function} />
          </TouchableOpacity>
          <Text style={{ color: "#A1A8B0" }}>Pharmacy</Text>
        </View>
        <View style={styles.eachFunctionContainer}>
          <TouchableOpacity style={styles.btn_function} onPress={() => onNavigate(MainScreens.SCHEDULE)}>
            <Image source={require('./iamges/calendar.png')} style={styles.icon_function} />
          </TouchableOpacity>
          <Text style={{ color: "#A1A8B0" }}>Reminder</Text>
        </View>

      </View>
      <View style={styles.bannerContainer}>
        <View style={styles.banner_content}>
          <Text style={{ color: "#E8F3F1", fontWeight: '600', fontSize: 16, width: width / 2 }}>Early protection for your family health</Text>
          <TouchableOpacity style={{ backgroundColor: "#11399F", width: 130, alignItems: 'center', height: 40, justifyContent: 'center', borderRadius: 20 }}>
            <Text style={{ color: "white", fontWeight: 'bold' }}>Learn more</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.banner_img}>
          <Image source={require("./iamges/newDoctor.png")} style={{ width: "100%", height: "90%" }} />
        </View>
      </View>
      <View style={styles.scheduleContainer}>
        <View style={styles.schedule_header}>
          <Text style={{ fontWeight: 'bold' }}>To date schedule</Text>
          <TouchableOpacity>
            <Text style={{ color: "#199A8E" }}>See all</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal >
          <TaskContainer key={1} time={time1} taskList={taskMorning} color="#407CE2" />
          <TaskContainer key={2} time="Afternoon" taskList={taskNoon} color="#E0CF33" />
          <TaskContainer key={3} time="Evening" taskList={taskEvening} color="#588157" />
        </ScrollView>
      </View>
    </View>

  );
};

const styles = StyleSheet.create(
  {
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: height / 20,
    },
    headerContainer: {
      flex: 3,
      width: width - 20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    searchContainer: {
      flex: 2,
      width: width - 20,
      justifyContent: 'center',
      alignItems: 'center'
    },
    functionContainer: {
      flex: 3,
      width: width - 20,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center'
    },
    bannerContainer: {
      flex: 5,
      backgroundColor: "#5390d9",
      width: width - 20,
      flexDirection: "row",
      marginTop: 20,
      marginBottom: 20,
      borderRadius: 20
    },
    scheduleContainer: {
      flex: 7,
      width: width - 20,
    },
    textHeader: {
      fontSize: 20,
      width: width / 2,
      fontWeight: 'bold'
    },
    search: {
      borderColor: 'grey',
      borderWidth: 1,
      width: 9 * (width / 10),
      height: 50,
      borderRadius: 30,
      paddingLeft: 40
    },
    find_icon: {
      position: 'absolute',
      left: 20
    },
    eachFunctionContainer: {
      justifyContent: 'center',
      alignItems: 'center'
    },
    btn_function: {
      height: 70,
      width: 70,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: "#FFFFFF",
      borderRadius: 20
    },
    icon_function: {
      height: '60%',
      width: '60%',
    },
    banner_content: {
      flex: 2,
      justifyContent: 'center',
      paddingLeft: 20,
      rowGap: 15
    },
    banner_img: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingLeft: 15
    },
    schedule_header: {
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    each_schedule_container: {
      width: 3 * width / 4,
      height: "80%",
      marginTop: 20,
      marginRight: 20
    }

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