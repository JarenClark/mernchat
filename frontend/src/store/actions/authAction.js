import axios from 'axios'
import { REGISTER_FAIL } from '../types/authType'

const SERVER_URL = import.meta.env.SERVER_URL || 'http://127.0.0.1:5000'

// Accept: 'application/json',
//,credentials: 'same-origin',
// 'Content-Type': 'multipart/form-data',
// 'Content-Type': undefined,
//'Content-Type': 'application/json',
export const userRegister = (data) => {
    return async (dispatch) => {
        const config = {
            headers: {
                'Accept': '*/*',
                'Access-Control-Allow-Credentials': true,
                'Content-Type': 'multipart/form-data',
                withCredentials: true
            }
        }

        try {
            const response = await axios.post(
                `${SERVER_URL}/api/messenger/user-register`,
                data,
                config
            )
            localStorage.setItem('authToken',response.data.token);
            document.cookie = `authToken=${response.data.token};max-age=${7 * 24 * 60 * 60 * 1000};Same-Site=None;Secure=True;`
            console.log(`Response Data is ${response.data.successMessage}`)

            dispatch({
                type : REGISTER_SUCCESS,
                payload:{
                     successMessage: response.data.successMessage,
                     token : response.data.token
                }
           })

        } catch (error) {
            dispatch({
                type: REGISTER_FAIL,
                payload: {
                    error: error?.response?.data?.error ?? [error]
                }
            })
            console.log(`${error.response?.data?.error?.errorMessage ?? `Unknown Error`}`)
            // alert(`${error.response?.data?.error?.errorMessage ?? `Unknown Error`}`)

        }
    }
}