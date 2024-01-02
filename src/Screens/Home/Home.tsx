import { i18n, LocalizationKey } from "@/Localization";
import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, Dimensions, ScrollView, TextInput } from "react-native";
import Checkbox from 'expo-checkbox';
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
        {taskList.map((el, index) => {
          return (
            <Text style={{ color: 'white', fontSize: 16 }} key={index}>{el}</Text>
          )
        })}
      </ScrollView>
    </View>
  )

}
interface Task { name: string, amount: string, hour: number, minute: number, state: boolean }
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
  const [listTask, setListTask] = useState<Task[]>([
    { name: "Panadol Extra", amount: "1 pill", hour: 8, minute: 0, state: false },
    { name: "Panadol Extra", amount: "1 pill", hour: 8, minute: 30, state: false },
  ])
  const handleCheckboxChange = (index: number) => {
    setListTask(prevList => {
      const newList = [...prevList];
      newList.splice(index, 1);
      //newList[index].state = !newList[index].state;
      newList.sort((a, b) => {
        if (a.state !== b.state) {
          return a.state ? 1 : -1; // true comes before false
        } else if (a.hour !== b.hour) {
          return a.hour - b.hour; // sort by hour
        } else {
          return a.minute - b.minute; // sort by minute if hour is the same
        }
      });
      return newList;
    });
  };
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
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Next medicines for you</Text>
          <TouchableOpacity onPress={() => onNavigate(MainScreens.SCHEDULE)}>
            <Text style={{ color: '#407BFF' }}>See all</Text>
          </TouchableOpacity>
        </View>

        <View>
          {
            listTask.length === 0 ?
              <View style={{ marginTop: 30, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ width: width * (2 / 3) }}>You have taken all the necessary medicine for the day</Text>
              </View>
              :
              listTask.slice(0, 2).map((el, index) => (
                <View style={[styles.taskContainer, { backgroundColor: el.state ? "#E0E0E0" : "#FFFFFF" }]} key={index}>
                  <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', columnGap: 10 }}>
                    <Image source={el.state ? require('./iamges/pillTrue.png') : require('./iamges/pillFalse.png')} style={{ height: 40, width: 40 }} />
                    <View>
                      <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{el.name}</Text>
                      <Text style={{ color: '#A1A8B0' }}>{el.amount}</Text>
                    </View>
                  </View>
                  <Text style={{ color: '#407BFF', fontSize: 16, position: 'absolute', left: width * 2 / 3 - 10 }}>{el.hour}:{el.minute}</Text>
                  <Checkbox style={{ height: 30, width: 30 }} value={el.state} onValueChange={() => handleCheckboxChange(index)} />
                </View>
              ))
          }
        </View>
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
      backgroundColor: "#407BFF",
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
      fontWeight: 'bold',
      color: "#101623"
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
    },
    taskContainer: {
      flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 20, height: 80, borderRadius: 4, paddingLeft: 10, paddingRight: 10
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