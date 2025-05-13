import { io } from 'socket.io-client';
import { Note } from '../types/Note';
import { scheduleSyncNotification } from './notification.service';


type SyncCallback = (note: Note) => void;

// Remove '/api/notes' from the URL to get the base URL
const BASE_URL = process.env.EXPO_PUBLIC_BACKEND_API.replace('/api/notes', '');

export const socket = io(BASE_URL, {
  transports: ['websocket'],
  autoConnect: true
});

export const initializeSocket = (onSync?: SyncCallback) => {
  socket.on('connect', () => {
   scheduleSyncNotification("web socket connected");
  });

  socket.on('disconnect', () => {
   scheduleSyncNotification("web socket disconnected");
    
  });

  socket.on('connect_error', (error) => {
   scheduleSyncNotification(`web socket faced an error`);
   
  });

  // Listen for note creation confirmation
  socket.on('note:created', (note: Note) => {
   scheduleSyncNotification(`${note.title} created`);
    onSync?.(note);
  });

  // Listen for note sync confirmation
  socket.on('note:synced', (note: Note) => {
   scheduleSyncNotification(`${note.title} Note synced with server`);

    onSync?.(note);
  });

  // Listen for sync error events
  socket.on('sync:error', (error: any) => {
     scheduleSyncNotification(`error while syncing`);

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