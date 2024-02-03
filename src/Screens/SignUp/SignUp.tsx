import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useState } from 'react';
import { RootScreens } from "..";
const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { set } from 'lodash';
export interface SignUpProps {
    onNavigate: (screen: RootScreens) => void;
}
export const SignUp = (props: SignUpProps) => {
    const { onNavigate } = props;
    const [focusName, setFocusName] = useState(false)
    const [focusEmail, setFocusEmail] = useState(false)
    const [focusPassword, setFocusPassword] = useState(false)
    const [focusConfirmPassword, setFocusConfirmPassword] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [sercuePassword, setSercuePassword] = useState(true)
    const [sercueConfirmPassword, setSercueConfirmPassword] = useState(true)
    function onFocusName() {
        setFocusName(true)
    }
    function onFocusEmail() {
        setFocusEmail(true)
    }
    function onFocusPassword() {
        setFocusPassword(true)
    }
    function onFocusConfirmPassword() {
        setFocusConfirmPassword(true)
    }
    function onBlurName() {
        setFocusName(false)
    }
    function onBlurEmail() {
        setFocusEmail(false)
    }
    function onBlurPassword() {
        setFocusPassword(false)
    }
    function onBlurConfirmPassword() {
        setFocusConfirmPassword(false)
    }
    return (
        <View style={styles.container}>
            <View style={styles.logo_container}>
                <Image style={styles.logo} source={require('./iamges/Logo_red.png')} />
            </View>
            <View style={styles.title_container}>
                <Text style={styles.wellcome}>
                    Register Account
                </Text>
                <View style={{ flexDirection: 'row', columnGap: 5, alignItems: 'center' }}>
                    <Text style={styles.wellcome}>to</Text>
                    <Text style={{ fontSize: 24, fontWeight: 'bold', color: "#407BFF" }}>MEDIFIND</Text>
                </View>
                <Text style={styles.hello}>Hello there, register to continue</Text>
            </View>
            <View style={styles.form_container}>
                <View style={focusName ? styles.input_container_focus : styles.input_container}>
                    {focusName && <Text >
                        Name
                    </Text>}
                    <View>
                        <TextInput placeholder="Your name" onFocus={onFocusName} onBlur={onBlurName} value={name} onChangeText={(text) => setName(text)}>
                        </TextInput>
                    </View>

                </View>
                <View style={focusEmail ? styles.input_container_focus : styles.input_container}>
                    {focusEmail && <Text >
                        Email
                    </Text>}
                    <View>
                        <TextInput placeholder="Email address" onFocus={onFocusEmail} onBlur={onBlurEmail} value={email} onChangeText={(text) => setEmail(text)}>
                        </TextInput>
                    </View>

                </View>
                <View style={focusPassword ? styles.input_container_focus : styles.input_container}>
                    {focusPassword && <Text >
                        Password
                    </Text>}
                    <View>
                        <TextInput placeholder="Password" onFocus={onFocusPassword} onBlur={onBlurPassword} value={password} onChangeText={(text) => setPassword(text)} secureTextEntry={sercuePassword}>
                        </TextInput>
                        <TouchableOpacity onPress={() => setSercuePassword(!sercuePassword)} style={{ position: 'absolute', right: 10, top: 10 }}>
                            <Image source={require('./iamges/hideIcon.png')} style={{ width: 20, height: 20 }} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={focusConfirmPassword ? styles.input_container_focus : styles.input_container}>
                    {focusConfirmPassword && <Text >
                        Confirm Password
                    </Text>}
                    <View>
                        <TextInput placeholder="Confirm Password" onFocus={onFocusConfirmPassword} onBlur={onBlurConfirmPassword} value={confirmPassword} onChangeText={(text) => setConfirmPassword(text)} secureTextEntry={sercueConfirmPassword}>
                        </TextInput>
                        <TouchableOpacity onPress={() => setSercueConfirmPassword(!sercueConfirmPassword)} style={{ position: 'absolute', right: 10, top: 10 }}>
                            <Image source={require('./iamges/hideIcon.png')} style={{ width: 20, height: 20 }} />
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
            <TouchableOpacity style={styles.login_btn}>
                <Text style={{ color: "white" }}>
                    Register
                </Text>
            </TouchableOpacity>
            <View style={styles.other_option_container}>
                <Text style={{ color: "#A1A8B0" }}>
                    Or continue with social account
                </Text>
                <View style={styles.other_options}>
                    <TouchableOpacity style={styles.option_container}>
                        <View>
                            <Image source={require('./iamges/Google_icon.jpg')} style={styles.option_icon} />
                        </View>
                        <Text>
                            Google
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.option_container}>
                        <View>
                            <Image source={require('./iamges/Facebook_icon.png')} style={styles.option_icon} />
                        </View>
                        <Text>
                            Facebook
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.footer}>
                <View style={styles.register_container}>
                    <Text>
                        Already have an account?
                    </Text>
                    <TouchableOpacity onPress={() => onNavigate(RootScreens.LOGIN)}>
                        <Text style={{ color: "#407BFF" }}>
                            Log in
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            paddingTop: 20,
            backgroundColor: '#ffffff',
            paddingLeft: width * 5 / 100,
        },
        logo_container: {
            marginTop: 20
        },
        logo: {
            height: 80,
            width: 80
        },
        title_container: {
        },
        wellcome: {
            fontSize: 24,
            fontWeight: 'bold'
        },
        hello: {
            fontSize: 14,
            color: '#ADADAD'
        },
        form_container: {
            marginTop: 50
        },
        input_container: {
            height: 50,
            width: width * 90 / 100,
            borderColor: '#ADADAD',
            borderBottomWidth: 1,
            justifyContent: 'center',
            marginTop: 20,
            paddingLeft: 10,
            rowGap: 10
        },
        input_container_focus: {
            height: 70,
            width: width * 90 / 100,
            borderRadius: 6,
            justifyContent: 'center',
            marginTop: 20,
            paddingLeft: 10,
            rowGap: 10,
            backgroundColor: '#fff', // Add this line
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
        },
        login_btn: {
            width: width * 90 / 100,
            height: 60,
            backgroundColor: "#407BFF",
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20
        },
        other_option_container: {
            marginTop: 20,
            width: width * 90 / 100,
            alignItems: 'center'
        },
        other_options: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            width: width * 90 / 100,
            marginTop: 20
        },
        option_container: {
            flexDirection: 'row',
            columnGap: 10,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: '#A1A8B0',
            borderRadius: 6,
            height: 50,
            width: width * 40 / 100,
        },
        option_icon: {
            width: 40,
            height: 40
        },
        register_container: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            columnGap: 5,

        },
        footer: {
            position: 'absolute',
            bottom: 30,
            width: width
        }
    }
)