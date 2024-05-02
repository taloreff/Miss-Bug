import fs from 'fs'
import ms from 'ms'
import { utilService } from "./util.service.js"

const isRender = JSON.parse(process.env.IS_RENDER)
const basePath = isRender ? '' : 'backend/'
const bugs = utilService.readJsonFile(basePath + 'data/data.json');

export const bugService = {
    query,
    getById,
    remove,
    save
}

async function query() {
    try {
        return bugs
    } catch (error) {
        throw error
    }
}

async function getById(bugId) {
    try {
        const bug = bugs.find(bug => bug._id === bugId)
        return bug
    } catch (error) {
        throw error
    }
}


async function remove(bugId) {
    try {
        const bugIdx = bugs.findIndex(bug => bug._id === bugId)
        bugs.splice(bugIdx, 1)
        _saveBugsToFile()
    } catch (error) {
        throw error
    }
}


async function save(bugToSave) {
    try {
        if (bugToSave._id) {
            const idx = bugs.findIndex(bug => bug._id === bugToSave._id)
            if (idx < 0) throw `Cant find bug with _id ${bugToSave._id}`
            bugs[idx] = bugToSave
        } else {
            bugToSave._id = utilService.makeId()
            const currentTime = Date.now();
            bugToSave.createdAt = currentTime
            bugs.push(bugToSave)
        }
        await _saveBugsToFile()
        return bugToSave
    } catch (error) {
        throw error
    }
}


function _saveBugsToFile(path) {
    if (!path) path = basePath + 'data/data.json'
    return new Promise((resolve, reject) => {
        const data = JSON.stringify(bugs, null, 4)
        fs.writeFile(path, data, (err) => {
            if (err) return reject(err)
            resolve()
        })
    })
}