import React, { Component } from 'react'
import { Text, View,TextInput,TouchableOpacity } from 'react-native'
import {Formik} from 'formik'
import * as Yup from 'yup'
import database from '@react-native-firebase/database'
import auth from '@react-native-firebase/auth'
import firebase from '@react-native-firebase/app'
class Create extends Component {
    _handleSubmit = (values) => {
        const user = firebase.auth().currentUser;
        const userId = user.uid;
        const userName = user.displayName;
        var database2=firebase.database().ref('/rooms');
        database2.push({
           name:values.name,
           userId,
           userName
        }).then((result) =>{
            this.props.navigation.goBack();
            console.log(result.name)
        })
            .catch((error) => console.log(error));


    };
    render() {
        return (
            <View>
                <Formik 
                 initialValues={{
                     name:""
                 }}
                 onSubmit={this._handleSubmit.bind(this)}
                 validationSchema={Yup.object().shape({
                     name:Yup.string().required("name is required")
                 })}
                >
                    {({handleSubmit,values,handleChange,errors})=>(
                      <View style={{justifyContent:"center",alignItems:"center",marginTop:150}}>
                          <TextInput onChangeText={handleChange("name")} value={values.name} style={{paddingLeft:10,width:250,height:50,backgroundColor:"#d3d3d3",borderRadius:10}} placeholder="name" >
                           
                          </TextInput>
                          {(errors.name && <Text>{errors.name}</Text>)}
                          <TouchableOpacity style={{justifyContent:"center",alignItems:"center",width:250,height:50,backgroundColor:"#7165e3",borderRadius:10,marginTop:20}} onPress={handleSubmit}>
                              <Text style={{fontSize:16,color:"white"}}>Create Room</Text>
                          </TouchableOpacity>

                      </View>
                    )}


                </Formik>
            </View>
        )
    }
}
export default Create