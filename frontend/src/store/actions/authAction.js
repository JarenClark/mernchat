import axios from 'axios'
import { REGISTER_FAIL } from '../types/authType'

const SERVER_URL = import.meta.env.SERVER_URL || 'http://127.0.0.1:5000'

export const userRegister = (data) => {
    return async (dispatch) => {
        const config = {
            headers: {
                Accept: 'application/json',
                'Access-Control-Allow-Credentials': true,
                'Content-Type': 'multipart/form-data',
                'withCredentials': true
            }
        }
//,credentials: 'same-origin',
        try {
            const response = await axios.post(
                `${SERVER_URL}/api/messenger/user-register`,
                data,
                config
            )
            //localStorage.setItem('authToken',response.data.token);
            //document.cookie = `authToken=hello;max-age=604800;domain=example.com`
            console.log(`Response Data is ${JSON.stringify(response.data)}`)

        } catch (error) {
            dispatch({
                type: REGISTER_FAIL,
                payload: {
                    error : error.response.data.error
                }
            })
            console.log(`${error.response?.data?.error?.errorMessage ?? `Unknown Error`}`)
            // alert(`${error.response?.data?.error?.errorMessage ?? `Unknown Error`}`)

        }
    }
}