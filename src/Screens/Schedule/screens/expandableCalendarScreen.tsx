import React, { useState, useRef, useCallback, useEffect } from 'react';
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
