import { Note } from "../types/Note";

const API_URL = process.env.EXPO_PUBLIC_BACKEND_API;

/**
 * Fetch all notes from the backend.
 * @returns {Promise<any[]>} A promise that resolves to an array of notes.
 */
export const fetchNotes = async (): Promise<Note[]> => {
  const response = await fetch(API_URL as string);
  const data = await response.json()
  return data
};

/**
 * Create a new note by sending it to the backend.
 * @param {Object} note - The note object to create.
 * @param {string} note.title - The title of the note.
 * @param {string} note.content - The content of the note.
 * @returns {Promise<any>} A promise that resolves to the created note.
 */
export const createNote = async (note: Note): Promise<any> => {
  try {
    const response = await fetch(API_URL as string, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });

    return await response.json();
  } catch (error) {
    throw error;
  }
};
