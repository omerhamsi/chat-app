import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';
import NavigationService from './NavigationService';
const RouteItem = ({ item }) => {
    return (
        <View style={style.container}>
            <TouchableOpacity onPress={()=>{NavigationService.navigate("Detail",{
                name:item.name,
                id:item.id
            })}} style={{flexDirection:"row"}}>
                <Icon style={{paddingLeft:10}} name="door-open" size={25} />
                <Text style={style.text_style}>
                    {item.name}
                </Text>
            </TouchableOpacity>
        </View>
    )
}
const style = StyleSheet.create({
    container: { backgroundColor: "#fffacd", paddingVertical: 25, marginBottom: 2 },
    text_style: { fontSize: 18, paddingLeft: 10 }
})
export default RouteItem
