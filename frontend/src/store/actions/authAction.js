import axios from 'axios'

const SERVER_URL = import.meta.env.SERVER_URL || 'http://127.0.0.1:5000'

export const userRegister = (data) => {
    return async (dispatch) => {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        try {
            const response = await axios.post(`${SERVER_URL}/api/messenger/user-register`,data,config)
            console.log(`Response Data is ${response.data}`)

        } catch(error) {
            console.log(`${error.response?.data?.error?.errorMessage ?? `Unknown Error`}`)
            // alert(`${error.response?.data?.error?.errorMessage ?? `Unknown Error`}`)

        }
    }
}