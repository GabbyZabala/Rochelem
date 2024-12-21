import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import AccountScreen from './screens/AccountScreen';
import NoteEditScreen from './screens/NoteEditScreen';

const Stack = createStackNavigator();

function App() {
  const [initialRouteName, setInitialRouteName] = useState(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        // Check if a user is already logged in (using a token or flag in AsyncStorage)
        const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');

        if (isLoggedIn === 'true') {
          setInitialRouteName('Home');
        } else {
          setInitialRouteName('Login');
        }
      } catch (error) {
        console.error('Error checking login status:', error);
        setInitialRouteName('Login'); // Default to Login on error
      }
    };

    checkLoginStatus();
  }, []);

  // Show a loading screen or indicator while checking login status
  if (initialRouteName === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialRouteName}
        screenOptions={{
          headerStyle: { backgroundColor: '#282c34' },
          headerTintColor: 'white',
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Dicty Notes' }}
        />
        <Stack.Screen name="Account" component={AccountScreen} />
        <Stack.Screen
          name="NoteEdit"
          component={NoteEditScreen}
          options={{ title: 'Edit Note' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;