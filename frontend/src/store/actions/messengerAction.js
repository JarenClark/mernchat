import axios from "axios";
import { GET_USERS_SUCCESS, MESSAGE_GET_SUCCESS, MESSAGE_SEND_SUCCESS } from "../types/messengerTypes";

const SERVER_URL = import.meta.env.VITE_SERVER_URL

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
    //console.log(data)
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const response = await axios.post(`${SERVER_URL}/api/messenger/send-message`, data)
        dispatch({
            type: MESSAGE_SEND_SUCCESS,
            payload: {
                message: response.data.message
            }
        })
    } catch (error) {
        console.log(JSON.stringify(error))
    }
}

export const getMessages = (id) => async( dispatch) => {

    if(!id){return null}
    
    try {
        const response = await axios.get(`${SERVER_URL}/api/messenger/get-messages/${id}`)  
        //console.log(response?.data)
        dispatch({
            type: MESSAGE_GET_SUCCESS,
            payload: {
                messages: response.data.messages
            }
        })
    } catch (error) {
        console.log(error?.response?.data)
    }
}


export const seenMessage = (msg) => async(dispatch)=> {
    try{
         const response = await axios.post(`${SERVER_URL}/api/messenger/seen-message`,msg);
         console.log(response.data);
    }catch (error){
         console.log(error.response.message)

    }
}


export const updateMessage = (msg) => async(dispatch)=> {
    try{
         const response = await axios.post(`${SERVER_URL}/api/messenger/delivered-message`,msg);
         console.log(response.data);
    }catch (error){
         console.log(error.response.message)

    }
}
