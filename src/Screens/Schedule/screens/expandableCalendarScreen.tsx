import React, { useState, useRef, useCallback, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Dimensions, TouchableOpacity, TouchableWithoutFeedback, Image, } from 'react-native';
import moment from 'moment';
import Swiper from 'react-native-swiper';
import { ScrollView } from 'native-base';
interface Props {
  weekView?: boolean;
}
const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;
interface MyTask {
  name: string,
  amount: string,
  note: string,
  state: string,
}
export function MorningTask({ list, handleDelete }: { list: MyTask[], handleDelete: (params: { id: number; time: string }) => void }) {
  return (
    <ScrollView style={{ marginBottom: 170, marginTop: 10 }} >
      {
        list.map((el, index) => {
          return (
            <View style={styles.taskContainer} key={index}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{el.name}</Text>
                <Text style={{ color: '#A1A8B0' }} >{el.amount}</Text>
              </View>
              <Text>Note: {el.note}</Text>
              <View style={styles.btn_container}>
                <TouchableOpacity style={styles.btn_cancel}>
                  <Text style={{ fontWeight: 'bold', color: '#A1A8B0' }}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn_done} onPress={() => handleDelete({ id: index, time: "morning" })}>
                  <Text style={{ fontWeight: 'bold', color: 'white' }}>Done</Text>
                </TouchableOpacity>
              </View>
            </View>
          )
        })
      }
    </ScrollView>
  )
}

export function AfternoonTask({ list, handleDelete }: { list: MyTask[], handleDelete: (params: { id: number; time: string }) => void }) {
  return (
    <ScrollView style={{ marginBottom: 170, marginTop: 10 }}>
      {
        list.map((el, index) => {
          return (
            <View style={styles.taskContainer} key={index}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{el.name}</Text>
                <Text style={{ color: '#A1A8B0' }} >{el.amount}</Text>
              </View>
              <Text>Note: {el.note}</Text>
              <View style={styles.btn_container}>
                <TouchableOpacity style={styles.btn_cancel}>
                  <Text style={{ fontWeight: 'bold', color: '#A1A8B0' }}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn_done} onPress={() => handleDelete({ id: index, time: "noon" })}>
                  <Text style={{ fontWeight: 'bold', color: 'white' }}>Done</Text>
                </TouchableOpacity>
              </View>
            </View>
          )
        })
      }
    </ScrollView>
  )
}

export function EveningTask({ list, handleDelete }: { list: MyTask[], handleDelete: (params: { id: number; time: string }) => void }) {
  return (
    <ScrollView style={{ marginBottom: 170, marginTop: 10 }} >
      {
        list.map((el, index) => {
          return (
            <View style={styles.taskContainer} key={index} >
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{el.name}</Text>
                <Text style={{ color: '#A1A8B0' }} >{el.amount}</Text>
              </View>
              <Text>Note: {el.note}</Text>
              <View style={styles.btn_container}>
                <TouchableOpacity style={styles.btn_cancel}>
                  <Text style={{ fontWeight: 'bold', color: '#A1A8B0' }}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn_done} onPress={() => handleDelete({ id: index, time: "evening" })}>
                  <Text style={{ fontWeight: 'bold', color: 'white' }}>Done</Text>
                </TouchableOpacity>
              </View>
            </View>
          )
        })
      }
    </ScrollView>
  )
}

