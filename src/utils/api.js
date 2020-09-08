import axios from "axios"

axios.create({
    baseURL: 'https://be-todo.herokuapp.com/api/',
    /* other custom settings */
  });

const baseURL= 'https://be-todo.herokuapp.com/api/';

export const getRestaurants = (limit, offset) => {
    return axios({
        method : 'GET',
        headers : {
            'Accept' : 'application/json'
        },
        url: `${baseURL}restaurant?limit=${limit}&offset=${offset}`
    })
}