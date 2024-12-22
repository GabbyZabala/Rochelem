import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity } from 'react-native';
import styles from '../styles';

const NoteEditScreen = ({ navigation, route }) => {
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
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
    const newNote = {
      id: noteId || Date.now().toString(), // Generate temporary ID
      title: noteTitle,
      content: noteContent,
    };

    navigation.navigate('Home', { updatedNote: newNote });
  };

  const handleDelete = async () => {
    if (route.params.note) {
      navigation.navigate('Home', { deleteNoteId: route.params.note.id });
    } else {
      navigation.goBack();
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