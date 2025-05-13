import { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { createNote } from "../services/notes.service";
import { saveNoteOffline } from "../utils/syncNotes";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { INavigationProps } from "../interfaces";
import { alertResponse } from "../utils/alert.response";
import { Note } from "../types/Note";
import { emitNoteSync } from '../services/websocket.service';


const HomeScreen = ({ navigation }: INavigationProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleOnPress = () => {
    setTitle("");
    setContent("");
    navigation.navigate("List");
  };

  const handleSaveNote = async () => {
    if (!title || !content) {
      Alert.alert("Validation Error", "Both title and content are required.");
      return;
    }

    const note:Note = {
      id: uuidv4(),
      title,
      content,
      isSynced:false
    };

    try {
      const isConnected = await NetInfo.fetch().then(
        (state) => state.isConnected
      );

      if (isConnected) {
        const response = await createNote({...note, isSynced:true});
        if (response) {
          emitNoteSync(note);
          alertResponse("ONLINE", "Note saved successfully", handleOnPress);
        }
      } else {
        const offlineNote = {
          ...note,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        };
        await saveNoteOffline(offlineNote);
        alertResponse(
          "OFFLINE",
          "Note saved on this device, data will be synced when online",
          handleOnPress
        );
      }
    } catch (error) {
      Alert.alert("Error", "Failed to save note");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter note title"
        value={title}
        onChangeText={setTitle}
      />
      <Text style={styles.label}>Content</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Enter note content"
        value={content}
        onChangeText={setContent}
        multiline
      />
      <View style={styles.buttonContainer}>

      <Button title="Save Note" onPress={handleSaveNote} color={"#fff"} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  label: { fontSize: 16, fontWeight: "bold", marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  buttonContainer: {
    marginTop: 10,
    backgroundColor: "#FF8C00",
    borderRadius: 8,
    overflow: "hidden",
  },
});

export default HomeScreen;
