// import AsyncStorage from '@react-native-async-storage/async-storage';
import { AsyncStorage } from 'react-native';

const Storage = {
    store: async (key, value) => {
      try {
        if (value == null) {
          throw new Error('No value');
        }
        await AsyncStorage.setItem(key, JSON.stringify(value));
        return value;
      } catch (err) {
        Logger.error(err);
        return null;
      }
    },
  
    get: async (key) => {
      try {
        const value = await AsyncStorage.getItem(key);
        return JSON.parse(value);
      } catch (err) {
        Logger.error(err);
        return null;
      }
    },
  
    remove: async (key) => {
      try {
        await AsyncStorage.removeItem(key);
        return true;
      } catch (err) {
        Logger.error(err);
        return false;
      }
    },
  };
  
  export default Storage;