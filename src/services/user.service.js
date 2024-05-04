import Axios from 'axios'

var axios = Axios.create({
    withCredentials: true
}) 

var BASE_URL = 'http://127.0.0.1:5050/api/user/'

if (process.env.NODE_ENV === 'production'){
    BASE_URL = 'https://miss-bug-8b2w.onrender.com/#/'
}

export const PAGE_SIZE = 5

export const userService = {
    query,
    getById,
    save,
    remove,
    getEmptyUser,
    getDefaultFilter
}

async function query() {
    let { data: users } = await axios.get(BASE_URL)
    return users
}

async function getById(userId) {
    const { data: user } = await axios.get(BASE_URL + userId)
    return user
}

async function remove(userId) {
    return axios.delete(BASE_URL + userId)
}

async function save(user) {
    let savedUser;
    if(user._id) {
        ({ data: savedUser } = await axios.put(BASE_URL + user._id, user));
    } else {
        ({ data: savedUser } = await axios.post(BASE_URL, user));
    }

    return savedUser;
}

function getEmptyUser(fullname = '', username = '', password = '', score = 0) {
    return { fullname, username, password, score };
}

function getDefaultFilter() {
    return { fullname: '', username: '', score: 0}
}

