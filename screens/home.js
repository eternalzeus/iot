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
function Low(){
  return(
  <Text style = {{color: 'green'}}>
    {'Low'}
  </Text>
  )
  
}
function Med(){
  return(
    <Text style = {{color: 'yellow'}}>
      {'Med'}
    </Text>
    )
}
function High(){
  return(
    <Text style = {{color: 'red'}}>
      {'High'}
    </Text>
    )
}

// called when the client connects
function onConnect() {
  console.log("onConnect");
  client.subscribe("World");
  message = new Paho.Message("1.05_3.50_4.50_21.648377_106.037733");
  message.destinationName = "World";
  client.send(message);
}
export default function Home({ navigation }) {
    const pressHandler = () => {
        //navigation.navigate('ReviewDetails');
        navigation.push('Map');
    }
    const [value, setValue] = useState({
      pm25: 0,
      mq7: 1,
      gas: 2,
    });

    const [sum, setSum] = useState(0);
    const [SumTestLow, setSumLow] = useState(null);
    const [SumTestMed, setSumMed] = useState(null);
    const [SumTestHigh, setSumHigh] = useState(null);
    
    client.onMessageArrived = onMessageArrived;

    function onMessageArrived(message) { 

      console.log("Message received:"+message.payloadString);
      // setName(message.payloadString);
      
      const messageText = message.payloadString;
      const messageArr = messageText.split("_");
      setValue({
        pm25: parseFloat(messageArr[0]),
        mq7: parseFloat(messageArr[1]),
        gas: parseFloat(messageArr[2]),
      });
      // setSum(messageArr[0]+messageArr[1]+messageArr[2]);
      // console.log (sum);
      
      console.log("pm2.5:"+value.pm25+" mq7:"+value.mq7+ " gas:"+value.gas+" latitude:"+messageArr[3]+" long:"+messageArr[4]);
      // Calculate();
    }
    function Calculate(){
      
      setSum(value.pm25 + value.mq7 + value.gas);
      
          if(sum<10){
            setSumLow(123);
            setSumMed('');
            setSumHigh('');
          }
          else if(sum>=10 && sum <= 15){
            setSumMed(123);
            setSumLow('');
            setSumHigh('');
          }
          else {
            setSumHigh(123);
            setSumLow('');
            setSumMed('');
          }
          
          return(
            <Text>
              {sum}
            </Text>
          )
    }
    return (
      <View style={globalStyles.container}>
        <Text style={globalStyles.titleText}>Mức cảnh báo:  </Text>
        {SumTestLow && <Low/>}
        {SumTestMed && <Med/>}
        {SumTestHigh && <High/>}
        <Calculate/>
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
