import { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Switch, Image } from 'react-native'

function GoalItem(props) {

    const checkIcon = require('../../assets/images/check.png');

    return (
        <Pressable onPress={props.onItemPressed.bind(this, props.data)} style={
                [
                    { backgroundColor: props.data.done ? "#D8BFD8" : "#a065ec" },
                    styles.goalItem
                ]}>
                <Text style={
                    [
                        { color: props.data.done ? "#000" : "#fff" },
                        styles.goalItemText
                    ]}
                >{
                props.data.done ? props.data.text : 'NEXT: ' + props.data.text}</Text>
                {props.data.done && <Image source={checkIcon} style={styles.image} />}
        </Pressable>
    );
}

export default GoalItem;

const styles = StyleSheet.create({
    goalItem: {
        margin: 4,
        padding: 16,
        borderRadius: 6,
        justifyContent: 'space-between',
        alignItems:'flex-end',
        flexDirection: 'row'
    },
    goalItemText: {
        width: '85%'
    },
    image: {
        width: 24,
        height: 24
    }
})