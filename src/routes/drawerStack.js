import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { homeStackDestinations, tvTrackerStackDestinations } from './destinations';
import { Image } from 'react-native';
import TvScreen from "../screens/tvTracker/TvScreen";
import TvType from "../screens/tvTracker/TvType";
import HomeScreen from '../screens/home/HomeScreen'
import GoalScreen from '../screens/goal/GoalScreen';
import CustomDrawer from '../components/CustomDrawer';

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
            drawerContent={props => <CustomDrawer {...props} />}
        >
            <Drawer.Screen
                name={homeStackDestinations.Home}
                component={HomeScreen}
                options={
                    {
                        drawerInactiveTintColor: color.inactive,
                        drawerActiveTintColor: color.active,
                        drawerIcon: ({ color }) => (
                            <Image
                                source={require('../assets/images/tvTracker/ic_tv_tracker_home.png')}
                                style={{ width: 22, height: 22, tintColor: color }}
                            />
                        )
                    }
                }
            />
            <Drawer.Screen
                name={homeStackDestinations.Goal}
                component={GoalScreen}
                options={
                    {
                        drawerInactiveTintColor: color.inactive,
                        drawerActiveTintColor: color.active,
                        drawerIcon: ({ color }) => (
                            <Image
                                source={require('../assets/images/ic_goals.png')}
                                style={{ width: 22, height: 22, tintColor: color }}
                            />
                        )
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
                        drawerActiveTintColor: color.active,
                        drawerIcon: ({ color }) => (
                            <Image
                                source={require('../assets/images/tvTracker/ic_tv_tracker_favorite.png')}
                                style={{ width: 22, height: 22, tintColor: color }}
                            />
                        )
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
        </Drawer.Navigator>
    )
}

export default DrawerStack