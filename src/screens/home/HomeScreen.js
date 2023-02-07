import { StyleSheet, View, Text, Pressable } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { homeStackDestinations, tvTrackerStackDestinations } from "../../routes/destinations";
import { GoalStorage, defaultGoalData } from "../../data/GoalStorage";

function HomeScreen({ navigation }) {

    function goToGoals() {
        createDefaultGoalItems().then((result) => {
            navigation.navigate(homeStackDestinations.Goal, { data: result })
        })
    }

    function goToTvTracker() {
        navigation.navigate(homeStackDestinations.TvTracker)
    }

    function gotToTvTrackerFavorites() {
        navigation.navigate(
            homeStackDestinations.TvTracker,
            { screen: tvTrackerStackDestinations.Favorites }
        )
    }

    async function createDefaultGoalItems() {
        const items = await GoalStorage.getAll()
        if (items != null) {
            console.log("Getting GoalData from local storage: " + items.length + " items");
            return items;
        }

        const data = defaultGoalData
        await GoalStorage.storeAll(data)
        return data;
    }

    return (<>
        <StatusBar style='light' />
        <View style={styles.container}>
            <Text style={styles.text}>Welcome to my first React Native App!</Text>
            <View style={[
                styles.container,
                styles.contentContainer
            ]}>
                <HomeItem
                    style={styles.firstItem}
                    onPress={goToGoals}
                    text='Goals' 
                    textStyle={styles.pressableText}/>
                <View style={[
                    styles.rowContentContainer,
                ]}>
                    <HomeItem
                        style={[
                            styles.firstItem,
                            styles.secondItem
                        ]}
                        onPress={goToTvTracker}
                        text='Tv Tracker'
                        textStyle={styles.pressableText} />
                    <HomeItem style={[
                        styles.firstItem,
                        styles.secondItem,
                        styles.thirdItem
                    ]}
                        onPress={gotToTvTrackerFavorites}
                        text='Tv Tracker Favorites'
                        textStyle={[
                            styles.pressableText,
                            {
                                color: '#fff'
                            }
                        ]}
                    />
                </View>

            </View>
        </View>
    </>)


    function HomeItem(props) {
        return (
            <View style={props.style}>
                <Pressable onPress={props.onPress}>
                    <Text style={props.textStyle}>{props.text}</Text>
                </Pressable>
            </View>
        )
    }
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#28282B',
    },
    contentContainer: {
        alignContent: 'center'
    },
    text: {
        margin: 30,
        fontSize: 32,
        textAlign: "center",
        color: 'white',

    },
    pressableText: {
        color: '#03001C',
        fontSize: 21,
        padding: 8,
        textAlign: 'center'
    },
    firstItem: {
        backgroundColor: '#E8D2A6',
        width: '95%',
        height: '30%',
        marginTop: 8,
        borderRadius: 8,
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
        justifyContent: 'center'
    },
    secondItem: {
        backgroundColor: '#F48484',
        width: '46%',
    },
    thirdItem: {
        backgroundColor: '#F55050',
        marginStart: 8
    },
    rowContentContainer: {
        flexDirection: 'row',
        width: '100%',
        height: '100%'
    }
})