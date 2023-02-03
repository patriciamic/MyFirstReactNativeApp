import { FlatList, StyleSheet, View, Text, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import LinearGradient from 'react-native-linear-gradient';

import { useState } from 'react';
import GoalInput from '../../components/goal/GoalInput';
import GoalItem from '../../components/goal/GoalItem';
import GoalData from '../../data/GoalData';
import GoalItemAction from '../../components/goal/GoalItemAction';
import { GoalStorage } from '../../data/GoalStorage';

function GoalScreen({ route, navigation }) {
    const [goals, setGoals] = useState(getInitialGoals())
    const [isGoalInputVisible, setGoalInputVisibility] = useState(false)
    const [isGoalItemActionVisible, setGoalItemActionVisibility] = useState(false)
    const [goalItemSelected, setGoalItemSelected] = useState({})

    function getInitialGoals() {
        if (route.params == undefined) return [];

        return route.params.data
    }

    function addGoalHandler(enteredGoalText) {
        setGoals((currentGoals) => {
            const newList = [
                ...currentGoals,
                new GoalData(enteredGoalText, Math.random().toString())
            ]
            updateStorageList(newList).then(() => {
                console.log("GoalStorage: item added executed.")
            })
            return newList
        });

    }

    function startGoalInput() {
        setGoalInputVisibility(true)
    }

    function closeGoalInputHandler() {
        setGoalInputVisibility(false)
    }

    function markGoalItemAsDoneHandler(data) {
        setGoals((currentGoals) => {
            const newList = currentGoals.map((item) => {
                if (item.id == data.id) {
                    item.done = true
                }
                return item;
            })

            updateStorageList(newList).then(() => {
                console.log("GoalStorage: item updated executed.")
            })

            return newList;
        });

    }

    function deleteGoalItemHandler(data) {
        setGoals((currentGoals) => {
            const newList = currentGoals.filter((item) => {
                return item.id != data.id
            })
            updateStorageList(newList).then(() => {
                console.log("GoalStorage: item deleted executed.")
            })

            return newList;
        });
    }

    function closeGoalItemHandler() {
        setGoalItemActionVisibility(false)
    }

    function startGoalItemActions(data) {
        setGoalItemActionVisibility(true)
        setGoalItemSelected(data)
    }

    async function updateStorageList(data) {
        const removed = await GoalStorage.removeAll()
        console.log("Removed: " + removed)
        const stored = await GoalStorage.storeAll(data)
        console.log("Stored: " + stored.length)
        return stored;
    }

    function getGoalItemActionTitle() {
        return "What do you want to do with this goal:\n" + goalItemSelected.text + ' ?';
    }

    return (
        <>
            <StatusBar style='dark' />
            <View style={styles.appContainer}>
                <GoalInput visible={isGoalInputVisible} onAddGoal={addGoalHandler} onDismiss={closeGoalInputHandler} />
                <GoalItemAction
                    visible={isGoalItemActionVisible}
                    data={goalItemSelected}
                    title={getGoalItemActionTitle()}
                    onMarkAdDone={markGoalItemAsDoneHandler}
                    onDismiss={closeGoalItemHandler}
                    onDelete={deleteGoalItemHandler}
                />
                <View style={styles.goalsGontainer}>
                    <FlatList
                        data={goals}
                        renderItem={(itemData) => {
                            return <GoalItem data={itemData.item} onItemPressed={startGoalItemActions} />
                        }}
                        keyExtractor={(item, index) => {
                            return item.id
                        }}
                        contentContainerStyle={{ paddingBottom: 100 }}
                    />
                </View>

                <LinearGradient colors={['#ffffff00', '#ffffff00', '#808080']} style={styles.linearGradient}>
                    <Pressable onPress={startGoalInput} style={
                        ({ pressed }) => [
                            { backgroundColor: pressed ? '#9932CC' : '#5e0acc' },
                            styles.buttonAdd
                        ]}>
                        <Text style={styles.buttonAddText}>Add new goal</Text>
                    </Pressable>
                </LinearGradient>
            </View>
        </>
    )
}

export default GoalScreen

const styles = StyleSheet.create({
    appContainer: {
        flex: 1,
    },
    goalsGontainer: {
        flex: 5,
        paddingHorizontal: 16,
        paddingTop: 16
    },
    linearGradient: {
        flexDirection: 'row',
        paddingTop: 30,
        paddingHorizontal: 20,
        paddingBottom: 30,
        alignItems: 'center',
        position: 'absolute',
        left: 0,
        bottom: 0
    },
    buttonAdd: {
        width: '100%',
        padding: 16,
        borderRadius: 8,
    },
    buttonAddText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 16
    }
});
