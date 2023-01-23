import { GET_USERS_SUCCESS } from "../types/messengerTypes"
const messengerState = {
    friends: []
}

 const messengerReducer = (state=messengerState, action) => {
    const {payload, type} = action
    if(type === GET_USERS_SUCCESS) {
        return {
            ...state,
            friends: payload.friends
        }
    }

    return state
}
export default messengerReducer