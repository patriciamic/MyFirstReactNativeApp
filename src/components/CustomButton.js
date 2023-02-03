import { Pressable, Text, StyleSheet, View } from "react-native";

/** Custom button component for displaying a button that can be styled.
 * @param props - the properties that can be assign to this component.
 * 
 * buttonStyle - the style applied on the button area
 * 
 * textStyle - the style applied on the text area
 * 
 * title - the text displayed on the button 
 */
function CustomButton(props) {

    function onPressHandler() {
        props.onPress(props.onPressData)
    }
    return (
        <View style={styles.container}>
            <Pressable
                style={
                    ({ pressed }) => [
                        { backgroundColor: pressed ? "#D8BFD8" : "white" },
                        props.buttonStyle ? props.buttonStyle : styles.defaultButton,
                    ]
                }
                onPress={onPressHandler}>
                <Text
                    style={props.textStyle ? props.textStyle : styles.defaultText}>
                    {props.title}
                </Text>
            </Pressable>
        </View>
    )
}

export default CustomButton

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 8
    },
    defaultButton: {
        width: "100%",
        borderWidth: 1,
        paddingVertical: 12,
        borderRadius: 8
    },
    defaultText: {
        color: "blue",
        textAlign: "center",
        fontSize: 18
    }
})