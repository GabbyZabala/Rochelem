import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles';

const HomeScreen = ({ navigation }) => {
  const [accountUsername, setAccountUsername] = useState('');
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const loggedInUsername = await AsyncStorage.getItem('loggedInUsername');
        setAccountUsername(loggedInUsername || '');

        const userNotes = await loadNotesForUser(loggedInUsername);
        setNotes(userNotes);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    const unsubscribe = navigation.addListener('focus', loadData);
    return unsubscribe;
  }, [navigation]);

  const loadNotesForUser = async (username) => {
    try {
      const allNotes = await AsyncStorage.getItem('notes');
      const parsedNotes = allNotes ? JSON.parse(allNotes) : {};
      return parsedNotes[username] || [];
    } catch (error) {
      console.error('Error loading notes for user:', error);
      return [];
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.multiRemove(['isLoggedIn', 'loggedInUsername']);
      navigation.goBack();
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const handleAddNote = () => {
    navigation.navigate('NoteEdit', { note: null, onSave: addOrUpdateNote });
  };

  const addOrUpdateNote = (newNote) => {
    setNotes((prevNotes) => {
      if (newNote.id) {
        // Update existing note
        const updatedNotes = prevNotes.map((note) =>
          note.id === newNote.id ? newNote : note
        );
        return updatedNotes;
      } else {
        // Add new note
        return [...prevNotes, newNote];
      }
    });
  };

  const deleteNote = (noteId) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
  };

  const renderNoteItem = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('NoteEdit', { note: item, onSave: addOrUpdateNote, onDelete: deleteNote })
      }
    >
      <View style={styles.noteItem}>
        <Text style={styles.noteTitle}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.homeButtonContainer}>
        <TouchableOpacity onPress={handleLogout} style={styles.logout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.Accounts}
          onPress={() => navigation.navigate('Account')}
        >
          <Text style={styles.buttonText}>{accountUsername}</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Welcome to Dicty Notes!</Text>

      <TouchableOpacity style={styles.button} onPress={handleAddNote}>
        <Text style={styles.buttonText}>Add Note</Text>
      </TouchableOpacity>

      <FlatList
        data={notes}
        renderItem={renderNoteItem}
        keyExtractor={(item) => item.id.toString()}
        style={{ width: '100%' }}
      />
    </View>
  );
};

export default HomeScreen;