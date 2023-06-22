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
    Dimensions
} from "react-native";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import Task from "../components/Task";
import { globalStyles } from '../styles/global';
// import styles from "../App.components.style";
var message="yes"; 

client = new Paho.Client(
  "broker.hivemq.com",
  Number(8000),
  `mqtt-async-test-${parseInt(Math.random() * 100)}`
);

// connect the client
client.connect({onSuccess:onConnect});

// called when the client connects
function onConnect() {
  console.log("onConnect");
  client.subscribe("nahm");
  message = new Paho.Message("1.05_3.50_4.50_21.648377_106.037733");
  message.destinationName = "nahm";
  client.send(message);
}
export default function Home({ navigation }) {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    
  }, []);
    const pressHandler = () => {
        navigation.push('Map');
    }
    const [value, setValue] = useState({
      pm25: 0,
      mq7: 1,
      gas: 2,
    });

    const [chart, setChart] = useState({
      one: 0,
      two: 1,
      three: 2,
      time_one: '10:10',
      time_two: '10:12',
      time_three: '10:13'
    });
    
    client.onMessageArrived = onMessageArrived;

    function onMessageArrived(message) { 

      console.log("Message received:"+message.payloadString);      
      const messageText = message.payloadString;
      const messageArr = messageText.split("_");
      setValue({
        pm25: parseFloat(messageArr[0]),
        mq7: parseFloat(messageArr[1]),
        gas: parseFloat(messageArr[2]),
      });
      var hours = new Date().getHours(); //Current Hours
      var min = new Date().getMinutes(); //Current Minutes
      var sec = new Date().getSeconds(); //Current Seconds
      setCurrentDate(
        hours + ':' + min + ':' + sec
      );
      setChart({
        one: chart.two,
        two: chart.three,
        three: parseFloat((messageArr[0]))+parseFloat(messageArr[1])+parseFloat(messageArr[2]),
        time_one: chart.time_two,
        time_two: chart.time_three,
        time_three: currentDate
      });
      
      console.log("pm2.5:"+messageArr[0]+" mq7:"+messageArr[1]+ " gas:"+messageArr[2]+" latitude:"+messageArr[3]+" long:"+messageArr[4]);
    }
    function Calculate(){
      if(chart.three<10){
        return(
          <Text>1</Text>
        )
      }
      else if(chart.three>=10 && chart.three <= 20){
        return(
          <Text>2</Text>
        )
      }
      else {
        return(
          <Text>3</Text>
        )
      }
    }
    return (  
      <View style={globalStyles.container}>
        <Text style={globalStyles.titleText}>Mức cảnh báo:  </Text>
        <Calculate/>
        {/* <Text>{currentDate}<  /Text> */}
        <Text style={globalStyles.titleText}>Chỉ số ô nhiễm: </Text>
        <Text>Pm2.5: {value.pm25}</Text>
        <Text>Mq7: {value.mq7}</Text>
        <Text>Gas: {value.gas}</Text>
        <Text>{value.pm25+value.mq7+value.gas}</Text>
        <Button title='Vị trí cảnh báo' onPress={pressHandler} 
        color="#015841"/>
        <LineChart
            data={{
              labels: [chart.time_one, chart.time_two, chart.time_three],
              datasets: [
                {
                  data: [
                    chart.one,
                    chart.two,
                    chart.three
                  ]
                }
              ]
            }}
            width={Dimensions.get("window").width} // from react-native
            height={220}
            yAxisLabel=""
            yAxisSuffix=""
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: "#800080",
              backgroundGradientFrom: "#800080",
              backgroundGradientTo: "#ffa726",
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#ffa726"
              }
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16
            }}
          />
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
