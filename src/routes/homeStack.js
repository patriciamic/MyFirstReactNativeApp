import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { homeStackDestinations, tvTrackerStackDestinations } from './destinations';
import GoalScreen from '../screens/goal/GoalScreen';
import TvDetailsScreen from '../screens/tvTracker/TvDetailsScreen';
import TvTrackerStack from "../routes/tvTrackerStack";
import DrawerStack from './drawerStack';

const Stack = createNativeStackNavigator();

function HomeStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={homeStackDestinations.Drawer}
                component={DrawerStack}
                options={{ headerShown: false }} />
            <Stack.Screen name={homeStackDestinations.Goal} component={GoalScreen} />
            <Stack.Screen
                name={homeStackDestinations.TvTracker}
                component={TvTrackerStack}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name={tvTrackerStackDestinations.Details}
                component={TvDetailsScreen}
                options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

export default HomeStack;