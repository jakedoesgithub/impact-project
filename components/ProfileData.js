import React from "react";
import {
    StyleSheet,
    Text,
    View,
  }  from "react-native";


  /*props:
      field - the field name, ie  Username
      data - the data for the field, ie {usersUsername}
    output: A text bar showing "Username: {usersUsername}*/
export default function ProfileData(props){
    return(
        <Text style={styles.info}>{props.field} {props.data} </Text>
    );
}



const styles = StyleSheet.create({
    info: {
      marginTop: 10,
      marginLeft:5,
      fontSize: 15,
      fontWeight: 'bold',
      color: 'white',
    }
})
