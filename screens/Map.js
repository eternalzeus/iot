import Paho from "paho-mqtt";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
    StyleSheet,
    Text,
    Button,
    View,
    TouchableOpacity,
    ScrollView,
    Image,
    FlatList,
    Dimensions,  
} from "react-native";
import { globalStyles } from '../styles/global';
import MapView,{Marker} from 'react-native-maps';
import * as Location from 'expo-location';

// import Task from "./components/Task";
var message="yes"; 

client = new Paho.Client(
  "broker.hivemq.com",
  Number(8000),
  `mqtt-async-test-${parseInt(Math.random() * 100)}`
);

// client.onConnectionLost = onConnectionLost;


// connect the client
client.connect({onSuccess:onConnect});

// called when the client connects
function onConnect() {
  console.log("onConnect");
  client.subscribe("World");
  message = new Paho.Message("Hola");
  message.destinationName = "World";
  client.send(message);
}
export default function Map({ navigation }) {
  const [mapRegion, setMapRegion] = useState({
    latitude: 28.4396093,
    longitude: 104.1866361,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const userLocation = async()=>{
    let{status} = await Location.requestForegroundPermissionsAsync();
    if(status !== 'granted'){
      setErrorMsg('Permission denied!');
    }
    let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true});
    setMapRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
    console.log("My Location:"+location.coords.latitude,location.coords.longitude);
  }

  const clickHandler = () => {  // Update STATE
    setMapRegion({
      latitude: parseFloat(value.la),
      longitude: parseFloat(value.long),
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    })
  };
  const [value, setValue] = useState({
    pm25: null,
    mq7: null,
    gas: null,
    la: null,
    long: null
  });
  useEffect(()=>{
    userLocation();
  },[])
  client.onMessageArrived = onMessageArrived;
  function onMessageArrived(message) {
    console.log("Message received:"+message.payloadString);
    // setName(message.payloadString);
    const messageText = message.payloadString;
    const messageArr = messageText.split("_");
    setValue({
      pm25: messageArr[0],
      mq7: messageArr[1],
      gas: messageArr[2],
      la: messageArr[3],
      long: messageArr[4],
    });
    console.log("pm2.5:"+messageArr[0]+" mq7:"+messageArr[1]+ " gas:"+messageArr[2]+" latitude:"+messageArr[3]+" long:"+messageArr[4]);
  }
  
    return (
      <View style={globalStyles.container}>
        <Button title="Định vị" onPress={clickHandler}
        color= "#5857fa"/>
        <MapView style={styles.map} 
          region = {mapRegion}
        >
        <Marker coordinate={mapRegion} title="Marker" />
        </MapView>
        {/* <Button title="Get Location" onPress={userLocation}/> */}
        
        </View>
    );
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'000',
    },
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
    header: {
      backgroundColor: 'pink',
      padding: 20,
    },
    body: {
      backgroundColor: 'yellow',
      padding: 20,
    },
    boldText: {
      fontWeight: 'bold',
    },
    buttonContainer: {
      marginTop: 20,
    },
    input: {
      borderWidth: 1,
      borderColor: '#777',
      padding: 8,
      margin: 10,
      width: 200,
    },
    item: {
      flex: 1,
      marginHorizontal: 10,
      marginTop: 24,
      padding: 30,
      backgroundColor: 'pink',
      fontSize: 24,
    },
  });