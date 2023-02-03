import { StyleSheet, View, Text, Button, Modal } from "react-native"
import CustomButton from "../CustomButton"

function GoalItemAction(props) {

    const defaultTitle = "Select an action"
    function onDelete() {
        props.onDelete(props.data)
        props.onDismiss()
    }

    function onMarkAdDone() {
        props.onMarkAdDone(props.data)
        props.onDismiss()
    }

    return (
        <Modal visible={props.visible} transparent={true} onRequestClose={() => props.onDismiss()}>
            <View style={{ backgroundColor: "#00000066", flex: 1 }}>
                <View style={styles.container}>
                    <Text style={{ fontSize: 21, textAlign: 'center', marginHorizontal:16 }}>{props.title? props.title : defaultTitle}</Text>
                    <View style={styles.buttonsContaines}>
                        {!props.data.done ? <CustomButton title='Mark as Done' onPress={onMarkAdDone} /> : ""}
                        <CustomButton title="Delete" onPress={onDelete} />
                        <CustomButton title="Cancel" onPress={props.onDismiss} />
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default GoalItemAction;

const styles = StyleSheet.create({
    container: {
        width: "100%",
        paddingVertical: 20,
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: "#fff",
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        borderRadius: 16
    },
    buttonsContaines: {
        flex: 1,
        justifyContent: "space-between",
        padding: 20,
        width: "80%",
        marginTop: 16
    },
    buttonStyle: {
        marginVertical: 16,
        backgroundColor: "#800080",
        borderRadius: 8
    }
})