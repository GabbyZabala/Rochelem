import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Alert } from 'react-native';
import styles from '../styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation, route }) => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    // Load notes from AsyncStorage on app start
    loadNotes();

    const unsubscribe = navigation.addListener('focus', () => {
      // Check for updated or deleted notes passed back from NoteEditScreen
      if (route.params?.updatedNote) {
        addOrUpdateNote(route.params.updatedNote);
        navigation.setParams({ updatedNote: null }); // Clear the param
      }

      if (route.params?.deleteNoteId) {
        deleteNote(route.params.deleteNoteId);
        navigation.setParams({ deleteNoteId: null }); // Clear the param
      }
    });

    return unsubscribe;
  }, [navigation, route.params]);

  const loadNotes = async () => {
    try {
      const storedNotes = await AsyncStorage.getItem('notes');
      console.log('Stored notes loaded:', storedNotes); // Log loaded notes
      if (storedNotes !== null) {
        setNotes(JSON.parse(storedNotes));
      }
    } catch (error) {
      console.error('Error loading notes:', error);
    }
  };

  const handleLogout = () => {
    navigation.navigate('Login');
  };

  const handleAddNote = () => {
    navigation.navigate('NoteEdit', { onSave: addOrUpdateNote });
  };

  // This function handles both adding new notes and updating existing ones
  const addOrUpdateNote = async (updatedNote) => {
    try {
      let newNotes = [];
      const storedNotes = await AsyncStorage.getItem('notes');
      if (storedNotes) {
        newNotes = JSON.parse(storedNotes);
      }

      const existingNoteIndex = newNotes.findIndex((note) => note.id === updatedNote.id);

      if (existingNoteIndex >= 0) {
        // Update existing note
        console.log('Updating existing note:', updatedNote);
        newNotes[existingNoteIndex] = updatedNote;
      } else {
        // Add new note
        console.log('Adding new note:', updatedNote);
        newNotes = [...newNotes, updatedNote];
      }

      console.log('New notes array:', newNotes);
      setNotes(newNotes);
      await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
      console.log('Notes saved to AsyncStorage');

      navigation.navigate('Home'); // Navigate after saving
    } catch (error) {
      console.error('Error saving note:', error);
    }
  };

  const deleteNote = async (noteId) => {
    try {
      // Filter out the note to be deleted
      const newNotes = notes.filter((note) => note.id !== noteId);
      console.log('Deleting note with ID:', noteId);
      setNotes(newNotes);
      await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
      console.log('Note deleted and updated notes saved to AsyncStorage');
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  // Updated handleDeleteAllNotes to directly delete notes without alert
  const handleDeleteAllNotes = async () => {
    try {
      // Clear notes from state
      setNotes([]);
      // Clear notes from AsyncStorage
      await AsyncStorage.removeItem('notes');
      console.log('All notes deleted from AsyncStorage');

      // Force reload notes after deletion
      loadNotes();
    } catch (error) {
      console.error('Error deleting all notes:', error);
    }
  };

  const renderNoteItem = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('NoteEdit', {
          note: item, // Pass the note data to NoteEditScreen
          onSave: addOrUpdateNote, // Pass the update function
          onDelete: deleteNote, // Pass the delete function
        })
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
          <Text style={styles.buttonText}>Account</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Welcome to Dicty Notes!</Text>

      <TouchableOpacity style={styles.button} onPress={handleAddNote}>
        <Text style={styles.buttonText}>Add Note</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleDeleteAllNotes}>
        <Text style={styles.buttonText}>Delete All Notes</Text>
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