const ExpandableCalendarScreen = (props: Props) => {
  const swiper = useRef();
  const [value, setValue] = useState(new Date());
  const [week, setWeek] = useState(0);
  /// manage date time
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
  const [add, setAdd] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [mode, setMode] = useState<string>("morning");
  const [pickMode, setPickMode] = useState<string>("morning");
  const [listTaskMorning, setListTaskMorning] = useState<MyTask[]>([
    {
      name: "Paracetamol",
      amount: "1 package",
      state: "done",
      note: "no"
    },
    {
      name: "Acetaphen",
      amount: "2 packages",
      state: "done",
      note: "Do not use when hungry"
    },
    {
      name: "Aspirin",
      amount: "3 packages",
      state: "cancel",
      note: "Take it after having breakfast"
    }
  ]);
  const [listTaskNoon, setListTaskNoon] = useState<MyTask[]>([
    {
      name: "Barisvidi",
      amount: "1 package",
      state: "done",
      note: "no"
    },
    {
      name: "Becobrol",
      amount: "2 packages",
      state: "notYet",
      note: "Do not use when hungry"
    },
    {
      name: "Berberin",
      amount: "3 packages",
      state: "cancel",
      note: "If you feel headache please cancel it."
    }
  ]);
  const [listTaskEvening, setListTaskEvening] = useState<MyTask[]>([
    {
      name: "Cadisalic",
      amount: "1 package",
      state: "done",
      note: "Take it before dinner"
    }
  ]);
  /*
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseMorning = await fetch('127.0.0.1:3000/api/v1/reminder/morning');
        const dataMorning = await responseMorning.json();
        setListTaskMorning(dataMorning.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    }
    fetchData();
  })
  */
  async function handleAddTask({ name, description, amount, pickMode }: { name: string, description: string, amount: string, pickMode: string }) {
    const newTask = { name: `${name}`, note: `${description}`, amount: `${amount}`, state: "notYet" };
    if (pickMode === "morning") {
      setListTaskMorning([...listTaskMorning, newTask]);
    }
    else if (pickMode === "noon") {
      setListTaskNoon([...listTaskNoon, newTask]);
    }
    else if (pickMode === "evening") {
      setListTaskEvening([...listTaskEvening, newTask]);
    }
    setAmount(""); setDescription(""); setPickMode("morning"); setName("");
    setAdd(false);

  }
  function handleDeleteTask({ id, time }: { id: number, time: string }) {
    if (time === 'morning') {
      setListTaskMorning([...listTaskMorning.filter((el, index) => index != id)])
    }
    else if (time === 'noon') {
      setListTaskNoon([...listTaskNoon.filter((el, index) => index != id)])
    }
    else if (time === 'evening') {
      setListTaskEvening([...listTaskEvening.filter((el, index) => index != id)])
    }
  }
  return (
    <View style={styles.container}>
      <View style={{ justifyContent: "space-between", width: width - 20, flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ fontWeight: 'bold', fontSize: 24, paddingLeft: 20 }}>Schedule</Text>
        <TouchableOpacity onPress={() => setAdd(!add)}>
          <Image source={add ? require('../img/icon_subtract.png') : require('../img/icon_add.png')} />
        </TouchableOpacity>
      </View>
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
                          backgroundColor: '#407CE2',
                          borderColor: '#111',
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
      {add ? (
        <View style={styles.addContainer}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Add reminder</Text>
          <Text style={{ marginTop: 10 }}>Name of Drug:</Text>
          <TextInput
            placeholder="Enter drug name"
            value={name}
            onChangeText={setName}
            style={{ borderBottomWidth: 1, width: width * 80 / 100 }}
          />
          <Text style={{ marginTop: 10 }}>Description:</Text>
          <TextInput
            placeholder="Enter description"
            value={description}
            onChangeText={setDescription}
            style={{ borderBottomWidth: 1, width: width * 80 / 100 }}
          />
          <Text style={{ marginTop: 10 }}>Amount:</Text>
          <TextInput
            placeholder="Enter amount"
            value={amount}
            onChangeText={setAmount}
            style={{ borderBottomWidth: 1, width: width * 80 / 100 }}
          />
          <Text style={{ marginTop: 10 }}>Time:</Text>
          <View style={styles.pickModeContainer}>
            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: pickMode == "morning" ? "#407CE2" : "#bde0fe", width: (width / 29) * 8 - 10, borderRadius: 10 }} onPress={() => setPickMode("morning")}>
              <Text style={{ color: pickMode == "morning" ? "white" : "black" }}>Morning</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: pickMode == "noon" ? "#407CE2" : "#bde0fe", width: (width / 29) * 8 - 10, borderRadius: 10 }} onPress={() => setPickMode("noon")}>
              <Text style={{ color: pickMode == "afternoon" ? "white" : "black" }}>Noon</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: pickMode == "evening" ? "#407CE2" : "#bde0fe", width: (width / 29) * 8 - 10, borderRadius: 10 }} onPress={() => setPickMode("evening")}>
              <Text style={{ color: pickMode == "evening" ? "white" : "black" }}>Evening</Text>
            </TouchableOpacity>
          </View>
          <View style={{ alignItems: 'center', width: width * 80 / 100, marginTop: 20 }}>
            <TouchableOpacity style={{ backgroundColor: '#edf2f4', width: "35%", height: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 30, borderWidth: 2, borderColor: '#ade8f4' }} onPress={() => handleAddTask({ name, description, amount, pickMode })}>
              <Text>Add</Text>
            </TouchableOpacity>
          </View>
        </View>


      ) : (
        <View>
          <View style={styles.modeContainer}>
            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: mode == "morning" ? "#407CE2" : "#bde0fe", width: width / 3 - 10, borderRadius: 10 }} onPress={() => setMode("morning")}>
              <Text style={{ color: mode == "morning" ? "white" : "black" }}>Morning</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: mode == "afternoon" ? "#407CE2" : "#bde0fe", width: width / 3 - 10, borderRadius: 10 }} onPress={() => setMode("afternoon")}>
              <Text style={{ color: mode == "afternoon" ? "white" : "black" }}>Noon</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: mode == "everning" ? "#407CE2" : "#bde0fe", width: width / 3 - 10, borderRadius: 10 }} onPress={() => setMode("everning")}>
              <Text style={{ color: mode == "evening" ? "white" : "black" }}>Evening</Text>
            </TouchableOpacity>
          </View>
          {mode == 'morning' ? (
            <MorningTask list={listTaskMorning} handleDelete={handleDeleteTask} />
          ) : mode == 'afternoon' ? (
            <AfternoonTask list={listTaskNoon} handleDelete={handleDeleteTask} />
          ) : (
            <EveningTask list={listTaskEvening} handleDelete={handleDeleteTask} />
          )}
        </View>
      )}
    </View>
  )
}
export default ExpandableCalendarScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: height / 15,
    alignItems: 'center',
    rowGap: 20
  },
  modeContainer: {
    flexDirection: 'row',
    width: width - 30,
    justifyContent: 'space-between',
    backgroundColor: '#bde0fe',
    height: 60,
    borderRadius: 10
  },
  taskContainer: {
    borderWidth: 2,
    marginTop: 5,
    marginBottom: 5,
    width: width - 30,
    borderRadius: 10,
    padding: 10,
    rowGap: 10,
    borderColor: "#edede9"
  },
  btn_container: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  btn_cancel: {
    backgroundColor: "#bde0fe",
    width: width / 3,
    height: 48,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btn_done: {
    backgroundColor: "#407CE2",
    width: width / 3,
    height: 48,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
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
    borderRadius: 8,
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
  addContainer: {
    justifyContent: 'flex-start',
    alignItems: "flex-start",
    width: width * 80 / 100,
  },
  pickModeContainer: {
    flexDirection: 'row',
    width: width * 80 / 100,
    justifyContent: 'space-between',
    backgroundColor: '#bde0fe',
    height: 60,
    borderRadius: 10
  },
})

