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
    const loggedInUsername = await AsyncStorage.getItem("loggedInUsername");
    const newNote = {
      id: noteId || Date.now(),
      title: noteTitle,
      content: noteContent,
    };

    try {
      let storedNotes = await AsyncStorage.getItem("notes");
      let notes = storedNotes ? JSON.parse(storedNotes) : {};

      if (!notes[loggedInUsername]) {
        notes[loggedInUsername] = [];
      }

      if (noteId) {
        const noteIndex = notes[loggedInUsername].findIndex(
          (n) => n.id === noteId
        );
        if (noteIndex !== -1) {
          notes[loggedInUsername][noteIndex] = newNote;
        }
      } else {
        notes[loggedInUsername].push(newNote);
      }

      await AsyncStorage.setItem("notes", JSON.stringify(notes));
      route.params.onSave(newNote);
      navigation.goBack();
    } catch (error) {
      console.error("Error saving note:", error);
      Alert.alert("Error", "Failed to save note");
    }
  };

  const handleDelete = async () => {
    if (!route.params.note) {
      navigation.goBack();
      return;
    }

    try {
      const loggedInUsername = await AsyncStorage.getItem("loggedInUsername");
      const storedNotes = await AsyncStorage.getItem("notes");
      let notes = storedNotes ? JSON.parse(storedNotes) : {};

      const updatedNotes = notes[loggedInUsername]?.filter(
        (n) => n.id !== route.params.note.id
      );

      notes[loggedInUsername] = updatedNotes;

      await AsyncStorage.setItem("notes", JSON.stringify(notes));

      route.params.onDelete(route.params.note.id);

      navigation.goBack();
    } catch (error) {
      console.error("Error deleting note:", error);
      Alert.alert("Error", "Failed to delete note");
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