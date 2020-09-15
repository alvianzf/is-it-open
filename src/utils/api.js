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

export const getRestaurantsByName = (name) => {
    return axios({
        method : 'GET',
        headers : {
            'Accept' : 'application/json'
        },
        url: `${baseURL}restaurant/name/${name}?limit=5`
    })
}

export const getRestaurantsByTime = (time, day = null, page) => {
    return axios({
        method : 'GET',
        headers : {
            'Accept' : 'application/json'
        },
        url: `${baseURL}restaurant/time/${time}?page=${page}${day ? "&day=" + day : "" }?`
    })
}

export const deleteRestaurant = _id => {
    return axios({
        method: 'DELETE',
        headers: {
            'Accept' : 'application/json'
        },
        url: `${baseURL}restaurant/${_id}`
    })
}