import axios from "axios";
import { GET_USERS_SUCCESS } from "../types/messengerTypes";

const SERVER_URL = import.meta.env.SERVER_URL || 'http://127.0.0.1:5000'

export const getFriends = () => async (dispatch) => {
    console.log(`getting friends`)
    try {
        const response = await axios.get(`${SERVER_URL}/api/messenger/get-friends`);
        dispatch({
            type: GET_USERS_SUCCESS,
            payload: {
                friends: response.data.friends
            }
        })

    } catch (error) {
        console.log(error?.response?.data)
    }
}


