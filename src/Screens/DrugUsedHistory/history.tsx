import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { MainScreens } from "..";
const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;
import { useEffect, useState } from "react"
import { useIsFocused } from '@react-navigation/native'
import { set } from 'lodash';

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
    const isFocused = useIsFocused();
    const [history, setHistory] = useState<History[]>([]);
    const apiBE = "https://medifind-be.proudsea-d3f4859a.eastasia.azurecontainerapps.io/api/v1/historyMedicine/"
    const userID = "65c25e4d4a7017b0efb30dc9"
    async function loadHistory() {
        try {
            const response = await fetch(apiBE + userID, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            const data = await response.json();
            const arr = data.data.history;
            const sortedList = [...arr].sort((a, b) => {
                if (a.year !== b.year) return a.year - b.year;
                else if (a.year === b.year && a.month !== b.month) return a.month - b.month;
                else return a.date - b.date;
            });
            setHistory(sortedList);
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        loadHistory();
    }, [])
    useEffect(() => {
        loadHistory();
    }, [isFocused])
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