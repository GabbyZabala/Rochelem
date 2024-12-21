import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles';

const HomeScreen = ({ navigation }) => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      console.log('HomeScreen - loadData: Start');
      try {
        const loggedInUserId = await AsyncStorage.getItem('loggedInUserId');
        console.log('HomeScreen - loadData: loggedInUserId:', loggedInUserId);

        if (loggedInUserId) {
          const userNotes = await loadNotesForUser(loggedInUserId);
          console.log('HomeScreen - loadData: userNotes:', userNotes);
          setNotes(userNotes);
        } else {
          console.log('HomeScreen - loadData: User not logged in. Redirecting to Login.');
          navigation.navigate('Login');
        }
      } catch (error) {
        console.error('HomeScreen - loadData: Error loading data:', error);
      }
    };

    const unsubscribe = navigation.addListener('focus', loadData);
    return unsubscribe;
  }, [navigation]);

  const loadNotesForUser = async (userId) => {
    console.log('HomeScreen - loadNotesForUser: Start, userId:', userId);
    try {
      const allNotes = await AsyncStorage.getItem('notes');
      console.log('HomeScreen - loadNotesForUser: allNotes:', allNotes);

      const parsedNotes = allNotes ? JSON.parse(allNotes) : {};
      console.log('HomeScreen - loadNotesForUser: parsedNotes:', parsedNotes);

      const userNotes = Object.values(parsedNotes).flat().filter(note => note.userId === parseInt(userId));
      console.log('HomeScreen - loadNotesForUser: userNotes:', userNotes);

      return userNotes;
    } catch (error) {
      console.error('HomeScreen - loadNotesForUser: Error loading notes for user:', error);
      return [];
    }
  };

  const handleLogout = async () => {
    console.log('HomeScreen - handleLogout: Start');
    try {
      await AsyncStorage.multiRemove(['isLoggedIn', 'loggedInUserId']);
      navigation.navigate('Login');
    } catch (error) {
      console.error('HomeScreen - handleLogout: Error during logout:', error);
    }
  };

  const handleAddNote = () => {
    console.log('HomeScreen - handleAddNote: Start');
    navigation.navigate('NoteEdit', { onSave: addOrUpdateNote });
  };

  const addOrUpdateNote = (updatedNote) => {
    console.log('HomeScreen - addOrUpdateNote: Start, updatedNote:', updatedNote);
    setNotes((prevNotes) => {
      const existingNoteIndex = prevNotes.findIndex((note) => note.id === updatedNote.id);

      if (existingNoteIndex >= 0) {
        console.log('HomeScreen - addOrUpdateNote: Updating existing note');
        const updatedNotes = [...prevNotes];
        updatedNotes[existingNoteIndex] = updatedNote;
        console.log('HomeScreen - addOrUpdateNote: updatedNotes:', updatedNotes);
        return updatedNotes;
      } else {
        console.log('HomeScreen - addOrUpdateNote: Adding new note');
        const newNotes = [...prevNotes, updatedNote];
        console.log('HomeScreen - addOrUpdateNote: newNotes:', newNotes);
        return newNotes;
      }
    });
  };

  const deleteNote = (noteId) => {
    console.log('HomeScreen - deleteNote: Start, noteId:', noteId);
    setNotes((prevNotes) => {
      const updatedNotes = prevNotes.filter((note) => note.id !== noteId);
      console.log('HomeScreen - deleteNote: updatedNotes:', updatedNotes);
      return updatedNotes;
    });
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
          <Text style={styles.buttonText}>Account</Text>
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