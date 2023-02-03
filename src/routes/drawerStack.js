import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { tvTrackerStackDestinations } from './destinations';
import TvScreen from "../screens/tvTracker/TvScreen";
import TvType from "../screens/tvTracker/TvType";
import { color } from 'react-native-reanimated';

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
                name={tvTrackerStackDestinations.TopRated}
                component={TvScreen}
                initialParams={{ tvType: TvType.TOP_RATED }}
                options = {
                    {
                        drawerInactiveTintColor: color.inactive,
                        drawerActiveTintColor: color.active
                    }
                }
            />
            <Drawer.Screen
                name={tvTrackerStackDestinations.Popular}
                component={TvScreen}
                initialParams={{ tvType: TvType.POPULAR }}
                options = {
                    {
                        drawerInactiveTintColor: color.inactive,
                        drawerActiveTintColor: color.active
                    }
                }
            />
            <Drawer.Screen
                name={tvTrackerStackDestinations.Favorites}
                component={TvScreen}
                initialParams={{ tvType: TvType.FAVORITES }}
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