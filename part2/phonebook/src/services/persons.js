import axios from 'axios'

const baseURL = "http://localhost:3001/persons"

const getAll = () => {
    const request = axios.get(baseURL);

    return request.then(response => response.data);
}

const update = (id, newObject) => {
    const url = `${baseURL}/${id}`;
    
    return axios.put(url, newObject).then(response => response.data);
}

const create = (newObject) => {
    return axios.post(baseURL, newObject).then(response => response.data);
}

export {getAll, update, create};