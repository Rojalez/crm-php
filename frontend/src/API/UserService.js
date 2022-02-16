import axios from "axios"

const BASE_URL = "http://localhost:8000/api/v1/time-tracker/"    
        export async function getUsers(header) {
            const response = await axios.get(`${BASE_URL}user`, {
                headers: header
            })
            return response.data
        }

        export async function getUserById(header, id) {
            const response = await axios.get(`${BASE_URL}user/${id}`, {
                headers: header
            })
            
            return response.data
        }

