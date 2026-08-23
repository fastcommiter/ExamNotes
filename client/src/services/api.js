import axios from "axios";
import { serverUrl } from "../App";
import { setUserData } from "../redux/userSlice";


export const getCurrentUser = async (dispatch) => {

    try {

        console.log(
            "1. getCurrentUser called"
        );

        const result = await axios.get(

            serverUrl +
            "/api/user/currentUser",

            {
                withCredentials: true
            }

        );

        console.log(
            "2. API RESPONSE =",
            result.data
        );

        dispatch(
            setUserData(
                result.data
            )
        );

        console.log(
            "3. DISPATCH DONE"
        );

    }

    catch (error) {

        console.log(
            "4. API ERROR =",
            error
        );

    }
};


export const generateNotes = async (payload) => {

    try {

        const result = await axios.post(

            serverUrl +
            "/api/notes/generate-notes",

            payload,

            {
                withCredentials: true
            }

        );

        console.log(
            "GENERATE NOTES RESPONSE =",
            result.data
        );

        return result.data;

    }

    catch (error) {

        console.log(
            "GENERATE NOTES ERROR =",
            error
        );

        throw error;

    }
};