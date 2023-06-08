import Paho from "paho-mqtt";
import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
    StyleSheet,
    Text,
    Button,
    View,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import Task from "../components/Task";
import { globalStyles } from '../styles/global';
// import styles from "../App.components.style";
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
export default function Home({ navigation }) {
    const pressHandler = () => {
        //navigation.navigate('ReviewDetails');
        navigation.push('Map');
    }
    const [value, setValue] = useState({
      pm25: null,
      mq7: null,
      gas: null,
    });
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
      });
      console.log("pm2.5:"+messageArr[0]+" mq7:"+messageArr[1]+ " gas:"+messageArr[2]+" latitude:"+messageArr[3]+" long:"+messageArr[4]);
    }
    return (
      <View style={globalStyles.container}>
        <Text style={globalStyles.titleText}>Mức cảnh báo:  </Text> 
        <Text></Text>
        <Text style={globalStyles.titleText}>Chỉ số ô nhiễm: </Text>
        <Text>Pm2.5: {value.pm25}</Text>
        <Text>Mq7: {value.mq7}</Text>
        <Text>Gas: {value.gas}</Text>
        <Button title='Vị trí cảnh báo' onPress={pressHandler} 
        color="#015841"/>
    </View>
    );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'fff',
    alignItems: 'center',
    justifyContent: 'center',
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
