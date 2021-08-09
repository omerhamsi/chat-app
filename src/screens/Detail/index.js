import React, { Component } from 'react'
import { Text, View, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import Icon from 'react-native-vector-icons/FontAwesome5';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
import MessageItem from '../../Component/MessageItem';
import { HeaderBackground } from 'react-navigation-stack';
class Detail extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam("name")
        }
    }
    constructor(props) {
        super(props);
        this.state = {
            message: [],
            text: ""
        }
    }
    componentDidMount() {
        const roomid = this.props.navigation.getParam("id");
        console.log(roomid);
        database()
            .ref(`/messages/${roomid}`)
            .on('value', snapshot => {
                const room_message=[];
                snapshot.forEach((item)=>{
                   room_message.push(item.val())
                })
                this.setState({
                    message:room_message
                })
            });
    }
    message_click = () => {
        const user = firebase.auth().currentUser;
        const userId = user.uid;
        const userName = user.displayName;
        const roomid = this.props.navigation.getParam("id")
        var database2 = firebase.database().ref(`/messages/${roomid}`);
        database2.push({
            name: this.props.navigation.getParam("name"),
            text: this.state.text,
            userId,
            userName
        }).then((result) => {
            this.setState({text:""})
            console.log(result.name)
        })
            .catch((error) => console.log(error));


    }
    _handleMessage({item}){
        return(
            <MessageItem item={item}/>
        )
    };
    render() {
        const { text ,message} = this.state;
        console.log("dsadsadasllfdpşlfşd")
        console.log(message)
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <FlatList
                    data={message}
                    style={{ backgroundColor: "white",paddingVertical:20}}
                    renderItem={this._handleMessage}
                    keyExtractor={item => item.key}
                >

                </FlatList>
                <View style={style.text_container}>
                    <TextInput value={text} onChangeText={(text) => {
                            this.setState({ text });
                    }} placeholder="writing" style={style.text_input}></TextInput>
                    <TouchableOpacity onPress={this.message_click.bind(this)} style={{ position: "relative", top: 15, left: 15 }}>
                        <Icon name="paper-plane" size={33} />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        )
    }
}
const style = StyleSheet.create({
    text_container: { flexDirection: "row", backgroundColor: "#d3d3d3" },
    text_input: {
        width: 310, height: 50, backgroundColor: "white", borderRadius: 10, paddingVertical: 10, marginVertical: 10, marginLeft: 10,
        paddingLeft: 10
    }
})
export default Detail