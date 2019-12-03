import React, {useState, useEffect} from 'react';
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
    FlatList,
     TouchableOpacity,
    ActivityIndicator} from 'react-native';
import { NavigationActions } from 'react-navigation';
import * as firebase from 'firebase';
import "firebase/firestore";
import Result from "./../components/Result";

const {width: WIDTH} = Dimensions.get('window');
export default function SearchScreen(props) {
    const[homeCity, setCity] = useState("");
    const[homeState, setHomeState] = useState("");
    const[homeSchool, setSchool] = useState("");
    const[type, setType] = useState("");
    const[major, setMajor] = useState("");
    const[displayResults, setDisplayResults] = useState(false);
    const[isLoadingComplete, setLoadingComplete] = useState(false);
    const[data, setData] = useState([]);
    const[showSearch, setShowSearch] = useState(true);
    const[searchComplete, setSearchComplete] = useState(false);

    let query = firebase.firestore().collection("users")

    function sleep(milliseconds) {
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
          if ((new Date().getTime() - start) > milliseconds){
            break;
          }
        }
      }

    getResults =  (query) =>{
        console.log("entered query get()")
        query.get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                console.log("query result exists:", doc.get("userName"))
                let {userName, firstName, lastName, city, state, school, profilePicURL} = doc.data();
                var temp = {
                    key: doc.id,
                    userName,
                    firstName,
                    lastName,
                    city,
                    state,
                    school,
                    profilePicURL
                }
                var temp2 = data;
                temp2.push(temp);
                setData(temp2);
                console.log(data);
        })
        
    }).then(() => setSearchComplete(true))
    }
    


    SearchResults = (homeCity, homeState, homeSchool, major) => {
        let query = firebase.firestore().collection("users")
        if(homeCity !== ""){
            query = query.where("city", "==", homeCity);
        }
        if(homeState !== ""){
            query = query.where("state", "==", homeState)
        }
        if(homeSchool !== ""){
            query = query.where("school", "==", homeSchool)
        }
        query = query.where("major", "==", major);
        if(type === "student"){
              query = query.where("userType", "==", "mentor");
        }else{
              query = query.where("userType", "==", "student");
        }
        
    }  
    

    onSearchPress = () => {
        SearchResults(homeCity, homeState, homeSchool, major);
        //setShowSearch(false)
        setDisplayResults(!displayResults)
    }

    onReloadPress = () => {setDisplayResults(!displayResults)}

    getData = () => {
        var userID = firebase.auth().currentUser.uid;
        var userDB = firebase.firestore().collection("users")
        var refrence = userDB.doc(userID);
        refrence.get().then(function(doc) {
            if(doc.exists){
                console.log("document exists");
                setType(doc.get("userType"));
                setMajor(doc.get("major"));
            };
        }).then(() => setLoadingComplete(true))
    }
    
    useEffect(()=>{
        getData()
    },[])

    if(!isLoadingComplete){
        return (
            <ActivityIndicator
              animating={true}
              style={styles.indicator}
              size="large"
            />
          );
    }
    else{
        return(
            <ScrollView>
            <View style={styles.backgroundContainer}>
               <Image source={require('../assets/images/BGI.png')} style={styles.backgroundContainer}/>    
 
                    <View style={styles.inputContainer}>
                        <TextInput 
                            style={styles.input}
                            value={homeCity}
                            onChangeText={(text) => setCity(text)}
                            placeholder="City"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            placeholderTextColor={ 'rgba(255,255,255,0.7)'}
                            underlineColorAndroid='transparent'
                            autoCorrect={false}
                        />
                    </View>
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
                    <View style={styles.inputContainer}>
                        <TextInput 
                            style={styles.input}
                            value={homeSchool}
                            onChangeText={(text) => setSchool(text)}
                            placeholder="School"
                            autoCapitalize="none"
                            placeholderTextColor={ 'rgba(255,255,255,0.7)'}
                            underlineColorAndroid='transparent'
                            autoCorrect={false}
                        />
                    </View>
                    <TouchableOpacity style={styles.btnSEARCH} onPress={onSearchPress}>
                        <Text style={styles.text}>SEARCH</Text> 
                    </TouchableOpacity>
                    
            
                {(!!data.length) ? (
                <View>
                    <Text>RESULTS TAB</Text>
                    <Result url={"test"} uid={"test"} UserName={"test"} FirstName={"test"} 
                        LastName={"test"} City={"test"} State={"test"} School={"test"} />
                    <FlatList data={data} 
                        renderItem = {({item}) => {
                        <Result url={item.profilePicURL} uid={item.key} UserName={item.userName} FirstName={item.firstName} 
                        LastName={item.lastName} City={item.city} State={item.state} School={item.school} />
                        }}
                        keyExtractor={(item) => item.key}
                    />           
                </View>)
                    :(<Text>Waiting for results</Text>)}
            </View>
            </ScrollView>

        )
    }
}


const styles = StyleSheet.create({
    backgroundContainer: {
        flex:1,  
        position: "absolute"
    },
    inputContainer: {
        marginTop : 20
    },
    btnSEARCH:{
        margin: 20

    },
    input: {
        width : WIDTH -55,
        height: 45,
        borderRadius:25,
        fontSize: 16,
        paddingLeft: 20,
        backgroundColor: '#0075C4',
        color: '#1F2421',
        marginHorizontal: 25
    },
    text:{
        color: '#EFA00B',
        fontSize: 16,
        textAlign: 'center'
    }
})
SearchScreen.navigationOptions = {
    title: 'Find a Mentor',
    headerStyle: {
        backgroundColor: '#2398f4',
      },
      headerTintColor: '#B5E3FF',
      headerTitleStyle: {
      fontWeight: 'bold',
      
      },


};