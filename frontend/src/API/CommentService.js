import axios from "axios"

const BASE_URL = "http://localhost:8000/api/v1/time-tracker/"

export async function getComments(id, header) {
    const response = await axios.get(`${BASE_URL}task/${id}`, {
        headers: header 
    })
    return response.data
}

export async function postComment(_id, data, header) {
    const response = await fetch(`${BASE_URL}comment`,  {
        method: 'POST',
        headers: header,
        body: JSON.stringify(data)
    })
    return response.json()
}

export async function updateCommentById(id, header, data) {
    const response = await axios.put(`${BASE_URL}comment/${id}`, data, {
        headers: header,
        body: JSON.stringify(data)
    })
    console.log(id)
    return response.data
}


export async function delComment(id, header) {
    await axios.delete(`${BASE_URL}comment/${id}`, {
       headers: header
    })
}
