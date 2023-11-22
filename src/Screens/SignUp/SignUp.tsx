import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useState } from 'react';
import { RootScreens } from "..";
const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";
export interface SignUpProps {
    onNavigate: (screen: RootScreens) => void;
}
export const SignUp = (props: SignUpProps) => {
    const { onNavigate } = props;
    const [inputEmail, setInputEmail] = useState<string>("");
    const [inputPassword, setInputPassword] = useState<string>("");
    const [inputConfirm, setInputConfirm] = useState<string>("");
    const term: String = " điền khoản gì minhf them vo sau ";
    const policy: String = "chính sách bảo mật:....";
    const onSignUpSuccess = () => {
        onNavigate(RootScreens.LOGIN);
    };
    const handleSignUp = async (inputEmail: string, inputPassword: string, onSignUpSuccess: () => void): Promise<void> => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, inputEmail, inputPassword);
            const user = userCredential.user;
            console.log('Registered with:', user?.email);
            onSignUpSuccess();
        } catch (error: any) {
            if (error.message === "Firebase: Error (auth/email-already-in-use).") {
                alert("Email has been used.");
            }
        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.logo_container}>
                <Image source={require('./iamges/Logo_red.png')} />
            </View>
            <View style={styles.title_container}>
                <Text style={{ fontSize: 28, fontWeight: 'bold' }}>Registration</Text>
            </View>
            <View style={styles.form_container}>
                <View style={{ rowGap: 10 }}>
                    <TextInput placeholder='Your Email' style={styles.input} value={inputEmail} onChangeText={newText => setInputEmail(newText)}></TextInput>
                    <TextInput placeholder='Password' style={styles.input} value={inputPassword} onChangeText={newText => setInputPassword(newText)} secureTextEntry></TextInput>
                    <TextInput placeholder='Confirm your password again' style={styles.input} value={inputConfirm} onChangeText={newText => setInputConfirm(newText)} secureTextEntry></TextInput>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontSize: 16, fontWeight: '500', }}>
                        Read the
                    </Text>
                    <TouchableOpacity onPress={() => alert(`${term}`)}><Text style={{ fontSize: 16, fontWeight: '500', textDecorationLine: 'underline' }}>Terms </Text></TouchableOpacity>
                    <Text style={{ fontSize: 16, fontWeight: '500', }}>and </Text>
                    <TouchableOpacity onPress={() => alert(`${policy}`)}><Text style={{ fontSize: 16, fontWeight: '500', textDecorationLine: 'underline' }}>Privacy policy</Text></TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.btn} onPress={() => handleSignUp(inputEmail, inputPassword, onSignUpSuccess)}>
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>Continue</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.other_option}>
                <TouchableOpacity style={styles.btn_option} onPress={() => alert('updating..')}>
                    <View style={styles.icon_container}>
                        <Image source={require('./iamges/Apple_icon.png')} style={styles.icon} />
                    </View>

                    <Text style={{ fontWeight: 'bold' }}>Sign up with Apple ID</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn_option} onPress={() => alert('updating..')}>
                    <View style={styles.icon_container}>
                        <Image source={require('./iamges/Google_icon.jpg')} style={styles.icon} />
                    </View>

                    <Text style={{ fontWeight: 'bold' }}>Sign up with Google</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn_option} onPress={() => alert('updating..')}>
                    <View style={styles.icon_container}>
                        <Image source={require('./iamges/Facebook_icon.png')} style={styles.icon} />
                    </View>
                    <Text style={{ fontWeight: 'bold' }}>Sign up with Facebook</Text>
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
            height: 60,
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