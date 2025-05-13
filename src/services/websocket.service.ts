import { io } from 'socket.io-client';
import { Note } from '../types/Note';

type SyncCallback = (note: Note) => void;

// Remove '/api/notes' from the URL to get the base URL
const BASE_URL = process.env.EXPO_PUBLIC_BACKEND_API.replace('/api/notes', '');

export const socket = io(BASE_URL, {
  transports: ['websocket'],
  autoConnect: true
});

export const initializeSocket = (onSync?: SyncCallback) => {
  socket.on('connect', () => {
    console.log('Socket connected');
  });

  socket.on('disconnect', () => {
    console.log('Socket disconnected');
  });

  socket.on('connect_error', (error) => {
    console.log('Socket connection error:', error);
  });

  // Listen for note creation confirmation
  socket.on('note:created', (note: Note) => {
    console.log('Note created and synced:', note);
    onSync?.(note);
  });

  // Listen for note sync confirmation
  socket.on('note:synced', (note: Note) => {
    console.log('Note synced with server:', note);
    onSync?.(note);
  });

  // Listen for sync error events
  socket.on('sync:error', (error: any) => {
    console.error('Sync error:', error);
  });

  return () => {
    socket.off('note:created');
    socket.off('note:synced');
    socket.off('sync:error');
  };
};

// Helper function to emit sync events
export const emitNoteSync = (note: Note) => {
  socket.emit('note:sync', note);
};