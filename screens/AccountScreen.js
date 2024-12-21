import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles';

const AccountScreen = ({ navigation }) => {
  const [accountName, setAccountName] = useState('');
  const [accountDescription, setAccountDescription] = useState('');

  useEffect(() => {
    const loadAccountData = async () => {
      console.log("AccountScreen - loadAccountData: Start");
      try {
        const loggedInUserId = await AsyncStorage.getItem('loggedInUserId');
        const storedAccountName = await AsyncStorage.getItem(`accountName_${loggedInUserId}`);
        const storedAccountDescription = await AsyncStorage.getItem(`accountDescription_${loggedInUserId}`);

        console.log("AccountScreen - loadAccountData: storedAccountName:", storedAccountName);
        console.log("AccountScreen - loadAccountData: storedAccountDescription:", storedAccountDescription);

        if (storedAccountName) {
          setAccountName(storedAccountName);
        }
        if (storedAccountDescription) {
          setAccountDescription(storedAccountDescription);
        }
      } catch (error) {
        console.error('AccountScreen - loadAccountData: Error loading account data:', error);
      }
    };

    loadAccountData();
  }, []);

  const handleSave = async () => {
    console.log("AccountScreen - handleSave: Start");
    try {
      const loggedInUserId = await AsyncStorage.getItem('loggedInUserId');
      await AsyncStorage.setItem(`accountName_${loggedInUserId}`, accountName);
      await AsyncStorage.setItem(`accountDescription_${loggedInUserId}`, accountDescription);
      console.log("AccountScreen - handleSave: Account data saved");
      navigation.navigate('Home');
    } catch (error) {
      console.error('AccountScreen - handleSave: Error saving account data:', error);
      Alert.alert('Error', 'Failed to save account data');
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