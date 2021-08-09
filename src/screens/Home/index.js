import React, { Component } from 'react'
import { Text, View, TouchableOpacity, FlatList,StyleSheet,SafeAreaView } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import auth from '@react-native-firebase/auth'
import firebase from '@react-native-firebase/app'
import database from '@react-native-firebase/database'
import RouteItem from '../../Component/RouteItem'
class Home extends Component {
    constructor(props){
        super(props);
        this.state={
            data:[]
        }
    }
    static navigationOptions = ({ navigation }) => {
        return {
            headerLeft: <TouchableOpacity onPress={() => navigation.navigate("Create")} style={{ marginLeft: 10 }}>
                <Icon name="plus" size={25} />
            </TouchableOpacity>,
            headerRight: <TouchableOpacity onPress={() => {
                auth()
                    .signOut()
                    .then(() => {
                        alert("dasd")
                        navigation.navigate("AppNavigator")
                    });
            }} style={{ marginRight: 10 }}>
                <Icon size={25} name="sign-out-alt" />
            </TouchableOpacity>
        }

    }
    componentDidMount() {
        database()
            .ref('/rooms')
            .on('value', snapshot => {
                var rooms=[];
                snapshot.forEach((item)=>{
                    console.log(item.key)
                    rooms.push({
                        name:item.val().name,
                        userId:item.val().userId,
                        id:item.key
                    })  
                });
                
                this.setState({
                    data:rooms
                })
                
            });
            
    }
    room_item=({item})=>{
        return(
           <RouteItem item={item}/>
        )
    }
    render() {
        const {data}=this.state
        console.log(data);
        return (
            <SafeAreaView>
                <FlatList
                data={data}
                renderItem={this.room_item}
                >

                </FlatList>
            </SafeAreaView>
        )
    }
}

export default Home;