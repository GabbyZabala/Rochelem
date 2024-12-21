import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Alert, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../styles";

const NoteEditScreen = ({ navigation, route }) => {
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [noteId, setNoteId] = useState(null);

  useEffect(() => {
    if (route.params?.note) {
      const { note } = route.params;
      setNoteTitle(note.title);
      setNoteContent(note.content);
      setNoteId(note.id);
    }
  }, [route.params]);

  const handleSave = async () => {
    const loggedInUserId = await AsyncStorage.getItem("loggedInUserId");
    const newNote = {
      id: noteId || Date.now(),
      userId: parseInt(loggedInUserId),
      title: noteTitle,
      content: noteContent,
    };

    console.log("NoteEditScreen - handleSave: Start");
    console.log("NoteEditScreen - handleSave: loggedInUserId:", loggedInUserId);
    console.log("NoteEditScreen - handleSave: newNote:", newNote);

    try {
      let storedNotes = await AsyncStorage.getItem("notes");
      let notes = storedNotes ? JSON.parse(storedNotes) : {};

      // Ensure the array for the user exists
      if (!notes[newNote.userId]) {
        notes[newNote.userId] = [];
      }

      const noteIndex = notes[newNote.userId].findIndex((n) => n.id === newNote.id);
      if (noteIndex !== -1) {
        // Update existing note
        console.log("NoteEditScreen - handleSave: Updating existing note");
        notes[newNote.userId][noteIndex] = newNote;
      } else {
        // Add new note
        console.log("NoteEditScreen - handleSave: Adding new note");
        notes[newNote.userId].push(newNote);
      }

      await AsyncStorage.setItem("notes", JSON.stringify(notes));
      console.log("NoteEditScreen - handleSave: Note saved successfully");

      // Call onSave with the updated or new note
      route.params.onSave(newNote);

      navigation.goBack();
    } catch (error) {
      console.error("NoteEditScreen - handleSave: Error saving note:", error);
      Alert.alert("Error", "Failed to save note");
    }
  };

  const handleDelete = async () => {
    console.log("NoteEditScreen - handleDelete: Start");
    if (!route.params.note) {
      console.log("NoteEditScreen - handleDelete: No note to delete, returning");
      navigation.goBack();
      return;
    }

    try {
      const loggedInUserId = await AsyncStorage.getItem('loggedInUserId');
      const storedNotes = await AsyncStorage.getItem('notes');
      let notes = storedNotes ? JSON.parse(storedNotes) : {};

      // Ensure the user's notes array exists and the note to be deleted exists
      if (!notes[loggedInUserId]) {
        Alert.alert('Error', 'No notes found for this user.');
        navigation.goBack();
        return;
      }

      const noteToDeleteIndex = notes[loggedInUserId].findIndex((n) => n.id === route.params.note.id);
      if (noteToDeleteIndex === -1) {
        Alert.alert('Error', 'Note to delete not found.');
        navigation.goBack();
        return;
      }

      // Remove the note
      notes[loggedInUserId].splice(noteToDeleteIndex, 1);

      await AsyncStorage.setItem('notes', JSON.stringify(notes));
      console.log("NoteEditScreen - handleDelete: Note deleted successfully");

      route.params.onDelete(route.params.note.id);

      navigation.goBack();
    } catch (error) {
      console.error('NoteEditScreen - handleDelete: Error deleting note:', error);
      Alert.alert('Error', 'Failed to delete note');
    }
  };

  return (
    <View style={styles.noteEditContainer}>
      <TextInput
        style={styles.noteEditInput}
        placeholder="Note Title"
        value={noteTitle}
        onChangeText={setNoteTitle}
      />
      <TextInput
        style={[styles.noteEditInput, { height: 200 }]}
        placeholder="Note Content"
        multiline={true}
        value={noteContent}
        onChangeText={setNoteContent}
      />
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleDelete}>
        <Text style={styles.buttonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NoteEditScreen;