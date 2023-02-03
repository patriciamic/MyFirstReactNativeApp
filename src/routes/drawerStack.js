import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { tvTrackerStackDestinations } from './destinations';
import TvScreen from "../screens/tvTracker/TvScreen";
import TvType from "../screens/tvTracker/TvType";

const Drawer = createDrawerNavigator();

function DrawerStack() {
    return (
        <Drawer.Navigator>
            <Drawer.Screen
                name={tvTrackerStackDestinations.TopRated}
                component={TvScreen}
                initialParams={{ tvType: TvType.TOP_RATED }}
            />
            <Drawer.Screen
                name={tvTrackerStackDestinations.Popular}
                component={TvScreen}
                initialParams={{ tvType: TvType.POPULAR }}
            />
            <Drawer.Screen
                name={tvTrackerStackDestinations.Favorites}
                component={TvScreen}
                initialParams={{ tvType: TvType.FAVORITES }}
            />
        </Drawer.Navigator>
    )
}

export default DrawerStack