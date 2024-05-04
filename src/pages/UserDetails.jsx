
import { useState } from 'react'
import { userService } from '../services/user.service.js'
import { showErrorMsg } from '../services/event-bus.service.js'
import { useParams } from 'react-router'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'


export function UserDetails() {

    const [user, setUser] = useState(null)
    const { userId } = useParams()

    useEffect(() => {
        loadUser()
    }, [])

    async function loadUser() {
        try {
            const user = await userService.getById(userId)
            setUser(user)
        } catch (err) {
            showErrorMsg('Cannot load user')

        }
    }

    if (!user) return <h1>loadings....</h1>
    return <div className="bug-details container">
        <h3>User Details</h3>
        <p>Full name: <span>{user.fullname}</span></p>
        <p>Score: <span>{user.score}</span></p>
        <Link to="/user">Back to List</Link>
    </div>

}

