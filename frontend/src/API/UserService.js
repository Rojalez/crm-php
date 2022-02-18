import axios from "axios"

const BASE_URL = "http://localhost:8000/api/v1/"    
        export async function getUsers(header) {
            const response = await axios.get(`${BASE_URL}time-tracker/user`, {
                headers: header
            })
            return response.data
        }

        export async function getUser(header) {
            const response = await axios.get(`${BASE_URL}user`, {
                headers: header
            })
            // console.log(response.data)
            return response.data
        }

