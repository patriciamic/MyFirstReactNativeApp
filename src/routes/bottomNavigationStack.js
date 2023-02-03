import { bottomNavigationSampleStackDestinations } from './destinations';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FirstScreen from '../screens/bottomNavigation/FirstScreen';
import SecondScreen from '../screens/bottomNavigation/SecondScreen';
import ThirdScreen from '../screens/bottomNavigation/ThirdScreen';

const Tab = createBottomTabNavigator()

function BottomNavigationTabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen name={bottomNavigationSampleStackDestinations.First} component={FirstScreen} />
            <Tab.Screen name={bottomNavigationSampleStackDestinations.Second} component={SecondScreen} />
            <Tab.Screen name={bottomNavigationSampleStackDestinations.Third} component={ThirdScreen} />
        </Tab.Navigator>
    )
}

export default BottomNavigationTabs;