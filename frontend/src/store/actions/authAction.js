import axios from 'axios'
import { REGISTER_FAIL, REGISTER_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_SUCCESS } from '../types/authType'

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
            localStorage.setItem('authToken', response.data.token);
            document.cookie = `authToken=${response.data.token};max-age=${7 * 24 * 60 * 60 * 1000};Same-Site=None;Secure=True;`

            dispatch({
                type: REGISTER_SUCCESS,
                payload: {
                    successMessage: response.data.successMessage,
                    token: response.data.token
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

export const userLogin = (data) => {
    console.log(`login data from auth action is ${data}`)
    return async (dispatch) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const response = await axios.post('/api/messenger/user-login', data, config);
            localStorage.setItem('authToken', response.data.token);
            document.cookie = `authToken=${response.data.token};max-age=${7 * 24 * 60 * 60 * 1000};Same-Site=None;Secure=True;`
            dispath({
                type: USER_LOGIN_SUCCESS,
                payload: {
                    successMessage: response.data.successMessage,
                    token: response.data.token
                }
            })  
        } catch (error) {
            dispatch({
                type: USER_LOGIN_FAIL,
                payload: {
                    error: error?.response?.data?.error ?? [error]
                }
            })
            console.log(`${error.response?.data?.error?.errorMessage ?? `Unknown Error`}`)
        }
    }
}