import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles';

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    try {
      const storedUsers = await AsyncStorage.getItem('users');
      const users = storedUsers ? JSON.parse(storedUsers) : [];

      if (users.some((u) => u.username === username)) {
        Alert.alert('Error', 'Username is already registered');
        return;
      }

      // Find the highest existing ID and increment it for the new user
      let newUserId = 400; // Start at 400
      if (users.length > 0) {
          const maxId = Math.max(...users.map(u => u.id));
          newUserId = maxId >= 400 ? maxId + 1 : 400;
      }

      const newUser = { id: newUserId, username, password };
      users.push(newUser);

      await AsyncStorage.setItem('users', JSON.stringify(users));

      Alert.alert('Success', 'Account registered successfully');
      navigation.goBack();
    } catch (error) {
      console.error('Error during registration:', error);
      Alert.alert('Error', 'An error occurred during registration');
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
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry={true}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.welButton}>
        <Text style={styles.welButtonText}>Already Have an Account?</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;