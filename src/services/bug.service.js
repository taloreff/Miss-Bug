import Axios from 'axios'

var axios = Axios.create({
    withCredentials: true
}) 

const BASE_URL = 'http://127.0.0.1:5050/api/bug/'

export const bugService = {
    query,
    getById,
    save,
    remove,
    getEmptyBug,
    getDefaultFilter
}

async function query(filterBy = {}) {
    let { data: bugs } = await axios.get(BASE_URL)

    if (filterBy.title) {
        const regExp = new RegExp(filterBy.title, 'i')
        bugs = bugs.filter(bug => regExp.test(bug.title))
    }

    if (filterBy.severity) {
        bugs = bugs.filter(bug => bug.severity >= filterBy.severity)
    }
    return bugs
}

async function getById(bugId) {
    const { data: bug } = await axios.get(BASE_URL + bugId)
    return bug
}

async function remove(bugId) {
    return axios.get(BASE_URL + bugId + '/remove')
}

async function save(bug) {
    const queryParams = `?_id=${bug._id || ''}&title=${bug.title}&severity=${bug.severity}&description=${bug.description}`
    const { data: savedBug } = await axios.get(BASE_URL + 'save' + queryParams)
    return savedBug
}

function getEmptyBug(title = '', severity = '', description = '') {
    return { title, severity, description }
}

function getDefaultFilter() {
    return { title: '', severity: ''}
}

