import { GET_USERS_SUCCESS, MESSAGE_GET_SUCCESS, MESSAGE_SEND_SUCCESS } from "../types/messengerTypes"

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
            messages: [...state.messages, payload.message]
        }
    }

    return state
}
export default messengerReducer