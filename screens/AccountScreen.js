import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import styles from '../styles';

const AccountScreen = ({ navigation }) => {
  // Temporary in-memory state for account data
  const [accountName, setAccountName] = useState('Default Account Name');
  const [accountDescription, setAccountDescription] = useState('Default Account Description');

  const handleSave = () => {
    // In this simplified version, we don't save to AsyncStorage
    // You would update this to save to persistent storage if needed
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
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