import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Alert, Modal, StyleSheet, View, Text, TextInput } from 'react-native';
import { ExpandableCalendar, AgendaList, CalendarProvider, WeekCalendar } from 'react-native-calendars';
import testIDs from '../testIDs';
import { agendaItems, getMarkedDates, Item } from '../mocks/agendaItems';
import AgendaItem from '../mocks/AgendaItem';
import { getTheme, themeColor, lightThemeColor } from '../mocks/theme';
import { FAB } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { themeVariables } from "@/Theme";
import { Pressable } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

const leftArrowIcon = require('../img/previous.png');
const rightArrowIcon = require('../img/next.png');
// const ITEMS: any[] = agendaItems;

interface Props {
  weekView?: boolean;
}

const ExpandableCalendarScreen = (props: Props) => {
  const [items, setItems] = useState<Item[]>([]);
  const { weekView } = props;
  const marked = useRef(getMarkedDates(items));
  const theme = useRef(getTheme());
  const today = new Date().toISOString().split('T')[0];
  const todayBtnTheme = useRef({
    todayButtonTextColor: themeColor
  });

  const [modalVisible, setModalVisible] = useState(false);

  const [nameMedicine, setNameMedicine] = useState("");

  const [dayMedicine, setDayMedicine] = useState("");

  const [hourMedicine, setHourMedicine] = useState("");

  // const onDateChanged = useCallback((date, updateSource) => {
  //   console.log('ExpandableCalendarScreen onDateChanged: ', date, updateSource);
  // }, []);

  // const onMonthChange = useCallback(({dateString}) => {
  //   console.log('ExpandableCalendarScreen onMonthChange: ', dateString);
  // }, []);

  const renderItem = useCallback(({ item }: any) => {
    return <AgendaItem item={item} />;
  }, []);

  // const addSchedule = (day: string, hour: string, name: string) => {
  //   items.forEach((item, index) => {
  //     if (day === item.title) {
  //       item.data.push({hour: hour, duration: "", title: name});
  //       setItems(items);
  //       return;
  //     }
  //   })
  //   items.push({title: day, data: [{hour: hour, duration: "", title: name}]});
  //   setItems(items);
  // }

  useEffect(() => {

  }, [items])

  return (
    <View style={styles.container}>
      <CalendarProvider
        // date={items[1]?.title}
        date={today}
        // onDateChanged={onDateChanged}
        // onMonthChange={onMonthChange}
        showTodayButton
        // disabledOpacity={0.6}
        theme={todayBtnTheme.current}
      // todayBottomMargin={16}
      >
        {weekView ? (
          <WeekCalendar testID={testIDs.weekCalendar.CONTAINER} firstDay={1} markedDates={marked.current} />
        ) : (
          <ExpandableCalendar
            testID={testIDs.expandableCalendar.CONTAINER}
            // horizontal={false}
            // hideArrows
            // disablePan
            // hideKnob
            // initialPosition={ExpandableCalendar.positions.OPEN}
            // calendarStyle={styles.calendar}
            // headerStyle={styles.header} // for horizontal only
            // disableWeekScroll
            theme={theme.current}
            // disableAllTouchEventsForDisabledDays
            firstDay={1}
            markedDates={marked.current}
            leftArrowImageSource={leftArrowIcon}
            rightArrowImageSource={rightArrowIcon}
          // animateScroll
          // closeOnDayPress={false}
          />
        )}
        <AgendaList
          sections={items}
          renderItem={renderItem}
          // scrollToNextEvent
          sectionStyle={styles.section}
        // dayFormat={'yyyy-MM-d'}
        />
      </CalendarProvider>
      <FAB
        visible={true}
        onPress={() => { setDayMedicine(""); setHourMedicine(""); setNameMedicine(""); setModalVisible(true); }}
        placement="right"
        title="Add"
        icon={<Ionicons name="add" size={24} color="white" />}
        color={themeVariables.primaryColor}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Add schedule</Text>
            <View style={styles.content}>
              <Text>Day</Text>
              <TextInput
                editable
                maxLength={40}
                onChangeText={text => setDayMedicine(text)}
                value={dayMedicine}
                style={styles.input}
                placeholder="YYYY-MM-DD"
              />
              <Text>Name</Text>
              <TextInput
                editable
                maxLength={40}
                onChangeText={text => setNameMedicine(text)}
                value={nameMedicine}
                style={styles.input}
                placeholder="Medicine name"
              />
              <Text>Hour</Text>
              <TextInput
                editable
                maxLength={40}
                onChangeText={text => setHourMedicine(text)}
                value={hourMedicine}
                style={styles.input}
                placeholder="Hour"
              />
            </View>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => { setItems(items.concat({ title: dayMedicine, data: [{ hour: hourMedicine, duration: "", title: nameMedicine }] })); setModalVisible(!modalVisible); }}>
              <Text style={styles.textStyle}>Ok</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ExpandableCalendarScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendar: {
    paddingLeft: 20,
    paddingRight: 20
  },
  header: {
    backgroundColor: 'lightgrey'
  },
  section: {
    backgroundColor: lightThemeColor,
    color: 'grey',
    textTransform: 'capitalize'
  },
  centeredView: {
    flex: 1,
    width: "100%",
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: "80%",
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    width: 100,
    borderRadius: 20,
    padding: 10,
    margin: 5,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: "bold",
  },
  content: {
    width: "100%",
    alignSelf: "flex-start",
    padding: 20,
  },
  input: {
    backgroundColor: "transparent",
    borderBottomColor: "black",
    borderBottomWidth: 1,
    marginVertical: 15,
    fontSize: 12,
  },
});
