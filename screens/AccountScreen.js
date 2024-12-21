import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles';

const AccountScreen = ({ navigation }) => {
  const [accountName, setAccountName] = useState('');
  const [accountDescription, setAccountDescription] = useState('');

  useEffect(() => {
    const loadAccountData = async () => {
      const storedAccountName = await AsyncStorage.getItem('accountName');
      const storedAccountDescription = await AsyncStorage.getItem(
        'accountDescription'
      );

      if (storedAccountName) {
        setAccountName(storedAccountName);
      }
      if (storedAccountDescription) {
        setAccountDescription(storedAccountDescription);
      }
    };

    loadAccountData();
  }, []);

  const handleSave = async () => {
    try {
      await AsyncStorage.setItem('accountName', accountName);
      await AsyncStorage.setItem('accountDescription', accountDescription);
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error saving account data:', error);
      // Handle error, possibly show an alert to the user
    }
  };

  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Edit Account</Text>
        <TextInput
          style={styles.input}
          placeholder="Account Name"
          value={accountName}
          onChangeText={setAccountName}
        />
        <TextInput
          style={styles.input}
          placeholder="Account Description"
          value={accountDescription}
          onChangeText={setAccountDescription}
        />
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AccountScreen;