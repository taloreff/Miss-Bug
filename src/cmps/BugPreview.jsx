

export function BugPreview({ bug }) {

    return <article >
        <h4>{bug.title}</h4>
        <h1>🐛</h1>
        {bug.severity && <p>Severity: <span>{bug.severity}</span></p>}
        {bug.description && <p>Description: <span>{bug.description}</span></p>}
    </article>
}