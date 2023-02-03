import { StyleSheet, View, TextInput, Text, Button, Modal, Image } from 'react-native'
import { useState } from 'react';

function GoalInput(props) {
    const [enteredGoalText, setEnteredGoalText] = useState({ text: '', id: 0 })
    const [isErrorVisible, setErrorVisibility] = useState(false)

    function goalInputHandler(enteredText) {
        setEnteredGoalText(enteredText)

        if (enteredText.length == 0) {
            setErrorVisibility(false)
            return;
        }

        if (enteredText.trim().length == 0) {
            setErrorVisibility(true)
            return;
        }

        setErrorVisibility(false)
    }

    function addGoalHandler() {
        if (isErrorVisible == true) return;
        if (enteredGoalText.text == undefined) return;
        if (enteredGoalText.text.trim().length == 0) return;

        props.onAddGoal(enteredGoalText)
        setEnteredGoalText('')
        props.onDismiss()
    }

    return (
        <Modal visible={props.visible} animationType="slide">
            <View style={styles.inputContainer}>
                <Image source={require('../../assets/favicon.png')} style={styles.image} />
                <TextInput
                    style={styles.textInput}
                    placeholder='Enter your text here..'
                    onChangeText={goalInputHandler}
                    value={enteredGoalText} />
                {isErrorVisible ? <Text style={styles.error}>Invalid Goal!</Text> : ''}
                <View style={styles.buttonsContaines}>
                    <Button title='Cancel' onPress={props.onDismiss} color='#f31282' />
                    <Button title='Add Goal' onPress={addGoalHandler} color='#b180f0' />
                </View>
            </View>
        </Modal>
    )
}

export default GoalInput;

const styles = StyleSheet.create({
    inputContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#311b6b'
    },
    buttonsContaines: {
        marginTop: 16,
        flexDirection: "row",
        width: '60%',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#e4d0ff',
        backgroundColor: '#e4d0ff',
        borderRadius: 6,
        color: '#120438',
        width: '70%',
        padding: 16,
        marginEnd: 8
    },
    imageContainer: {
        flex: 0.5,
        backgroundColor: 'blue'
    },
    image: {
        width: 100,
        height: 100,
        marginBottom: 50,
        borderRadius: 16
    },
    error: {
        color: 'red'
    }
})