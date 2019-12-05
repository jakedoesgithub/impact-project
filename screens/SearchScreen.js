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
    const[homeCity, setCity] = useState("default");
    const[homeState, setHomeState] = useState("default");
    const[homeSchool, setSchool] = useState("default");
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
                console.log("query result exists:");
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
                setData(data.concat(temp))
                console.log(temp);})
        }).then(() => {console.log(data);setSearchComplete(true)})
    }
    


    SearchResults = (homeCity, homeState, homeSchool, major) => {
        let query = firebase.firestore().collection("users");
        if(homeCity !== ""){
            query = query.where("city", "==", String(homeCity))
        }
        if(homeState !== ""){
            query = query.where("state", "==", String(homeState))
        }
        if(homeSchool !== ""){
            query = query.where("school", "==", String(homeSchool))
        }
        query = query.where("major", "==", String(major))
        // if(type === "student"){
        //       query = query.where("userType", "==", "mentor");
        // }else{
        //       query = query.where("userType", "==", "student");
        // }
        getResults(query)
        
    }  
    

    onSearchPress =  () => {
        SearchResults(homeCity, homeState, homeSchool, major);
        //setShowSearch(false)
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

    return(
        <ScrollView>
                <View>
                    {/* <Image source={require('../assets/images/BGI.png')} style={styles.backgroundContainer}/>     */}
                    {isLoadingComplete?(
                        <View>
                        <View style={styles.inputContainer}>
                            <TextInput 
                                style={styles.input}
                                //value={homeCity}
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
                        </View>)
                        :(<ActivityIndicator
                            animating={true}
                            style={styles.indicator}
                            size="large"
                          />
                        )}
                        
        
            {(searchComplete) ? (
            <View>
                <Text>RESULTS TAB</Text>
                <Result url={"https://firebasestorage.googleapis.com/v0/b/impact-dc23e.appspot.com/o/images%2Favatar_placeholder_small.png?alt=media&token=0188f830-a1a3-495c-a5b2-c167e8051b98"} uid={"ZxxISi5lf1QA19ESQr3B3csXbb93"} UserName={"car-michael"} FirstName={"Michael"} 
                    LastName={"Mitsubishi"} City={"Baton Rouge"} State={"Louisiana"} School={"LSU"} />
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
    indicator: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 80
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