import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { MainScreens } from "..";
const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;
import { useState } from "react"


export interface HistoryProps {
    onNavigate: (screen: MainScreens) => void;
}

export function UsedContainer({ name, hour, minute, date, month, year }: { name: string, hour: number, minute: number, date: number, month: number, year: number }) {

    return (
        <View style={{ height: 120, width: width - 40, borderRadius: 20, flexDirection: 'row', position: 'relative', marginTop: 10, backgroundColor: 'white', borderWidth: 2, borderColor: 'grey' }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require('./image/glucosamine.jpg')} style={{ height: 100, width: 100 }} />
            </View>
            <View style={{ flex: 2, justifyContent: 'center', marginLeft: 20 }}>
                <Text style={{ fontSize: 16, fontWeight: '600' }}>{name}</Text>
                <Text style={{ fontSize: 14, fontWeight: '400', color: 'grey' }}>{date}/{month}/{year}</Text>
                <Text style={{ fontSize: 14, fontWeight: '400', color: 'grey' }}>{hour}:{minute}</Text>
            </View>
            <View style={{ position: 'absolute', top: 10, right: 10 }}>
                <Image source={require('./image/option.png')} />
            </View>
        </View>
    )
}
export const History = (props: HistoryProps) => {
    const { onNavigate } = props;
    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 16, fontWeight: '600' }}>Drug used history</Text>
            <View style={{ height: 70, width: width - 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ flex: 4, }}>
                    <TextInput style={{ borderWidth: 1, height: 60, borderRadius: 10, paddingLeft: 45 }} placeholder='Search date or name of medicine' />
                    <TouchableOpacity style={{ position: 'absolute', zIndex: 100, height: 55, width: 55, left: 0, justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={require('../Home/iamges/find.png')} style={{ height: 40, width: 40, borderRadius: 40 }} />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity style={{ backgroundColor: '#407CE2C4', justifyContent: 'center', alignItems: 'center', height: 60, width: '80%', borderRadius: 10 }}>
                        <Image source={require('./image/bigOption.png')} style={{ height: 40, width: 40 }} />
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <UsedContainer name='Glucosamine' hour={8} minute={30} date={15} month={10} year={2023} />
                <UsedContainer name='Glucosamine' hour={8} minute={30} date={15} month={10} year={2023} />
                <UsedContainer name='Glucosamine' hour={8} minute={30} date={15} month={10} year={2023} />
                <UsedContainer name='Glucosamine' hour={8} minute={30} date={15} month={10} year={2023} />
                <UsedContainer name='Glucosamine' hour={8} minute={30} date={15} month={10} year={2023} />
                <UsedContainer name='Glucosamine' hour={8} minute={30} date={15} month={10} year={2023} />
                <UsedContainer name='Glucosamine' hour={8} minute={30} date={15} month={10} year={2023} />
            </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            alignItems: 'center',
            paddingTop: height / 15,
            backgroundColor: 'white',
        }
    }
)