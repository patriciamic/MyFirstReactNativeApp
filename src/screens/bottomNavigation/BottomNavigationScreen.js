import { NavigationContainer } from "@react-navigation/native";
import BottomNavigationTabs from "../../routes/bottomNavigationStack";

function BottomNavigationScreen() {
    return (
        <NavigationContainer independent={true}>
            <BottomNavigationTabs />
        </NavigationContainer>
    )
}

export default BottomNavigationScreen;