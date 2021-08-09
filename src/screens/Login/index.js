import React, { Component } from 'react'
import { Text, View, StyleSheet, TextInput, Touchable, TouchableOpacity } from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup'
import Icon from 'react-native-vector-icons/FontAwesome5'
import auth from '@react-native-firebase/auth'
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hidden: true
        }
    }
    _handleSubmit(values) {
        auth()
            .signInWithEmailAndPassword(values.email,values.password)
            .then(() => {
                this.props.navigation.navigate("HomeNavigator");
                console.log('User account created & signed in!');
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                }

                if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                }

                console.error(error);
            });
    }
    render() {
        return (
            <View>
                <View style={style.text_container}>
                    <Text style={{ fontSize: 30, fontWeight: "bold", letterSpacing: 2 }}>Welcome Back!</Text>
                    <Text style={{ opacity: 0.4, marginTop: 20, fontSize: 16 }}>Sign in to continue</Text>
                    <Formik
                        initialValues={{
                            email: "",
                            password: ""
                        }}
                        onSubmit={this._handleSubmit.bind(this)}
                        validationSchema={Yup.object().shape({
                            email: Yup.string().required("email gereklidir"),
                            password: Yup.string().required("password gereklidir")
                        })}
                    >{({ handleSubmit, handleChange, values, errors }) => (
                        <View style={style.input_container}>
                            <TextInput value={values.email} onChangeText={handleChange("email")} style={style.text_input} placeholderTextColor="#2c2948" placeholder="email"></TextInput>
                            {errors.email && <Text style={{ color: "red" }}>{errors.email}</Text>}
                            <TextInput secureTextEntry={this.state.hidden} value={values.password} onChangeText={handleChange("password")} style={style.text_input} placeholderTextColor="#2c2948" placeholder="password"></TextInput>
                            {errors.password && <Text style={{ color: "red" }}>{errors.password}</Text>}
                            <TouchableOpacity onPress={() => this.setState({ hidden: !this.state.hidden })} style={style.icon}><Icon name="eye" size={20} /></TouchableOpacity>

                            <View style={{ alignItems: "flex-end" }}>
                                <Text style={{ opacity: 0.4, marginTop: 15 }}>Forgot Password?</Text>
                            </View>
                            <View>
                                <TouchableOpacity onPress={handleSubmit} style={style.button}>
                                    <Text style={{ color: "#ffffff", fontWeight: "bold" }}>
                                        Sıgn in My Account
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ justifyContent: "center", marginTop: 10, flexDirection: "row" }}>
                                <Text style={{ fontSize: 15 }}>
                                    Dont Have an Account?
                                </Text>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate("Register")}>
                                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                                        -Sıgn Up
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}

                    </Formik>
                </View>
            </View>
        )
    }
}
const style = StyleSheet.create({
    text_container: { alignItems: "center", justifyContent: "center", marginVertical: 30 },
    input_container: { marginVertical: 60 },
    text_input: { width: 300, height: 50, backgroundColor: "#d3d3d3", borderRadius: 10, marginTop: 10, paddingLeft: 20 },
    icon: { position: "relative", left: 268, bottom: 32 },
    button: { backgroundColor: "#7165e3", height: 50, borderRadius: 10, justifyContent: "center", alignItems: "center", marginTop: 20 }
})
export default Login
