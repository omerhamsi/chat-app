import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import { Formik } from 'formik'
import * as Yup from 'yup'
import Icon from 'react-native-vector-icons/FontAwesome5'
import auth from '@react-native-firebase/auth'
import firebase from '@react-native-firebase/app'
class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hidden: true,
            check: false
        }
    }
    _handleSubmit(values) {

        auth()
            .createUserWithEmailAndPassword(values.email,values.password)
            .then(() => {
                const user=firebase.auth().currentUser;
                user.updateProfile({
                    displayName:values.name
                })
                this.props.navigation.navigate("HomeNavigator")
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
                            name: "",
                            password: ""
                        }}
                        onSubmit={this._handleSubmit.bind(this)}
                        validationSchema={Yup.object().shape({
                            email: Yup.string().required("email gereklidir"),
                            name: Yup.string().required("name gereklidir"),
                            password: Yup.string().required("password gereklidir")
                        })}
                    >{({ handleSubmit, handleChange, values, errors }) => (
                        <View>
                            <View style={{ justifyContent: "center", alignItems: "center" }}>
                                <TextInput value={values.name} onChangeText={handleChange("name")} style={style.text_input} placeholderTextColor="#2c2948" placeholder="name"></TextInput>
                                {errors.name && <Text style={{ color: "red" }}>{errors.name}</Text>}
                                <TextInput value={values.email} onChangeText={handleChange("email")} style={style.text_input} placeholderTextColor="#2c2948" placeholder="email"></TextInput>
                                {errors.email && <Text style={{ color: "red" }}>{errors.email}</Text>}
                                <TextInput secureTextEntry={this.state.hidden} value={values.password} onChangeText={handleChange("password")} style={style.text_input} placeholderTextColor="#2c2948" placeholder="password"></TextInput>
                                {errors.password && <Text style={{ color: "red" }}>{errors.password}</Text>}
                                <TouchableOpacity onPress={() => this.setState({ hidden: !this.state.hidden })} style={style.icon}><Icon name="eye" size={20} /></TouchableOpacity>
                            </View>

                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", marginHorizontal: 80 }}>
                                <TouchableOpacity onPress={() => { this.setState({ check: !this.state.check }) }} style={{ justifyContent: "center", alignItems: "center", width: 50, marginRight: 5, height: 50, backgroundColor: "#d3d3d3", borderRadius: 10 }}>
                                    {
                                        this.state.check ? <Icon name="check" size={25} /> : null
                                    }
                                </TouchableOpacity>
                                <Text>By creating account you have to agree with our Teams</Text>
                            </View>
                            <View style={{ justifyContent: "center", alignItems: "center" }}>
                                <TouchableOpacity onPress={handleSubmit} style={style.button}>
                                    <Text style={{ color: "#ffffff", fontWeight: "bold" }}>
                                        Sıgn Up My Account
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ justifyContent: "center", marginTop: 10, flexDirection: "row" }}>
                                <Text style={{ fontSize: 15 }}>
                                    Already have an account?
                                </Text>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate("Login")}>
                                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                                        -Sıgn In
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
    button: { backgroundColor: "#7165e3", height: 50, width: 300, borderRadius: 10, justifyContent: "center", alignItems: "center", marginTop: 20 }
})
export default Register
