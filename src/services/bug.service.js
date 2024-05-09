import Axios from 'axios'

var axios = Axios.create({
    withCredentials: true
}) 

var BASE_URL = 'http://127.0.0.1:5050/api/bug/'

if (process.env.NODE_ENV === 'production'){
    BASE_URL = 'https://miss-bug-8b2w.onrender.com/api/bug'
}

export const PAGE_SIZE = 5

export const bugService = {
    query,
    getById,
    save,
    remove,
    getEmptyBug,
    getDefaultFilter
}

async function query(filterBy = {}) {
    let { data: bugs } = await axios.get(BASE_URL, { params: filterBy })
    return bugs
}

async function getById(bugId) {
    const { data: bug } = await axios.get(BASE_URL + bugId)
    return bug
}

async function remove(bugId) {
    return axios.delete(BASE_URL + bugId)
}

async function save(bug) {
    let savedBug;
    if(bug._id) {
        ({ data: savedBug } = await axios.put(BASE_URL + bug._id, bug));
    } else {
        ({ data: savedBug } = await axios.post(BASE_URL, bug));
    }

    return savedBug;
}

function getEmptyBug(title = '', severity = '', description = '', labels = []) {
    return { title, severity, description, labels };
}

function getDefaultFilter() {
    return { title: '', severity: '', labels: []}
}

