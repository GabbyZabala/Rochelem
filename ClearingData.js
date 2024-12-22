import React, { useEffect } from 'react';
import { View, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  useEffect(() => {
    // Optional: You can log current AsyncStorage data for debugging on start
    // showAsyncStorageContent();
  }, []);

  const clearAsyncStorage = async () => {
    try {
      await AsyncStorage.clear();
      Alert.alert('Success', 'AsyncStorage data cleared!');
    } catch (error) {
      Alert.alert('Error', 'Failed to clear AsyncStorage data.');
      console.error('Error clearing AsyncStorage:', error);
    }
  };

  const showAsyncStorageContent = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const items = await AsyncStorage.multiGet(keys);

      console.log('AsyncStorage Contents:');
      items.forEach(([key, value]) => {
        console.log(key, value);
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to read AsyncStorage data.');
      console.error('Error reading AsyncStorage:', error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Clear AsyncStorage" onPress={clearAsyncStorage} />
      <Button title="Show AsyncStorage Content" onPress={showAsyncStorageContent} />
    </View>
  );
};

export default App;