import { ImageBackground, Text, View, StyleSheet, Image, Pressable } from "react-native"
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { useCallback } from "react";
import { Alert, Linking } from "react-native";

const CustomDrawer = (props) => {

    const url = 'https://reactnavigation.org/docs/drawer-navigator/';

    const handleOpenUrl = useCallback(async () => {

            const supported = await Linking.canOpenURL(url);

            if (supported) {
                await Linking.openURL(url);
            } else {
                Alert.alert(`Don't know how to open this URL: ${url}`);
            }
        }, [url]);

    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
                <ImageBackground
                    source={require('../assets/images/drawer-header-bg.jpeg')}
                    style={styles.header}>
                    <Image
                        source={require('../assets/images/tv-logo.jpeg')}
                        style={styles.headerLogo} />
                    <Text style={styles.headerText}>My First React Native App</Text>
                </ImageBackground>
                <DrawerItemList {...props} />
            </DrawerContentScrollView>
            <View style={styles.footer}>
                <Pressable onPress={handleOpenUrl}>
                    <Text style={styles.footerText}>Learn more about the Drawer..</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default CustomDrawer;

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: 16,
        paddingTop: 80,
        paddingBottom: 20,
        marginBottom: 16,
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerLogo: {
        width: 60,
        height: 60,
        borderRadius: 40
    },
    headerText: {
        color: '#fff',
        marginHorizontal: 8,
        flex: 1,
        fontSize: 16
    },
    footer: {
        borderColor: '#cccccc80',
        borderTopWidth: 1,
        padding: 16,
        marginBottom: 50
    },
    footerText: {
        color: '#7EC8E3'
    }
})