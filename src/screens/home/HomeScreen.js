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

    function goToBottomNavigationSample() {
        navigation.navigate(homeStackDestinations.BottomNavigation)
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
        <StatusBar style='dark' />
        <View style={styles.container}>
            <Text style={styles.text}>Welcome to my first React Native App!</Text>
            <Pressable onPress={goToGoals}>
                <Text style={styles.pressableText}>See your goals</Text>
            </Pressable>
            <Pressable onPress={goToBottomNavigationSample}>
                <Text style={styles.pressableText}>Go to Bottom Navigation Sample</Text>
            </Pressable>
            <Pressable onPress={goToTvTracker}>
                <Text style={styles.pressableText}>Go to Tv Tracker</Text>
            </Pressable>
            <Pressable onPress={gotToTvTrackerFavorites}>
                <Text style={styles.pressableText}>Go to Tv Tracker Favorites</Text>
            </Pressable>
        </View>
    </>)
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 16
    },
    text: {
        margin: 30,
        fontSize: 32,
        textAlign: "center",
    },
    pressableText: {
        color: 'blue',
        fontSize: 18,
        padding: 8
    }
})