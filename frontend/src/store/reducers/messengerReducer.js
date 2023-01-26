//import { GET_USERS_SUCCESS, MESSAGE_GET_SUCCESS, MESSAGE_SEND_SUCCESS } from "../types/messengerTypes"
import {GET_USERS_SUCCESS,MESSAGE_GET_SUCCESS,MESSAGE_SEND_SUCCESS,SOCKET_MESSAGE,UPDATE_FRIEND_MESSAGE,MESSAGE_SEND_SUCCESS_CLEAR,SEEN_MESSAGE,DELIVERED_MESSAGE,UPDATE,MESSAGE_GET_SUCCESS_CLEAR,SEEN_ALL} from "../types/messengerTypes";

const messengerState = {
    friends: [],
    messages: [],
    mesageSendSuccess: false,
    message_get_success: false,
    themeMood: '',
    new_user_add: ''
}

const messengerReducer = (state = messengerState, action) => {
    const { payload, type } = action
    console.log(`TYPE == ${type} \n `) // PAYLOAD IS \n ${JSON.stringify(payload, null, 4)}
    if (type === GET_USERS_SUCCESS) {
        return {
            ...state,
            friends: payload.friends
        }
    }

    if (type === MESSAGE_GET_SUCCESS) {
        return {
            ...state,
            messages: payload.messages,
            message_get_success: true,

        }
    }

    if (type === MESSAGE_SEND_SUCCESS) {
        return {
            ...state,
            mesageSendSuccess: true,
            messages: [...state.messages, payload.message]
        }
    }

    if (type === SOCKET_MESSAGE) {
        console.log(`TYPE == SOCKET_MESSAGE`)
        console.log(JSON.stringify(payload, null, 4))
        return {
            ...state,
            messages: [...state.messages, payload]
        }
    }

    if (type === UPDATE_FRIEND_MESSAGE) {
        const index = state.friends.findIndex(f => f.fndInfo._id === payload.msgInfo.receiverId || f.fndInfo._id === payload.msgInfo.senderId);
        state.friends[index].msgInfo = payload.msgInfo;
        state.friends[index].msgInfo.status = payload.status;
        return state;
    }

    if (type === MESSAGE_SEND_SUCCESS_CLEAR) {
        return {
            ...state,
            mesageSendSuccess: false
        }
    }


    if (type === SEEN_MESSAGE) {
        const index = state.friends.findIndex(f => f.fndInfo._id === payload.msgInfo.receiverId || f.fndInfo._id === payload.msgInfo.senderId);
        state.friends[index].msgInfo.status = 'seen';
        return {
            ...state
        };
    }

    if (type === DELIVERED_MESSAGE) {
        const index = state.friends.findIndex(f => f.fndInfo._id === payload.msgInfo.receiverId || f.fndInfo._id === payload.msgInfo.senderId);
        state.friends[index].msgInfo.status = 'delivered';
        return {
            ...state
        };
    }


    if (type === UPDATE) {
        const index = state.friends.findIndex(f => f.fndInfo._id === payload.id);
        if (state.friends[index].msgInfo) {
            state.friends[index].msgInfo.status = 'seen';
        }
        return {
            ...state
        }
    }

    if (type === MESSAGE_GET_SUCCESS_CLEAR) {
        return {
            ...state,
            message_get_success: false
        }
    }

    if (type === 'SEEN_ALL') {
        const index = state.friends.findIndex(f => f.fndInfo._id === payload.receiverId);
        state.friends[index].msgInfo.status = 'seen';
        return {
            ...state
        }
    }

    if (type === 'LOGOUT_SUCCESS') {
        return {
            ...state,
            friends: [],
            message: [],
            mesageSendSuccess: false,
            message_get_success: false,

        }
    }

    if (type === 'NEW_USER_ADD') {
        return {
            ...state,
            new_user_add: payload.new_user_add
        }
    }

    if (type === 'NEW_USER_ADD_CLEAR') {
        return {
            ...state,
            new_user_add: ''
        }
    }


    return state
}
export default messengerReducer