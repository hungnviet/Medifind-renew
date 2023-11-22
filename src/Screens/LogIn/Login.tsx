import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, TextInput } from 'react-native';
import { RootScreens } from "..";
const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;
import { useState } from "react"
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from "firebase/auth";

export interface LogInProps {
    onNavigate: (screen: RootScreens) => void;
}

export const Login = (props: LogInProps) => {
    const { onNavigate } = props;
    const [inputPhoneNumber, setInputPhoneNumber] = useState<string>("")
    const [inputPassWord, setInputPassWord] = useState<string>("")
    const onLogInSuccess = () => {
        onNavigate(RootScreens.MAIN);
    };
    const handleLogIn = async (inputEmail: string, inputPassword: string, onLogInSuccess: () => void): Promise<void> => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, inputEmail, inputPassword);
            const user = userCredential.user;
            console.log('Registered with:', user?.email);
            onLogInSuccess();
        } catch (error: any) {
            console.log(error.message);
            if (error.message === "Firebase: Error (auth/missing-password).") {
                alert("Please input the password!")
            }
            else {
                alert("Email or password is incorrect. Please try again.")
            }
        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.logo_container}>
                <Image source={require('./iamges/Logo_red.png')} />
            </View>
            <View style={styles.title_container}>
                <Text style={{ fontSize: 28, fontWeight: 'bold' }}>Log in</Text>
                <Text style={{ textAlign: 'center' }}>For Log in, please enter your phone number and password</Text>
            </View>
            <View style={styles.form_container}>
                <TextInput placeholder='Your phone number' style={styles.input} value={inputPhoneNumber} onChangeText={newText => setInputPhoneNumber(newText)}></TextInput>
                <TextInput placeholder='Your password' style={styles.input} value={inputPassWord} onChangeText={newText => setInputPassWord(newText)} secureTextEntry></TextInput>
                <TouchableOpacity style={styles.btn} onPress={() => handleLogIn(inputPhoneNumber, inputPassWord, onLogInSuccess)}>
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>Log in</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.other_option}>
                <TouchableOpacity style={styles.btn_option} onPress={() => onNavigate(RootScreens.MAIN)}>
                    <View style={styles.icon_container}>
                        <Image source={require('./iamges/avatar.jpg')} style={styles.icon} />
                    </View>

                    <Text style={{ fontWeight: 'bold' }}>Log in as a guest</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn_option} onPress={() => alert('updating..')}>
                    <View style={styles.icon_container}>
                        <Image source={require('./iamges/Google_icon.jpg')} style={styles.icon} />
                    </View>

                    <Text style={{ fontWeight: 'bold' }}>Login with Google</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn_option} onPress={() => alert('updating..',)}>
                    <View style={styles.icon_container}>
                        <Image source={require('./iamges/Facebook_icon.png')} style={styles.icon} />
                    </View>
                    <Text style={{ fontWeight: 'bold' }}>Login with Facebook</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.footer}>
                <Text style={{ color: '#B4BAC9', fontSize: 16 }}>Don't have an acount?</Text>
                <TouchableOpacity onPress={() => onNavigate(RootScreens.SIGNUP)}>
                    <Text style={{ fontSize: 16, fontWeight: '500', textDecorationLine: 'underline' }}>Sign up</Text>
                </TouchableOpacity>
            </View>
        </View>
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
            flex: 4,
            justifyContent: 'center',
            alignItems: 'center',
            paddingLeft: 20,
            paddingRight: 20,
            rowGap: 20
        },
        form_container: {
            width: width,
            flex: 5,
            justifyContent: 'center',
            alignItems: 'center',
            rowGap: 20
        },
        other_option: {
            width: width - 40,
            flex: 5,
            justifyContent: 'center',
            alignItems: 'center',
            rowGap: 10,
            borderTopWidth: 2,
            borderColor: 'black'



        },
        footer: {
            width: width,
            flex: 2,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            columnGap: 20
        },
        input: {
            borderColor: 'grey',
            borderWidth: 2,
            width: width - 50,
            height: 50,
            borderRadius: 20,
            paddingLeft: 10
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