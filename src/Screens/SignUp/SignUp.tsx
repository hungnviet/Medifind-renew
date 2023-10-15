import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useState } from 'react';
import { RootScreens } from "..";
const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;


export interface SignUpProps {
    onNavigate: (screen: RootScreens) => void;
}
export const SignUp = (props: SignUpProps) => {
    const { onNavigate } = props;
    const [inputPhoneNumber, setInputPhoneNumber] = useState<string>("");
    const [inputPassword, setInputPassword] = useState<string>("");
    const [inputName, setInputName] = useState<string>("");
    const [inputGender, setInputGender] = useState<string>("");
    const [inputAge, setInputAge] = useState<string>("");
    const term: String = " điền khoản gì minhf them vo sau ";
    const policy: String = "chính sách bảo mật:....";
    return (
        <View style={styles.container}>
            <View style={styles.logo_container}>
                <Image source={require('./iamges/Logo_red.png')} />
            </View>
            <View style={styles.title_container}>
                <Text style={{ fontSize: 28, fontWeight: 'bold' }}>Registration</Text>
                <Text style={{ textAlign: 'center' }}>We strive to make a positive impact on the healthcare industry by creating innovative solutions that solve real-world problems.</Text>
            </View>
            <View style={styles.form_container}>
                <View style={{ rowGap: 10 }}>
                    <TextInput placeholder='Input your phone number' style={styles.input} value={inputPhoneNumber} onChangeText={newText => setInputPhoneNumber(newText)}></TextInput>
                    <TextInput placeholder='Set password' style={styles.input} value={inputPassword} onChangeText={newText => setInputPassword(newText)}></TextInput>
                    <TextInput placeholder='What is your name?' style={styles.input} value={inputName} onChangeText={newText => setInputName(newText)}></TextInput>
                    <TextInput placeholder='What is your gender (male/female)?' style={styles.input} value={inputGender} onChangeText={newText => setInputGender(newText)}></TextInput>
                    <TextInput placeholder='How old are you?' style={styles.input} value={inputAge} onChangeText={newText => setInputAge(newText)}></TextInput>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ color: '#B4BAC9', fontSize: 16 }}>
                        Read the
                    </Text>
                    <TouchableOpacity onPress={() => alert(`${term}`)}><Text style={{ fontSize: 16, fontWeight: '500', textDecorationLine: 'underline' }}>Term </Text></TouchableOpacity>
                    <Text style={{ color: '#B4BAC9', fontSize: 16 }}>and </Text>
                    <TouchableOpacity onPress={() => alert(`${policy}`)}><Text style={{ fontSize: 16, fontWeight: '500', textDecorationLine: 'underline' }}>Privacy policy</Text></TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.btn} onPress={() => onNavigate(RootScreens.LOGIN)}>
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>Continue</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.other_option}>
                <TouchableOpacity style={styles.btn_option} onPress={() => alert('updating..')}>
                    <View style={styles.icon_container}>
                        <Image source={require('./iamges/Apple_icon.png')} style={styles.icon} />
                    </View>

                    <Text style={{ fontWeight: 'bold' }}>Sign up with apple ID</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn_option} onPress={() => alert('updating..')}>
                    <View style={styles.icon_container}>
                        <Image source={require('./iamges/Google_icon.jpg')} style={styles.icon} />
                    </View>

                    <Text style={{ fontWeight: 'bold' }}>Sign up with google</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn_option} onPress={() => alert('updating..')}>
                    <View style={styles.icon_container}>
                        <Image source={require('./iamges/Facebook_icon.png')} style={styles.icon} />
                    </View>
                    <Text style={{ fontWeight: 'bold' }}>Sign up with facebook</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.footer}>
                <Text style={{ color: '#B4BAC9', fontSize: 16 }}>Already have an acount?</Text>
                <TouchableOpacity onPress={() => onNavigate(RootScreens.LOGIN)}>
                    <Text style={{ fontSize: 16, fontWeight: '500', textDecorationLine: 'underline' }}>Log in </Text>
                </TouchableOpacity>
            </View>
        </View >
    )
}


const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff'
        },
        logo_container: {
            width: width,
            flex: 2,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 30
        },
        title_container: {
            width: width,
            flex: 2,
            justifyContent: 'center',
            alignItems: 'center',
            paddingLeft: 20,
            paddingRight: 20,
            rowGap: 20
        },
        form_container: {
            marginTop: 10,
            width: width,
            flex: 6,
            justifyContent: 'center',
            alignItems: 'center',
            rowGap: 10,
        },
        other_option: {
            width: width - 40,
            flex: 4,
            justifyContent: 'center',
            alignItems: 'center',
            rowGap: 10,
            borderTopWidth: 2,
            borderColor: 'black'
        },
        footer: {
            width: width,
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            columnGap: 20
        },
        input: {
            borderColor: 'grey',
            borderWidth: 2,
            width: width - 50,
            height: 40,
            borderRadius: 20,
            paddingLeft: 20
        },
        btn: {
            backgroundColor: '#407CE2',
            width: width / 2,
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 20
        },
        btn_option: {
            backgroundColor: '#F1F3F5',
            width: width - 50,
            borderRadius: 40,
            height: 60,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            padding: 0
        },
        icon_container: {
            width: 50,
            height: 50,
            position: 'absolute',
            left: 20,
        },
        icon: {
            width: '100%',
            height: '100%',
            borderRadius: 20
        }
    }
)