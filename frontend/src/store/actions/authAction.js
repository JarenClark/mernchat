import axios from 'axios'
import { REGISTER_FAIL, REGISTER_SUCCESS, USER_LOGIN_FAIL, USER_LOGIN_SUCCESS, LOGOUT_SUCCESS } from '../types/authType'

axios.defaults.withCredentials = true;
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
            document.cookie = `authToken=${response.data.token};max-age=${7 * 24 * 60 * 60 * 1000};HttpOnly=true;Same-Site=None;Secure=True;`

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
    return async (dispatch) => {

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const response = await axios.post(`${SERVER_URL}/api/messenger/user-login`, 
            data, 
            config);
            localStorage.setItem('authToken', response.data.token);
            document.cookie = `authToken=${response.data.token};max-age=${7 * 24 * 60 * 60 * 1000};Same-Site=None;Secure=True;`

            dispatch({
                type: USER_LOGIN_SUCCESS,
                payload: {
                    successMessage: response.data.successMessage,
                    token: response.data.token
                }
            })

        } catch (error) {
            console.log(`${error.response?.data?.error?.errorMessage ?? `${error}`}`)

            dispatch({
                type: USER_LOGIN_FAIL,
                payload: {
                    error: error?.response?.data?.error ?? [error]
                }
            })

        }
    }
}

export const userLogout = () => {
    const dummy_data = { 'abc': '123' } // 
    const config = {
        headers: {
            'Content-Type': 'application/json',
            "Accept": "/",
            "Cache-Control": "no-cache",
            withCredentials: true,
        }
    }

    return async (dispatch) => {
        try {
            //const response = await axios.post(`${SERVER_URL}/api/messenger/user-logout`, dummy_data, config);

            // 'Accept-Language': 'en-US,en;q=0.8',
            // 'Access-Control-Allow-Origin': '',

            const xhr = new XMLHttpRequest();

            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    console.log(xhr.responseText);
                    localStorage.removeItem('authToken');
                    document.cookie = `authToken=null;max-age=0;`

                    dispatch({
                        type: LOGOUT_SUCCESS
                    })
                }
            }

            xhr.open('POST', `${SERVER_URL}/api/messenger/user-logout`, true);
            xhr.withCredentials = true;
            xhr.send('');
            // const response = await fetch(`${SERVER_URL}/api/messenger/user-logout`, {
            //     method: 'POST',
            //     headers: {
            //         "Accept": "/",
            //         "Cache-Control": "no-cache",
            //         withCredentials: true,
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify(dummy_data)
            // })


            console.log(JSON.stringify(xhr))

            // if (response?.data?.success) {
            //     localStorage.removeItem('authToken');
            //     document.cookie = `authToken=null;max-age=0;`

            //     dispatch({
            //         type: LOGOUT_SUCCESS
            //     })
            // } else {
            //     console.error(`response in else statement of try block`, response)
            // }
        } catch (error) {
            console.error(error)
        }
    }
}