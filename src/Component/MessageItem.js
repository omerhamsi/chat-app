import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import firebase from '@react-native-firebase/app'
class MessageItem extends Component {
    render() {
        const { item } = this.props;
        const user = firebase.auth().currentUser;
        console.log(user)
        return (
            //style={user.uid===item.userId ?style.right_message:style.left_message
            <View style={user.uid === item.userId ? style.right : style.left}>
                <View style={user.uid === item.userId ? style.right_message : style.left_message}>
                    <Text style={{ color: "white",fontSize:16,paddingLeft:10}}>{item.text}</Text>
                </View>
            </View>
        )
    }
}
const style = StyleSheet.create({
    left_message: { width: 150, height: 50, backgroundColor: "#128c7e",justifyContent:"center",borderRadius:10},
    right_message: { width: 150, height: 50, backgroundColor: "#25d366",justifyContent:"center",borderRadius:10},
    left:{alignItems:"flex-start",marginBottom:10,marginHorizontal:10},
    right:{alignItems:"flex-end",marginBottom:10,marginHorizontal:10}
})
export default MessageItem;
