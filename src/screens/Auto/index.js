import React, { Component } from 'react'
import { Text, View } from 'react-native'
import firebase from '@react-native-firebase/app'
import auth from '@react-native-firebase/auth'
class Auto extends Component {
    componentDidMount() {
        const user = firebase.auth().currentUser;
        if (user) {
            this.props.navigation.navigate("HomeNavigator")
        }else{
            this.props.navigation.navigate("AppNavigator")
        }
    }
    render() {
        return (
            <View>

            </View>
        )
    }
}
export default Auto