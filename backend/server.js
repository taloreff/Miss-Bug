import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import { bugService } from './services/bug.service.js'
import { loggerService } from './services/logger.service.js'
import path from 'node:path'
import dotenv from 'dotenv'

dotenv.config()
const app = express()

const corsOptions = {
    origin: [
        'http://127.0.0.1:5173',
        'http://127.0.0.1:3000',
        'http://localhost:5173',
        'http://localhost:3000'
    ],
    credentials: true
}

app.use(cookieParser())
app.use(cors(corsOptions))

// app.get('/', (req,res) => res.send('Hello there'))

app.get('/api/bug', async (req, res) => {
    try {
        const bugs = await bugService.query()
        res.send(bugs)
    } catch (error) {
        loggerService.error(`Could'nt get bugs`, error)
        res.status(400).send(`Could'nt get bugs`)
    }
})

app.get('/api/bug/:bugId/remove', async (req, res) => {
    try {
        const bugId = req.params.bugId
        await bugService.remove(bugId)
        res.send('deleted')
    } catch (error) {
        loggerService.error(`Could'nt remove bug`, error)
        res.status(400).send(`Could'nt remove bug`)
    }
})

app.get('/api/bug/save', async (req, res) => {
    try {
        let bugToSave = {
            _id: req.query._id,
            title: req.query.title,
            severity: req.query.severity,
            description: req.query.description,
            createdAt: req.query.createdAt
        }

        bugToSave = await bugService.save(bugToSave)
        res.send(bugToSave)
    } catch (error) {
        loggerService.error(`Could'nt save bug`, error)
        res.status(400).send(`Could'nt save bug`)
    }
})

app.get('/api/bug/:bugId', async (req, res) => {
    try {
        const bugId = req.params.bugId
        console.log('bugId:', bugId)
        const bug = await bugService.getById(bugId)
        console.log('bug:', bug)
        res.send(bug)
    } catch (error) {
        loggerService.error(`Could'nt get bug`, error)
        res.status(400).send(`Could'nt get bug`)
    }
})

const port = process.env.PORT || 3030
app.listen(port, () => loggerService.info(`Server listening on port http://127.0.0.1:${port}/`))