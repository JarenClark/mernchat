import axios from "axios";
import { GET_USERS_SUCCESS, MESSAGE_GET_SUCCESS } from "../types/messengerTypes";

const SERVER_URL = import.meta.env.SERVER_URL || 'http://127.0.0.1:5000'

export const getFriends = () => async (dispatch) => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        const response = await axios.get(`${SERVER_URL}/api/messenger/get-friends`, config);
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


export const messageSend = (data) => async (dispatch) => {
    console.log(data)
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const response = await axios.post(`${SERVER_URL}/api/messenger/send-message`, data)
    } catch (error) {
        console.log(JSON.stringify(error))
    }
}

export const getMessages = (id) => async( dispatch) => {
    console.log(id)
    if(!id){return null}
    try {
        const response = await axios.get(`${SERVER_URL}/api/messenger/get-messages/${id}`)  
        console.log(response?.data)
        dispatch({
            type: MESSAGE_GET_SUCCESS,
            payload: response.data.messages
        })
    } catch (error) {
        console.log(error?.response?.data)
    }
}