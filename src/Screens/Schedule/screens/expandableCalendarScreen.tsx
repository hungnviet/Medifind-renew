import React, { useState, useRef, useCallback, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Dimensions, TouchableOpacity, TouchableWithoutFeedback, Image, } from 'react-native';
import moment from 'moment';
import Swiper from 'react-native-swiper';
import * as Progress from 'react-native-progress';
import { ScrollView } from 'native-base';
import Checkbox from 'expo-checkbox';
interface Props {
  weekView?: boolean;
}
const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;
interface Task { name: string, amount: string, hour: number, minute: number, state: boolean }
const ExpandableCalendarScreen = (props: Props) => {
  const swiper = useRef();
  const [value, setValue] = useState(new Date());
  const [week, setWeek] = useState(0);
  const [add, setAdd] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [amount, setAmount] = useState<string>("")
  /// manage date te
  const weeks = React.useMemo(() => {
    const start = moment().add(week, 'weeks').startOf('week');

    return [-1, 0, 1].map(adj => {
      return Array.from({ length: 7 }).map((_, index) => {
        const date = moment(start).add(adj, 'week').add(index, 'day');

        return {
          weekday: date.format('ddd'),
          date: date.toDate(),
        };
      });
    });
  }, [week]);
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  let curMonth = monthNames[new Date().getMonth()];
  curMonth = "<" + curMonth + ">"
  const [listTask, setListTask] = useState<Task[]>([
    { name: "Panadol Extra", amount: "1 pill", hour: 8, minute: 0, state: false },
    { name: "Panadol Extra", amount: "1 pill", hour: 8, minute: 30, state: false },
  ])
  let numOfTask = listTask.length;
  let numOfTaskDone = 0;
  listTask.map((el) => {
    el.state === true ? numOfTaskDone++ : numOfTaskDone = numOfTaskDone + 0;
  })
  const handleCheckboxChange = (index: number) => {
    setListTask(prevList => {
      const newList = [...prevList];
      newList[index].state = !newList[index].state;
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
  function handleAdd() {
    if (name === "" || time === "" || amount === "") {
      alert('please enter all the information');
    }
    else {
      const [hourString, minuteString] = time.split(":");
      const hour = parseInt(hourString, 10);
      const minute = parseInt(minuteString, 10);
      const newPill: Task = { name: name, amount: amount, hour: hour, minute: minute, state: false };
      const newList: Task[] = [...listTask, newPill];
      newList.sort((a, b) => {
        if (a.state !== b.state) {
          return a.state ? -1 : 1; // true comes before false
        } else if (a.hour !== b.hour) {
          return a.hour - b.hour; // sort by hour
        } else {
          return a.minute - b.minute; // sort by minute if hour is the same
        }
      });
      setName("");
      setAmount("");
      setTime("");
      setListTask(newList);
      setAdd(false);

    }
  }
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Reminder</Text>
      <Text>{curMonth}</Text>
      <View style={styles.picker}>
        <Swiper
          index={1}
          //  ref={swiper}
          loop={false}
          showsPagination={false}
          onIndexChanged={ind => {
            if (ind === 1) {
              return;
            }
            setTimeout(() => {
              const newIndex = ind - 1;
              const newWeek = week + newIndex;
              setWeek(newWeek);
              setValue(moment(value).add(newIndex, 'week').toDate());
              //swiper.current.scrollTo(1, false);
            }, 100);
          }}>
          {weeks.map((dates, index) => (
            <View
              style={[styles.itemRow, { paddingHorizontal: 16 }]}
              key={index}>
              {dates.map((item, dateIndex) => {
                const isActive =
                  value.toDateString() === item.date.toDateString();
                return (
                  <TouchableWithoutFeedback
                    key={dateIndex}
                    onPress={() => setValue(item.date)}>
                    <View
                      style={[
                        styles.item,
                        isActive && {
                          backgroundColor: '#407BFF',
                          borderColor: '#407BFF',
                        },
                      ]}>
                      <Text
                        style={[
                          styles.itemWeekday,
                          isActive && { color: '#fff' },
                        ]}>
                        {item.weekday}
                      </Text>
                      <Text
                        style={[
                          styles.itemDate,
                          isActive && { color: '#fff' },
                        ]}>
                        {item.date.getDate()}
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                );
              })}
            </View>
          ))}
        </Swiper>
      </View>
      <View>
        <Progress.Bar progress={numOfTaskDone / numOfTask} width={width * 90 / 100} />
      </View>
      <View style={{ justifyContent: 'center', alignItems: "flex-start", width: width * 90 / 100, borderBottomWidth: 1 }}>
        <Text style={{ color: "#407BFF" }}>{numOfTaskDone}/{numOfTask} pills take</Text>
      </View>
      <View style={{ height: height / 2 - 50 }}>
        <Text style={{ justifyContent: 'center', alignItems: "flex-start", width: width * 90 / 100, fontWeight: 'bold', fontSize: 16 }}>Medicines for today</Text>
        <ScrollView>
          {
            listTask.map((el, index) => {
              return (<View style={[styles.taskContainer, { backgroundColor: el.state ? "#E0E0E0" : "#FFFFFF" }]} key={index}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', columnGap: 10 }}>
                  <Image source={el.state ? require('../img/pillTrue.png') : require('../img/pillFalse.png')} style={{ height: 40, width: 40 }} />
                  <View>
                    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{el.name}</Text>
                    <Text style={{ color: '#A1A8B0' }}>{el.amount}</Text>
                  </View>
                </View>
                <Text style={{ color: '#407BFF', fontSize: 16, position: 'absolute', left: width * 2 / 3 - 10 }}  >{el.hour}:{el.minute}</Text>
                <Checkbox style={{ height: 30, width: 30 }} value={el.state} onValueChange={() => handleCheckboxChange(index)} />
              </View>)

            })
          }

        </ScrollView>
      </View>
      {add === false ? <View style={styles.btnAdd}>
        <TouchableOpacity onPress={() => setAdd(!add)}>
          <Image source={require('../img/icon_add.png')} style={{ width: 60, height: 60 }} />
        </TouchableOpacity>
      </View> : <View></View>}

      {
        add &&
        <View style={styles.overflow}>
          <View style={styles.addContainer}>
            <View style={styles.btnOff}>
              <TouchableOpacity onPress={() => setAdd(!add)}>
                <Image source={add ? require('../img/icon_subtract.png') : require('../img/icon_add.png')} style={{ width: 40, height: 40 }} />
              </TouchableOpacity>
            </View>
            <Text>Add pill</Text>
            <TextInput style={styles.inputDrugName} placeholder='Enter drug name' value={name} onChangeText={setName}></TextInput>
            <View style={{ flexDirection: 'row', columnGap: width / 10 }}>
              <TextInput style={styles.inputTime} placeholder='Enter time' value={time} onChangeText={setTime}></TextInput>
              <TextInput style={styles.inputAmount} placeholder='Enter ammount' value={amount} onChangeText={setAmount}></TextInput>
            </View>
            <TouchableOpacity style={styles.btn}><Text style={{ color: 'white', fontWeight: 'bold' }} onPress={handleAdd}>Add</Text></TouchableOpacity>
          </View>
        </View>
      }

    </View>
  )
}
export default ExpandableCalendarScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: height / 15,
    alignItems: 'center',
    rowGap: 10,
    backgroundColor: "#f8f9fa",
    width: width,
  },
  picker: {
    maxHeight: 90,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemRow: {
    width: width,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginHorizontal: -4,
  },
  item: {
    flex: 1,
    height: 60,
    marginHorizontal: 4,
    paddingVertical: 6,
    paddingHorizontal: 4,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#e3e3e3',
    flexDirection: 'column',
    alignItems: 'center',
  },
  itemWeekday: {
    fontSize: 13,
    fontWeight: '500',
    color: '#737373',
    marginBottom: 4,
  },
  itemDate: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111',
  },
  taskContainer: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 20, height: 80, borderRadius: 4, paddingLeft: 10, paddingRight: 10
  },
  btnAdd: {
    position: 'absolute',
    bottom: 20,
    right: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    zIndex: 100000
  },
  overflow: {
    height: height,
    width: width,
    //  backgroundColor: '#e9ecef',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },

  addContainer: {
    height: height / 4,
    width: width * 90 / 100,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    alignItems: 'center',
    rowGap: 10
  },
  inputDrugName: {
    width: width * 80 / 100,
    height: 60,
    backgroundColor: '#F5F5F5',
    paddingLeft: 10,
    borderRadius: 10
  },
  inputAmount: {
    width: width * 40 / 100,
    height: 60,
    backgroundColor: '#F5F5F5',
    paddingLeft: 10,
    borderRadius: 10
  },
  inputTime: {
    width: width * 30 / 100,
    height: 60,
    backgroundColor: '#F5F5F5',
    paddingLeft: 10,
    borderRadius: 10
  },
  btn: {
    backgroundColor: '#407BFF',
    width: 80,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnOff: {
    position: 'absolute',
    height: 30,
    width: 30,
    top: -20,
    right: -10,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100000,
  },
})

