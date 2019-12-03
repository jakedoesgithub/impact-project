import React from 'react';
import {Image,
    StyleSheet,
    Text,
    View,
    TextInput,
    Dimensions,
    Button,
    Alert,
    ScrollView} from 'react-native';
import * as firebase from 'firebase';

export default function Result(props) {

    addConnectionOnPress = () => {
        currentUser = firebase.auth().currentUser.uid
        firebase.firestore().collection("users").doc(currentUser).update({
            connections: firebase.firestore.FieldValue.arrayUnion(props.uid)
            }).then(Alert.alert("Connection Added"))
    }
    

    return (
        <View style={styles.background}>
            {/* <View style={styles.container}>
                <Image
                        style={styles.userImage}
                        source={{
                        uri: props.url
                        }}
                />
            </View> */}
            <Text style={styles.text}>Username: {props.UserName}</Text>
            <Text style={styles.text}>Name: {props.FirstName} {props.LastName}</Text>
            <Text style={styles.text}>City: {props.City}</Text>
            <Text style={styles.text}>State: {props.State}</Text>
            <Text style={styles.text}>School: {props.School}</Text>
            <Button style={styles.addButton} title="Add Connection" onPress={addConnectionOnPress}/>
            
        </View>
    )
}

const styles = StyleSheet.create({
    background:{
        backgroundColor: "#25D4D4",
        borderColor: "#000000",
    },
    addButton: {
        color: "#1C18E0"

    },
    text:{
        fontSize: 16,
        textAlign:"left",
    },
    container: {

    }
})