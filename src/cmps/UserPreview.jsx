

export function UserPreview({ user }) {

    return <article >
        <h1>👤</h1>
        {user.fullname && <p>Full Name: <span>{user.fullname}</span></p>}
        {user.score && <p>Score: <span>{user.score}</span></p>}
    </article>
}