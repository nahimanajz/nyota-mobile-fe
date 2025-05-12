import React, {useState,useCallback } from "react";
import { View, Text, FlatList, Button, StyleSheet, Alert } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { Note } from "../types/Note";
import { fetchNotes } from "../services/notes.service";
import { getLocalNotes, syncNotes } from "../utils/syncNotes";
import { INavigationProps } from "../interfaces";
import { useFocusEffect } from "@react-navigation/native";

const NotesListScreen = ({ navigation }: INavigationProps) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isOffline, setIsOffline] = useState(false);

  const handleNavigation = () => {
    navigation.navigate("Home");
  };

  const getNotes = async () => {
    try {
      const response = isOffline ? await getLocalNotes() : await fetchNotes();
      setNotes(response);
    } catch (error) {
      console.log({error})
      Alert.alert("Error", "Failded to load data");
    }
  };

  const sortedNotes = () =>{

  return [...notes].sort((a, b) => {
  const dateA = a?.updatedAt || a?.createdAt || Date.now();
  const dateB = b?.updatedAt || b?.createdAt || Date.now();

  const timestampA = new Date(dateA).getTime();
  const timestampB = new Date(dateB).getTime();

  return timestampB - timestampA;
});
  }


useFocusEffect(
    useCallback(() => {
      const unsubscribe = NetInfo.addEventListener(async (state) => {
        setIsOffline(!state.isConnected);
        if (state.isConnected) {
          await syncNotes();
          getNotes();
        } else {
          getNotes();
        }
      });

      getNotes(); // Initial fetch
      return () => unsubscribe();
    }, [isOffline])
  );

  return (
    <View style={styles.container}>
      {isOffline && <Text style={styles.offlineBanner}>You are Offline</Text>}
      <FlatList
        data={sortedNotes()}
        keyExtractor={(item) => item.id?.toString() || String(Math.random())}
        renderItem={({ item }) => (
          <View style={styles.note}>
            <Text style={styles.title}>{item.title}</Text>
            <Text>{item.content}</Text>
          </View>
        )}
      />
      <Button title="Create Note" onPress={handleNavigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  offlineBanner: {
    backgroundColor: "red",
    color: "white",
    padding: 8,
    textAlign: "center",
  },
  note: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
  },
  title: { fontWeight: "bold", fontSize: 16 },
});

export default NotesListScreen;
