
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import io from 'socket.io-client';
import { createNote } from '../services/notes.service';
import { Note } from '../types/Note';

const API_URL = process.env.EXPO_PUBLIC_BACKEND_API as string
const socket = io(API_URL);

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

// Listen for real-time updates
socket.on('noteUpdated', (note) => {
  console.log('Real-time update:', note);
});