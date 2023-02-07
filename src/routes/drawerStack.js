import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { homeStackDestinations, tvTrackerStackDestinations, drawerStackDestinations } from './destinations';
import TvScreen from "../screens/tvTracker/TvScreen";
import TvType from "../screens/tvTracker/TvType";
import HomeScreen from '../screens/home/HomeScreen'
import GoalScreen from '../screens/goal/GoalScreen';
import { color } from 'react-native-reanimated';
import MapScreen from '../screens/map/Map';

const Drawer = createDrawerNavigator();

function DrawerStack() {

    const color = {
        active: "#DDA0DD",
        inactive: '#ccc'
    }

    return (
        <Drawer.Navigator
            screenOptions={{
                drawerStyle: {
                    backgroundColor: '#28282B',
                    width: 250
                },
                headerStyle: {
                    backgroundColor: '#28282B',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                }
            }}
        >
            <Drawer.Screen
                name={homeStackDestinations.Home}
                component={HomeScreen}
                options={
                    {
                        drawerInactiveTintColor: color.inactive,
                        drawerActiveTintColor: color.active
                    }
                }
            />
            <Drawer.Screen
                name={homeStackDestinations.Goal}
                component={GoalScreen}
                options={
                    {
                        drawerInactiveTintColor: color.inactive,
                        drawerActiveTintColor: color.active
                    }
                }
            />
            <Drawer.Screen
                name={tvTrackerStackDestinations.TopRated}
                component={TvScreen}
                initialParams={{ tvType: TvType.TOP_RATED, hideBack: true }}
                options={
                    {
                        drawerInactiveTintColor: color.inactive,
                        drawerActiveTintColor: color.active
                    }
                }
            />
            <Drawer.Screen
                name={tvTrackerStackDestinations.Popular}
                component={TvScreen}
                initialParams={{ tvType: TvType.POPULAR, hideBack: true }}
                options={
                    {
                        drawerInactiveTintColor: color.inactive,
                        drawerActiveTintColor: color.active
                    }
                }
            />
            <Drawer.Screen
                name={tvTrackerStackDestinations.Favorites}
                component={TvScreen}
                initialParams={{ tvType: TvType.FAVORITES, hideBack: true }}
                options={
                    {
                        drawerInactiveTintColor: color.inactive,
                        drawerActiveTintColor: color.active
                    }
                }
            />
            <Drawer.Screen
                name={drawerStackDestinations.Map}
                component={MapScreen}
                options = {
                    {
                        drawerInactiveTintColor: color.inactive,
                        drawerActiveTintColor: color.active

                    }
                }
            />
        </Drawer.Navigator>
    )
}

export default DrawerStack