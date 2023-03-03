import { useState, useCallback } from "react";
import { StatusBar } from 'expo-status-bar';
import { View, Text, FlatList, Image, StyleSheet, Pressable, ToastAndroid } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import { tvTrackerStackDestinations } from "../../routes/destinations";
import TvType from "./TvType";
import { useFocusEffect } from "@react-navigation/native";
import { CustomActionsPopup, CustomAction } from "../../components/CustomActionsPopup";
import { useDispatch, useSelector } from "react-redux";
import { fetchTvList } from "../../redux/tvTracker/actions";
import { buildImageUrl } from "../../data/tvTracker/TvRepository";

const Action = {
    VIEW_DETAILS: "View Details",
    ADD_TO_FAVORITES: "Add to Favorites",
    REMOVE_FROM_FAVORITES: "Remove from Favorites",
    CANCEL: "Cancel"
}

const favoritesPopupActions = [
    new CustomAction(1, Action.VIEW_DETAILS),
    new CustomAction(2, Action.REMOVE_FROM_FAVORITES),
    new CustomAction(3, Action.CANCEL)
]

function TvScreen({ route, navigation }) {

    const tvItems = useSelector(state => state.tvReducer)
    const dispatch = useDispatch()

    useFocusEffect(
        useCallback(() => {
            // The screen is focused
            console.log("The " + route.params.tvType + " screen is focused")
            dispatch(fetchTvList(route.params.tvType))
            return () => {
                // The screen is unfocused
                console.log("The " + route.params.tvType + " screen is unfocused")
            }
        }, [])
    )

    function goBack() {
        navigation.goBack()
    }

    return (
        <>
            <StatusBar style='light' />
            <View style={styles.container}>
                <FlatList
                    data={tvItems.data}
                    renderItem={({ item }) =>
                        <TvItem
                            title={item.title}
                            imageName={item.backdropImageName}
                            id={item.id}
                            data={item} />}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={{ paddingBottom: route.params.hideBack? 16: 100, paddingTop: route.params.hideBack? 16: 100 }}
                />
                {route.params.hideBack ?
                    '' : <Pressable style={styles.topNavigationContainer} onPress={goBack}>
                        <Image style={styles.backImage} source={require('../../assets/images/ic_back.png')} />
                    </Pressable>
                }
            </View>
        </>
    )

    function TvItem(props) {
        const [isActionPopupVisible, setActionPopupVisibility] = useState(false)

        const image = props.imageName != null ?
            buildImageUrl(props.imageName) :
            require('../../assets/images/ic_image.png');

        function onTvItemPressedHandler() {
            if (route.params.tvType == TvType.FAVORITES) {
                showActionPopup()
                return;
            }

            navigation.navigate(tvTrackerStackDestinations.Details, { id: props.id });
        }

        function formatDate(dateString) {
            return new Date(dateString)
                .toLocaleDateString("en-US")
        }

        function dismissActionPopup() {
            setActionPopupVisibility(false)
        }

        function showActionPopup() {
            setActionPopupVisibility(true)
        }

        function onPopupItemPressed(customAction) {
            dismissActionPopup()

            switch (customAction.action) {
                case Action.VIEW_DETAILS:
                    navigation.navigate(tvTrackerStackDestinations.Details, { id: props.id });
                    break;
                case Action.ADD_TO_FAVORITES:
                    ToastAndroid.show("Added to favorites", ToastAndroid.SHORT)
                    break;
                case Action.REMOVE_FROM_FAVORITES:
                    // repository.removeFromFavorites(props.id).then(() => {
                    //     getData(route.params.tvType)
                    // })
                    break;
                case Action.CANCEL: break;
            }
        }

        return (
            <View style={styles.itemContainer}>
                <Pressable onPress={onTvItemPressedHandler}>
                    {props.imageName != null ?
                        <Image source={{ uri: image }} style={styles.image} resizeMode='contain' /> :
                        <Image source={image} style={[styles.image, styles.defaultImage]} resizeMode='cover' />
                    }
                    <LinearGradient colors={['#ffffff00', '#ffffff00', '#000000']} style={styles.linearGradient} />
                    <Text
                        style={
                            route.params.tvType != TvType.FAVORITES ?
                                styles.text :
                                [styles.text, styles.favoriteText]
                        }>
                        {props.title}
                    </Text>
                    {route.params.tvType == TvType.FAVORITES ?
                        <Text style={styles.favoriteDateTime}>{formatDate(props.data.dateTimeAddedToFavorites)}</Text> :
                        ""}
                </Pressable>
                <CustomActionsPopup
                    visible={isActionPopupVisible}
                    items={favoritesPopupActions}
                    onDismiss={dismissActionPopup}
                    onItemPressed={onPopupItemPressed}
                />
            </View>
        )
    }
}

export default TvScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#28282B",
        paddingHorizontal: 16
    },
    itemContainer: {
        marginVertical: 8,
        borderColor: "#D3D3D3",
        shadowColor: "#000",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 6,
        alignItems: "center",
    },
    image: {
        width: "100%",
        aspectRatio: 1.8,
        borderRadius: 8
    },
    defaultImage: {
        tintColor: "#D8BFD8",
        maxHeight: 210
    },
    text: {
        color: "#fff",
        fontSize: 18,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        textAlign: 'center',
        paddingHorizontal: 16,
        paddingBottom: 20
    },
    linearGradient: {
        height: "100%",
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0
    },
    favoriteText: {
        bottom: 8
    },
    favoriteDateTime: {
        position: 'absolute',
        bottom: 8,
        textAlign: 'center',
        left: 0,
        right: 0,
        fontSize: 12,
        color: '#fff'
    },
    topNavigationContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        marginTop: 60,
        marginStart: 16
    },
    backImage: {
        width: 24,
        height: 24,
        tintColor: '#fff'
    },
})