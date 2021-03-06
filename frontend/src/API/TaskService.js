import axios from "axios"

const BASE_URL = "http://localhost:8000/api/v1/time-tracker/"
       export async function getAll(header) {
            const response = await axios.get(`${BASE_URL}task?page=1`, {
                headers: header 
            })
            return response.data
        }
        export async function getPage(currentPage, header) {
            const response = await axios.get(`${BASE_URL}task?page=${currentPage}`, {
                headers: header 
            })
            return response.data
        }

        export async function postTask(data, header) {
            const response = await fetch(`${BASE_URL}task`, {
                method: 'POST',
                headers: header,
                body: JSON.stringify(data)
            })
            return response.json()
        }
        export async function getById(id, header) {
            const response = await axios.get(`${BASE_URL}task/${id}`, {
                headers: header
            })
            return response.data
        }
        export async function delById(id, header) {
            await axios.delete(`${BASE_URL}task/${id}`, {
               headers: header
            })
        }

        export async function updateById(id, header, data) {
            const response = await axios.put(`${BASE_URL}task/${id}`, data, {
                headers: header,
                body: JSON.stringify(data)
            })
            return response.data
        }





