import React from "react";
import {
    StyleSheet,
    Text,
    View,
  }  from "react-native";

export default function ProfileData(props){
    return(
        <Text style={styles.info}>{props.field}: {props.data} </Text>
    );
}



const styles = StyleSheet.create({
    info: {
      marginTop: 10,
      marginLeft:10,
      fontSize: 15,
      fontWeight: 'bold',
      color: '#696969',
    }
})