/*import React, { useState, useRef, useCallback, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Dimensions, TouchableOpacity, TouchableWithoutFeedback, } from 'react-native';
import moment from 'moment';
import Swiper from 'react-native-swiper';
import { ScrollView } from 'native-base';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

interface Props {
  weekView?: boolean;
}
interface MyTask {
  category: string;
  description: string;
  time: string
  duration: string;
  id: number;
}
export function Task({ category, description, duration, time, id, ondelete }: { category: string, description: string, duration: string, time: string, id: number, ondelete: () => void }) {
  return (
    <View style={{ height: 130, backgroundColor: 'white', borderRadius: 15, justifyContent: 'center', paddingLeft: 20, rowGap: 5, marginTop: 15 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{category}</Text>
      <Text style={{ color: '#737373', fontWeight: 'bold', fontSize: 12 }}>{description}</Text>
      <View style={{ flexDirection: 'row', columnGap: 20, }}>
        <Text style={{ color: '#f9a620', fontWeight: 'bold' }}>{time}</Text>
        <Text style={{ color: '#f9a620', fontWeight: 'bold' }}>Duration:{duration} minutes</Text>
      </View>
      <TouchableOpacity style={{ position: 'absolute', top: 10, right: 10 }} onPress={ondelete}><Text style={{ color: '#737373' }}>delete</Text></TouchableOpacity>
    </View>
  )


}

const ExpandableCalendarScreen = (props: Props) => {
  const [isAddTask, setIsAddTask] = useState<boolean>(false);
  const swiper = useRef();
  const [value, setValue] = useState(new Date());
  const [week, setWeek] = useState(0);
  /// manage date time
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
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const currentHour = currentDate.getHours();
  const currentMinute = currentDate.getMinutes();
  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul',
    'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  /////


  /// add task
  async function handleAddTask() {
    if (time == "" || duration == "" || description == "" || category == "") {
      alert("please fill in all the information")
      return;
    }
    const newTask: MyTask = {
      time: time,
      category: category,
      duration: duration,
      description: description,
      id: arrayOfTask.length
    }
    await setArrayOfTask([...arrayOfTask, newTask]);
    setTime("");
    setCategory("");
    setDescription("");
    setDuration("");
    setIsAddTask(false);
  }
  const [arrayOfTask, setArrayOfTask] = useState<MyTask[]>([]);
  function handelDelete(id: number) {
    const newArr: MyTask[] = arrayOfTask.filter(task => (task.id != id));
    setArrayOfTask(newArr);
  }
  /////
  /// manage input
  const [time, setTime] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  ///

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{ flex: 2, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', paddingLeft: 20, paddingRight: 30, }} >
          <Text style={{ fontSize: 22, fontWeight: 'bold', }}>{monthNames[currentMonth]},{currentYear}</Text>
          <TouchableOpacity style={{ backgroundColor: '#407CE2', height: 50, width: 120, justifyContent: 'center', alignItems: 'center', borderRadius: 10, }} onPress={() => { setIsAddTask(!isAddTask) }}>
            <Text style={{ color: 'white' }}>{isAddTask ? "exit" : "+add task"}</Text>
          </TouchableOpacity>
        </View>

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
                            backgroundColor: '#407CE2',
                            borderColor: '#111',
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
        <View style={{ flex: 1, justifyContent: 'flex-start', flexDirection: 'row', }}>
          <Text style={{ paddingLeft: 20, fontWeight: '500', color: '#737373' }}>Hello Mr X now is</Text>
          <Text style={{ paddingLeft: 16, fontWeight: 'bold', }}> {currentHour}:{currentMinute}</Text>
        </View>
      </View>
      {isAddTask ? <View style={styles.content} >
        <View style={{ flexDirection: 'row', columnGap: 50, paddingLeft: 30, borderBottomColor: 'grey', borderBottomWidth: 2 }}>
          <View>
            <Text style={{ fontSize: 12, fontWeight: '500' }}>Start time</Text>
            <TextInput style={{ height: 40, fontSize: 18, fontWeight: '500' }} placeholder='8:15' value={time} onChangeText={newText => setTime(newText)}></TextInput>
          </View>
          <View>
            <Text style={{ fontSize: 12, fontWeight: '500' }}>Duration</Text>
            <TextInput style={{ height: 40, fontSize: 18, fontWeight: '500' }} placeholder='30 (minute)' value={duration} onChangeText={newText => setDuration(newText)}></TextInput>
          </View>
        </View>
        <View style={{ columnGap: 50, paddingLeft: 30, borderBottomColor: 'grey', borderBottomWidth: 2 }}>
          <Text style={{ fontSize: 12, fontWeight: '500' }}>Discription</Text>
          <TextInput style={{ height: 40, fontSize: 18, fontWeight: '500' }} placeholder='Go to the hospital and meet doctor..' value={description} onChangeText={newText => setDescription(newText)}></TextInput>
        </View>
        <View style={{ rowGap: 20 }}>
          <Text style={{ fontSize: 12, fontWeight: '500', paddingLeft: 30, }}>Category</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingLeft: width / 8, paddingRight: width / 8 }}>
            <TouchableOpacity style={{ backgroundColor: '#e5e6e4', height: 45, width: 120, justifyContent: 'center', alignItems: 'center', borderRadius: 10 }} onPress={() => setCategory('Meeting')}><Text>Meeting</Text></TouchableOpacity>
            <TouchableOpacity style={{ backgroundColor: '#e5e6e4', height: 45, width: 120, justifyContent: 'center', alignItems: 'center', borderRadius: 10 }} onPress={() => setCategory('Meditation')}><Text>Meditation</Text></TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={{ width: width - 50, height: 60, justifyContent: 'center', alignItems: 'center', backgroundColor: '#407CE2', marginTop: 30, alignSelf: 'center', borderRadius: 20 }} onPress={handleAddTask}><Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold' }} >Create Task</Text></TouchableOpacity>
      </View> :

        <View style={styles.content} >
          <Text style={{ fontSize: 22, fontWeight: '500', paddingLeft: 30 }}>{arrayOfTask.length == 0 ? "You done all the task" : `Task: ${arrayOfTask.length}`}</Text>
          <ScrollView style={{}}>
            {arrayOfTask.map((task) => (<Task time={task.time} description={task.description} category={task.category} duration={task.duration} id={task.id} ondelete={() => handelDelete(task.id)} />))}
          </ScrollView>
        </View >}

    </View >
  );
};

export default ExpandableCalendarScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
    marginBottom: 0,
    backgroundColor: '#f4f4f8',
    width: width,
    rowGap: 20
  },
  header: {
    flex: 2,
    backgroundColor: 'white',
    width: width - 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,

  },
  content: {
    flex: 4,
    width: width - 20,
  },
  picker: {
    flex: 2,
    maxHeight: 150,
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
    borderRadius: 8,
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
});
*/
