import React, {useState} from 'react';
import {Image,
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    Alert,
    Dimensions,
    ScrollView,
    setState,
    FlatList} from 'react-native';
import { NavigationActions } from 'react-navigation';
import * as firebase from 'firebase';
import "firebase/firestore";
import Result from "./../components/Result";

const {width: WIDTH} = Dimensions.get('window');
export default function SearchScreen(props) {
    const[city, setCity] = useState("");
    const[homeState, setHomeState] = useState("");
    const[school, setSchool] = useState("");
    const[type, setType] = useState("");
    const[major, setMajor] = useState("");
    const[displayResults, setDisplayResults] = useState(false);
    const[isLoadingComplete, setLoadingComplete] = useState(false);
    const[data, setData] = useState([]);
    const[reload, setReload] = useState(true);
    let query = firebase.firestore().collection("users")

    function sleep(milliseconds) {
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
          if ((new Date().getTime() - start) > milliseconds){
            break;
          }
        }
      }

    getResults = (query) =>{
        query.get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                console.log("query result exists:", doc.get("userName"))
                const {userName, firstName, lastName, city, state, school} = doc.data();
                let temp = {
                    key: doc.id,
                    userName,
                    firstName,
                    lastName,
                    city,
                    state,
                    school
                }
                let temp2 = data
                temp2.push(temp);
                setData(temp2);
                console.log(data);
        }); setDisplayResults(!displayResults)
    })
    }
    


    SearchResults = (city, homeState, school, major) => {
         
        if(city !== ""){
            query = query.where("city", "==", city);
        }
        if(homeState !== ""){
            query = query.where("state", "==", homeState)
        }
        if(school !== ""){
            query = query.where("school", "==", school);
        }
        query = query.where("major", "==", major);
        getResults(query)
    }  
    

    onSearchPress = () => {
        SearchResults(city, homeState, school, major)
    }

    onReloadPress = () => {setDisplayResults(!displayResults)}
    


    if(!isLoadingComplete){
        var userID = firebase.auth().currentUser.uid;
        var userDB = firebase.firestore().collection("users")
        var refrence = userDB.doc(userID);
        refrence.get().then(function(doc) {
            if(doc.exists){
                console.log("document exists");
                setType(doc.get("userType"));
                setMajor(doc.get("major"));
            };
        })
        setLoadingComplete(true);
    }
    else{
        return(
            <View>
                <Text>{(type === "student")? "Mentor Search" : "Student Search"} </Text>
    
                <Text sytle={styles.text}>Enter City</Text>
                <View style={styles.inputContainer}>
                    <TextInput 
                        style={styles.input}
                        value={city}
                        onChangeText={(text) => setCity(text)}
                        placeholder="City"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        placeholderTextColor={ 'rgba(255,255,255,0.7)'}
                        underlineColorAndroid='transparent'
                        autoCorrect={false}
                    />
                </View>
    
    
                <Text style={styles.text}>Enter State</Text>
                <View style={styles.inputContainer}>
                    <TextInput 
                        style={styles.input}
                        value={homeState}
                        onChangeText={(text) => setHomeState(text)}
                        placeholder="State"
                        autoCapitalize="none"
                        placeholderTextColor={ 'rgba(255,255,255,0.7)'}
                        underlineColorAndroid='transparent'
                        autoCorrect={false}
                    />
                </View>
    
                <Text style={styles.text}>Enter School</Text>
                <View style={styles.inputContainer}>
                    <TextInput 
                        style={styles.input}
                        value={school}
                        onChangeText={(text) => setSchool(text)}
                        placeholder="School"
                        autoCapitalize="none"
                        placeholderTextColor={ 'rgba(255,255,255,0.7)'}
                        underlineColorAndroid='transparent'
                        autoCorrect={false}
                    />
                </View>
    
                <Button title="Press to Search" onPress={onSearchPress} />
                <Button title="Reload" onPress={onReloadPress} />
            

           
                <ScrollView> 
                    <View> 
                        {displayResults? (
                        <View>
                            <Text>RESULTS TAB</Text>
                            <FlatList data={data} 
                                renderItem = {({item}) => 
                                <Result UserName={item.userName} FirstName={item.firstName} 
                                LastName={item.lastName} City={item.city} State={item.state} School={item.school} />
                                }
                                keyExtractor={(item) => item.key}
                            />
                            <Text>{"\n"}{"\n"}{"\n"}{"\n"}</Text>
                        </View>
                        ):(<View></View>)
                        }
                    </View>
                </ScrollView>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    backgroundContainer: {
        flex:1,
        width: null,
        height: null, 
        backgroundColor: '#B5E3FF'    
    },
    inputContainer: {
        marginTop : 5
    },
    input: {
        width : WIDTH -55,
        height: 45,
        borderRadius:25,
        fontSize: 16,
        paddingLeft: 20,
        backgroundColor: '#368DEB',
        color: 'rgba(255,255,255,0.7)',
        marginHorizontal: 25
    },
    text:{
        color: 'rgba(255,255,255,0.7)',
        fontSize: 16,
        textAlign: 'center'
    }
})