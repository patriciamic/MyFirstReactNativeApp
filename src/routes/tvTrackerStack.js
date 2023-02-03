import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { tvTrackerStackDestinations } from "./destinations";
import TvScreen from "../screens/tvTracker/TvScreen";
import TvType from "../screens/tvTracker/TvType";
import { Image } from "react-native";

const TvTabStack = createBottomTabNavigator();

function TvTrackerStack() {

    const color = {
        active: "#DDA0DD",
        inactive: '#808080'
    }

    function getTopRatedIcon(focused) {
        return <Image
            source={require('../assets/images/tvTracker/ic_tv_tracker_home.png')}
            resizeMode='contain'
            style={{
                width: 24,
                height: 24,
                tintColor: focused ? color.active : color.inactive
            }}
        />
    }

    function getPopularIcon(focused) {
        return <Image
            source={require('../assets/images/tvTracker/ic_tv_tracker_popular.png')}
            resizeMode='contain'
            style={{
                width: 24,
                height: 24,
                tintColor: focused ? color.active : color.inactive
            }}
        />
    }

    function getFavoriesIcon(focused) {
        return <Image
            source={require('../assets/images/tvTracker/ic_tv_tracker_favorite.png')}
            resizeMode='contain'
            style={{
                width: 24,
                height: 24,
                tintColor: focused ? color.active : color.inactive
            }}
        />
    }

    return (
        <TvTabStack.Navigator
            screenOptions={
                {
                    tabBarStyle: {
                        height: 65,
                        borderRadius: 16,
                        paddingBottom: 12,
                        paddingTop: 8,
                        marginHorizontal: 40,
                        backgroundColor: '#28282B',
                        marginBottom: 16,
                        borderTopColor: "#28282B",
                        position: 'absolute',
                        bottom: 0,
                        left: 0
                    }
                }
            }>
            <TvTabStack.Screen
                name={tvTrackerStackDestinations.TopRated}
                component={TvScreen}
                initialParams={{ tvType: TvType.TOP_RATED }}
                options={
                    {
                        headerShown: false,
                        tabBarActiveTintColor: color.active,
                        tabBarInactiveTintColor: color.inactive,
                        tabBarIcon: ({ focused }) => getTopRatedIcon(focused)
                    }
                }
            />
            <TvTabStack.Screen
                name={tvTrackerStackDestinations.Popular}
                component={TvScreen}
                initialParams={{ tvType: TvType.POPULAR }}
                options={
                    {
                        headerShown: false,
                        tabBarActiveTintColor: color.active,
                        tabBarInactiveTintColor: color.inactive,
                        tabBarIcon: ({ focused }) => getPopularIcon(focused)
                    }
                } />
            <TvTabStack.Screen
                name={tvTrackerStackDestinations.Favorites}
                component={TvScreen}
                initialParams={{ tvType: TvType.FAVORITES }}
                options={
                    {
                        headerShown: false,
                        tabBarActiveTintColor: color.active,
                        tabBarInactiveTintColor: color.inactive,
                        tabBarIcon: ({ focused }) => getFavoriesIcon(focused)
                    }} />
        </TvTabStack.Navigator >
    )
}

export default TvTrackerStack;
