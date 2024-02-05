import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { MainScreens } from "..";
const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;
import { useEffect, useState } from "react"


export interface HistoryProps {
    onNavigate: (screen: MainScreens) => void;
}
interface History {
    name: string,
    date: number,
    month: number,
    year: number,
}
export function History_tag({ infor }: { infor: History }) {
    return (
        <View style={styles.tag_container}>
            <Text>
                {infor.name}
            </Text>
            <Text>
                {infor.date}/{infor.month}/{infor.year}
            </Text>
        </View>
    )
}


export const History = (props: HistoryProps) => {
    const { onNavigate } = props;
    const [history, setHistory] = useState<History[]>([]);
    useEffect(() => {
        const historyArray: History[] = [
            {
                name: 'Ibuprofen',
                date: 15,
                month: 7,
                year: 2023,
            },
            {
                name: 'Paracetamol',
                date: 1,
                month: 1,
                year: 2024,
            },
            {
                name: 'Aspirin',
                date: 1,
                month: 2,
                year: 2024,
            },
        ];
        setHistory(historyArray);
    }, [])
    return (
        <View style={styles.container}>
            <View style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                    History
                </Text>
                <Text style={{ fontWeight: '200', color: 'grey' }}>
                    The medicine you have recently used
                </Text>
            </View>
            <ScrollView>
                {
                    history.map((item, index) => {
                        return (
                            <History_tag infor={item} key={index} />
                        )
                    })
                }
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
        },
        tag_container: {
            width: width * 9 / 10,
            height: 50,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottomWidth: 1,
            borderBottomColor: 'grey',
            marginTop: 10
        },
    }

)