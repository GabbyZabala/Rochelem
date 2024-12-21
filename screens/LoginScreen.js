import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const storedUsers = await AsyncStorage.getItem('users');
      const users = storedUsers ? JSON.parse(storedUsers) : [];

      const user = users.find(
        (u) => u.username === username && u.password === password
      );

      if (user) {
        // Store the logged-in user's ID
        await AsyncStorage.multiSet([
          ['isLoggedIn', 'true'],
          ['loggedInUserId', user.id.toString()], // Store user ID as a string
        ]);
        navigation.navigate('Home');
      } else {
        Alert.alert('Error', 'Invalid username or password');
      }
    } catch (error) {
      console.error('Error during login:', error);
      Alert.alert('Error', 'An error occurred during login');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dicty Notes</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.welButton}
        onPress={() => navigation.navigate('Register')}
      >
        <Text style={styles.welButtonText}>Register an Account</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;