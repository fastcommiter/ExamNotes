import axios from "axios";
import { serverUrl } from "../App";
import { setUserData } from "../redux/userSlice";


// ========================================
// GET CURRENT USER
// ========================================

export const getCurrentUser = async (dispatch) => {
  try {
    console.log("1. getCurrentUser called");

    const result = await axios.get(
      serverUrl + "/api/user/currentUser",
      {
        withCredentials: true,
      }
    );

    console.log("2. API RESPONSE =", result.data);

    dispatch(setUserData(result.data));

    console.log("3. DISPATCH DONE");

  } catch (error) {
    console.log("4. API ERROR =", error);
  }
};


// ========================================
// GENERATE NOTES
// ========================================

export const generateNotes = async (payload) => {
  try {
    const result = await axios.post(
      serverUrl + "/api/notes/generate-notes",
      payload,
      {
        withCredentials: true,
      }
    );

    console.log(
      "GENERATE NOTES RESPONSE =",
      result.data
    );

    return result.data;

  } catch (error) {
    console.log(
      "GENERATE NOTES ERROR =",
      error
    );

    throw error;
  }
};


// ========================================
// GET NOTES HISTORY
// ========================================

export const getNotesHistory = async () => {
  try {
    const result = await axios.get(
      serverUrl + "/api/notes/history",
      {
        withCredentials: true,
      }
    );

    console.log(
      "NOTES HISTORY RESPONSE =",
      result.data
    );

    return result.data;

  } catch (error) {
    console.log(
      "NOTES HISTORY ERROR =",
      error
    );

    throw error;
  }
};


// ========================================
// GET SINGLE NOTE
// ========================================

export const getNoteById = async (noteId) => {
  try {
    const result = await axios.get(
      serverUrl + `/api/notes/${noteId}`,
      {
        withCredentials: true,
      }
    );

    console.log(
      "SINGLE NOTE RESPONSE =",
      result.data
    );

    return result.data;

  } catch (error) {
    console.log(
      "SINGLE NOTE ERROR =",
      error
    );

    throw error;
  }
};
