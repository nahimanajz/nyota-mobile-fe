
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import { createNote } from '../services/notes.service';
import { Note } from '../types/Note';


export const syncNotes = async () => {
  const offlineNotes = await getLocalNotes()
  const isConnected = await NetInfo.fetch().then((state) => state.isConnected);

  if (isConnected && offlineNotes.length > 0) {
    for (const note of offlineNotes) {
      await createNote(note)
    }
    await AsyncStorage.removeItem('offlineNotes');
  }
};

export const getLocalNotes = async (): Promise<Note[]> => {
  return JSON.parse(await AsyncStorage.getItem('offlineNotes') ?? '[]') || [];
};

export const saveNoteOffline = async (note:Note) => {
  const offlineNotes = JSON.parse(await AsyncStorage.getItem('offlineNotes') ?? '[]') || [];
  offlineNotes.push(note);
  await AsyncStorage.setItem('offlineNotes', JSON.stringify(offlineNotes));
};
