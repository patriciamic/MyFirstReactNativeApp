const { View, StyleSheet, Text, FlatList, Modal } = require("react-native");
import CustomButton from '../components/CustomButton'

export class CustomAction {
    constructor(id, action) {
        this.id = id;
        this.action = action;
    }
}

export function CustomActionsPopup(props) {

    const defaultTitle = "Select an action"

    function onItemPressed(item) {
        props.onItemPressed(item)
    }

    return (
        <Modal
            visible={props.visible}
            transparent={true}
            onRequestClose={() => props.onDismiss()}
            animationType="slide">
            <View style={{ backgroundColor: "#00000066", flex: 1 }}>
                <View style={styles.container}>
                    <Text style={styles.title}>{props.title ? props.title : defaultTitle}</Text>
                    <View style={styles.buttonsContaines}>
                        <FlatList
                            data={props.items}
                            renderItem={({ item }) =>
                                <CustomButton
                                    title={item.action}
                                    onPress={onItemPressed}
                                    onPressData={item}
                                    textStyle={styles.buttonText}
                                    buttonStyle={styles.button} />
                            }
                            keyExtractor={(item, index) => item.id}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        paddingVertical: 20,
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: "#28282B",
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        borderRadius: 16
    },
    title: {
        fontSize: 21,
        textAlign: 'center',
        marginHorizontal: 16,
        color: '#f5f5f5'
    },
    buttonsContaines: {
        flex: 1,
        justifyContent: "space-between",
        padding: 20,
        width: "80%",
        marginTop: 16,
    },
    buttonText: {
        textAlign: "center",
        fontSize: 18,
        color: '#f5f5f5'
    },
    button: {
        width: "100%",
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#28282B',
        paddingVertical: 12,
        borderRadius: 8
    }
})