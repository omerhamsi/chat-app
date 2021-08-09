import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer,createSwitchNavigator } from 'react-navigation'
import Login from './screens/Login'
import Register from './screens/Register'
import App from '../App'
import Home from './screens/Home'
import Auto from './screens/Auto'
import Create from './Create'
import Detail from './screens/Detail'
const AppNavigator=createStackNavigator({
    Login:{
        screen:Login
    },
    Register:{
        screen:Register
    }
})
const HomeNavigator=createStackNavigator({
    Home:{
        screen:Home
    },
    Create:{
        screen:Create
    },
    Detail:{
        screen:Detail
    }
})
const switchNavigator=createSwitchNavigator({
    Auto:Auto,
    HomeNavigator:HomeNavigator,
    AppNavigator:AppNavigator
}
)

export default createAppContainer(switchNavigator);