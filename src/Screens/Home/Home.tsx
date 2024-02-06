import { i18n, LocalizationKey } from "@/Localization";
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, Dimensions, ScrollView, TextInput } from "react-native";
import Checkbox from 'expo-checkbox';
import { MainScreens } from "..";
import { useNavigation } from '@react-navigation/native';
const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;
export interface IHomeProps {
  onNavigate: (string: MainScreens) => void;
}
import { useIsFocused } from "@react-navigation/native"


interface Reminder {
  __v: number,
  _id: string,
  amount: number,
  hour: number,
  minute: number,
  name: string,
  period: number,
  start_date: number,
  start_month: number,
  start_year: number,
  state: boolean,
}
export function Task({ task }: { task: Reminder }) {
  return (
    <View style={{ height: 80, width: width * 14 / 15, justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
      <View style={styles.task_container}>
        <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: 'center' }}>
          <Text style={{ fontSize: 20, fontWeight: '600' }}>{task.name}</Text>
          <Text style={{ fontSize: 12 }}>{task.hour}:{task.minute}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
          <Text style={{ color: "#8b8c89" }}>{task.amount} pill</Text>
        </View>
      </View>
    </View>
  )
}

export const Home = (props: IHomeProps) => {
  const navigation = useNavigation();
  const { onNavigate } = props;
  const [userName, setUserName] = useState('Guest')
  const [reminders, setReminders] = useState<Reminder[]>([])
  const isFocused = useIsFocused();
  const userID = "65c25e4d4a7017b0efb30dc9";
  const api_reminder = `https://medifind-be.proudsea-d3f4859a.eastasia.azurecontainerapps.io/api/v1/reminder/${userID}`
  useEffect(() => {
    async function getReminder() {
      try {
        let response = await fetch(api_reminder);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        else {
          let data = await response.json();
          const arr = data.data.reminders;
          console.log(arr.length);
          const sortedList = [...arr].sort((a, b) => {
            if (a.state !== b.state) {
              return a.state ? 1 : -1;
            }
            else if (a.hour !== b.hour) {
              return a.hour - b.hour;
            } else {
              return a.minute - b.minute;
            }
          });
          setReminders(sortedList);
          ///console.log(reminders.length);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
    getReminder();
  }, []);
  useEffect(() => {
    if (isFocused) {
      async function getReminder() {
        try {
          let response = await fetch(api_reminder);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          else {
            let data = await response.json();
            const arr = data.data.reminders;
            console.log(arr.length);
            const sortedList = [...arr].sort((a, b) => {
              if (a.state !== b.state) {
                return a.state ? 1 : -1;
              }
              else if (a.hour !== b.hour) {
                return a.hour - b.hour;
              } else {
                return a.minute - b.minute;
              }
            });
            setReminders(sortedList);
            ///console.log(reminders.length);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      }
      getReminder();
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.top_header}>
          <Image source={require('./iamges/user_icon.png')} style={styles.image_size} />
          <Image source={require('./iamges/noti_icon.png')} style={styles.image_size} />
        </View>
        <View style={styles.middle_header}>
          <Text style={{ fontSize: 22 }}>Hello</Text>
          <Text style={{ fontWeight: "bold", fontSize: 22 }}>{userName}!</Text>
        </View>
        <View style={styles.bottom_header}>
          <TextInput placeholder='Search Medicine' style={{ paddingLeft: 20 }} />
          <TouchableOpacity style={styles.search_btn} onPress={() => onNavigate(MainScreens.SEARCH)}>
            <Image source={require('./iamges/search.png')} style={styles.image_size} />
          </TouchableOpacity>

        </View>
      </View>
      <View style={styles.advertisement}>
        <View style={styles.left_advertisement}>
          <Text style={{ fontSize: 16, color: 'white', fontWeight: '500' }}>Early protection your family health</Text>
          <TouchableOpacity style={styles.learn_btn}>
            <Text style={{ color: "#407BFF" }}>Learn more</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.right_advertisement}>
          <Image source={require('./iamges/doctor.png')} style={{ height: 140, width: 100 }} />
        </View>
      </View>
      <View style={styles.service_container}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Services</Text>
        <ScrollView horizontal={true}>
          <TouchableOpacity style={styles.btn_service} onPress={() => onNavigate(MainScreens.CHAT)}>
            <Image source={require('./iamges/chat.png')} style={styles.image_service} />
            <Text style={{ color: 'white', fontWeight: 'bold' }}>Chat</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn_service} onPress={() => onNavigate(MainScreens.SCAN)}>
            <Image source={require('./iamges/scan.png')} style={styles.image_service} />
            <Text style={{ color: 'white', fontWeight: 'bold' }}>Scan</Text>
          </TouchableOpacity >
          <TouchableOpacity style={styles.btn_service} onPress={() => onNavigate(MainScreens.HISTORY)}>
            <Image source={require('./iamges/history.png')} style={styles.image_service} />
            <Text style={{ color: 'white', fontWeight: 'bold' }}>History</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn_service} onPress={() => onNavigate(MainScreens.SCHEDULE)}>
            <Image source={require('./iamges/calendar.png')} style={styles.image_service} />
            <Text style={{ color: 'white', fontWeight: 'bold' }}>Reminder</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn_service} onPress={() => onNavigate(MainScreens.SEARCH)}>
            <Image source={require('./iamges/search2.png')} style={styles.image_service} />
            <Text style={{ color: 'white', fontWeight: 'bold' }}>Search</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      <View style={styles.reminder_container}>
        <View style={styles.reminder_header}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            Reminders
          </Text>
          <TouchableOpacity onPress={() => onNavigate(MainScreens.SCHEDULE)}>
            <Text style={{ color: "#407BFF", fontSize: 14, textDecorationLine: "underline", fontWeight: "200" }}>
              See all
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={{ height: 200 }}>
          {
            reminders.filter((reminder) => reminder.state === false).map((reminder, index) => {
              return <Task task={reminder} key={index} />
            })
          }
        </ScrollView>

      </View>
    </View>

  );
};

const styles = StyleSheet.create(
  {
    container: {
      flex: 1,
      paddingTop: height / 20,
      backgroundColor: '#FFFFFF',
      paddingLeft: width / 30,
      paddingRight: width / 30
    },
    header: {
      flexDirection: 'column',
      justifyContent: 'center',
      rowGap: 12,
      marginTop: 20
    },
    image_size: {
      height: 45,
      width: 45
    },
    top_header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    middle_header: {
      flexDirection: 'row',
      columnGap: 5,
      alignItems: 'center',
    },
    bottom_header: {
      width: 14 * width / 15,
      backgroundColor: '#fff', // Add this line
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 50,
      height: 55,
      justifyContent: 'center',
      borderRadius: 10,
    },
    search_btn: {
      height: 40,
      width: 40,
      position: 'absolute',
      right: 10,
      top: 10,
      justifyContent: 'center',
      alignItems: 'center'
    },
    advertisement: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 20,
      backgroundColor: "#407BFF",
      height: 150,
      borderRadius: 10,
    },
    left_advertisement: {
      flex: 6,
      height: 150,
      justifyContent: 'center',
      paddingLeft: 20,
      rowGap: 10
    },
    right_advertisement: {
      height: 150,
      flex: 4,
      justifyContent: 'center',
      alignItems: 'center',
    },
    learn_btn: {
      backgroundColor: '#fff',
      height: 40,
      width: 110,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 20
    },
    service_container: {
      flexDirection: 'column',
      rowGap: 20,
      marginTop: 20
    },
    image_service: {
      height: 40,
      width: 40
    },
    btn_service: {
      height: 80,
      width: 100,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: "#407BFF",
      marginRight: 20,
      borderRadius: 20
    },
    reminder_container: {
      flexDirection: 'column',
      rowGap: 20,
      marginTop: 20
    },
    reminder_header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    task_container: {
      flexDirection: 'column',
      width: 14 * width / 15 - 10,
      padding: 10,
      backgroundColor: '#fff', // Add this line
      shadowColor: "#000000",
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      height: 80,
      justifyContent: 'center',
      borderRadius: 20,
      marginBottom: 16
    },
  }
)

