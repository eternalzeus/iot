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
// import styles from "../App.components.style";

const gates = [
    {
        code: "gate_1",
        name: "Cổng Parabol",
        icon: require(`./../assets/gate_1.jpeg`),
    },
    {
        code: "gate_2",
        name: "Cổng Đại Cồ Việt",
        icon: require(`./../assets/gate_2.jpeg`),
    },
    {
        code: "gate_3",
        name: "Cổng Trần Đại Nghĩa",
        icon: require(`./../assets/gate_3.jpeg`),
    },
    {
        code: "gate_4",
        name: "Cổng dẫn vào khu Kí túc xá",
        icon: require(`./../assets/gate_4.jpeg`),
    },
];

export default function home({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.body}>
                <Text style={styles.header}>
                    {" "}
                    Mật độ giao thông tại các điểm{" "}
                </Text>
                <View style={styles.items}>
                    {gates.map((item) => {
                        return (
                            <Task
                                navigation={navigation}
                                data={item}
                                key={item.code}
                            />
                        );
                    })}
                    {/* <Task></Task>
                    <Task></Task>
                    <Task></Task>
                    <Task></Task> */}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#eff7f8",
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    congTranDaiNghia: {},
    congParabol: {},
    body: {
        flex: 1,
        paddingTop: 70,
        paddingHorizontal: 18,
    },
    header: {
        fontSize: 24,
        color: "#21a3d0",
        fontWeight: "bold",
    },
    items: {
        marginTop: 25,
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-around",
        // justifyContent: "space-around",
    },
    item: {
        height: "100%",
    },
});
