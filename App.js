import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import NoteEditScreen from './screens/NoteEditScreen';
import AccountScreen from './screens/AccountScreen'; // Import AccountScreen

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={'Login'}
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
        <Stack.Screen
          name="NoteEdit"
          component={NoteEditScreen}
          options={{ title: 'Edit Note' }}
        />
        <Stack.Screen name="Account" component={AccountScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;