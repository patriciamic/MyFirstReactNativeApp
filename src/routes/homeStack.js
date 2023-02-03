import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { homeStackDestinations, tvTrackerStackDestinations } from './destinations';
import HomeScreen from '../screens/home/HomeScreen'
import GoalScreen from '../screens/goal/GoalScreen';
import BottomNavigationScreen from '../screens/bottomNavigation/BottomNavigationScreen'
import TvDetailsScreen from '../screens/tvTracker/TvDetailsScreen';
import TvTrackerStack from "../routes/tvTrackerStack";


const Stack = createNativeStackNavigator();

function HomeStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name={homeStackDestinations.Home} component={HomeScreen} />
            <Stack.Screen name={homeStackDestinations.Goal} component={GoalScreen} />
            <Stack.Screen
                name={homeStackDestinations.BottomNavigation}
                component={BottomNavigationScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name={homeStackDestinations.TvTracker}
                component={TvTrackerStack}
                options={{ headerShown: false }}
            />
            <Stack.Screen
             name={tvTrackerStackDestinations.Details}
              component={TvDetailsScreen} 
              options={{ headerShown: false }}/>
        </Stack.Navigator>
    )
}

export default HomeStack;