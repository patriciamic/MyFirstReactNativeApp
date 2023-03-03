import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import HomeStack from './routes/homeStack'
import store from './redux/store';

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <HomeStack />
      </NavigationContainer>
    </Provider>
  )
}
