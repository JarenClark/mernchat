import { GET_USERS_SUCCESS, MESSAGE_GET_SUCCESS } from "../types/messengerTypes"

const messengerState = {
    friends: [],
    messages: [],
    mesageSendSuccess : false,
    message_get_success : false,
    themeMood : '',
    new_user_add : ''
}

 const messengerReducer = (state=messengerState, action) => {
    const {payload, type} = action

    if(type === GET_USERS_SUCCESS) {
        return {
            ...state,
            friends: payload.friends
        }
    }

    if(type === MESSAGE_GET_SUCCESS){
        console.log(`MESSAGE_GET_SUCCESS ==${JSON.stringify(payload)}`)
        return {
             ...state,
             messages : payload,
             message_get_success : true,
             
        }
   }


    return state
}
export default messengerReducer