import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, TextInput } from 'react-native';
import { RootScreens } from "..";
const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;
import { useState } from "react"


export interface LogInProps {
    onNavigate: (screen: RootScreens) => void;
}

export const Login = (props: LogInProps) => {

    const { onNavigate } = props;
    const [focusEmail, setFocusEmail] = useState(false)
    const [focusPassword, setFocusPassword] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [sercuePassword, setSercuePassword] = useState(true)
    function onFocusEmail() {
        setFocusEmail(true)
        if (password === '') {
            setFocusPassword(false)
        }
    }
    function onFocusPassword() {
        setFocusPassword(true)
        if (email === '') {
            setFocusEmail(false)
        }
    }
    const API_Login = "https://medifind-be.proudsea-d3f4859a.eastasia.azurecontainerapps.io/api/v1/signin"
    async function onLogin() {
        const data = {
            email: email,
            password: password
        }
        await fetch(API_Login, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => response.json())
            .then(data => {
                if (data.status === "success") {
                    const userID = data.userID; /// cais truyeenf di tuw` API
                    console.log(userID);
                    setEmail('')
                    setPassword('')
                    onNavigate(RootScreens.MAIN)
                }
                else {
                    alert(data.error)
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    return (
        <View style={styles.container}>
            <View style={styles.logo_container}>
                <Image style={styles.logo} source={require('./iamges/Logo_red.png')} />
            </View>
            <View style={styles.title_container}>
                <Text style={styles.wellcome}>
                    Wellcome Back 👋
                </Text>
                <View style={{ flexDirection: 'row', columnGap: 5, alignItems: 'center' }}>
                    <Text style={styles.wellcome}>to</Text>
                    <Text style={{ fontSize: 24, fontWeight: 'bold', color: "#407BFF" }}>MEDIFIND</Text>
                </View>
                <Text style={styles.hello}>Hello there, login to continue</Text>
            </View>
            <View style={styles.form_container}>
                <View style={focusEmail ? styles.input_container_focus : styles.input_container}>
                    {focusEmail && <Text >
                        Email
                    </Text>}
                    <View>
                        <TextInput placeholder="Email address" onFocus={onFocusEmail} value={email} onChangeText={(text) => setEmail(text)}>
                        </TextInput>
                    </View>

                </View>
                <View style={focusPassword ? styles.input_container_focus : styles.input_container}>
                    {focusPassword && <Text >
                        Password
                    </Text>}
                    <View>
                        <TextInput placeholder="Password" onFocus={onFocusPassword} value={password} onChangeText={(text) => setPassword(text)} secureTextEntry={sercuePassword}>
                        </TextInput>
                        <TouchableOpacity onPress={() => setSercuePassword(!sercuePassword)} style={{ position: 'absolute', right: 10, top: 10 }}>
                            <Image source={require('./iamges/hideIcon.png')} style={{ width: 20, height: 20 }} />
                        </TouchableOpacity>
                    </View>

                </View>
                <TouchableOpacity style={{ width: width * 90 / 100, alignItems: 'flex-end', marginTop: 10 }}>
                    <Text style={{ color: "#407BFF" }}>
                        Forgot password?
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.login_btn} onPress={onLogin}>
                    <Text style={{ color: "white" }}>
                        Login
                    </Text>
                </TouchableOpacity>
            </View>
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
                        Don't have an account?
                    </Text>
                    <TouchableOpacity onPress={() => onNavigate(RootScreens.SIGNUP)}>
                        <Text style={{ color: "#407BFF" }}>
                            Register
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
            paddingTop: 50,
            backgroundColor: '#ffffff',
            paddingLeft: width * 5 / 100,
        },
        logo_container: {
            marginTop: 50
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