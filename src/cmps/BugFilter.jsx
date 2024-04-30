import { useEffect, useState } from "react";

export function BugFilter({ filterBy, onSetFilterBy }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy);
    const [titleValue, setTitleValue] = useState('');
    const [severityValue, setSeverityValue] = useState('');

    useEffect(() => {
        onSetFilterBy(filterByToEdit);
    }, [filterByToEdit]);

    function handleChange({ target }) {
        const field = target.name;
        let value = target.value;

        switch (target.type) {
            case 'number':
                value = +value || '';
                break;
            default:
                break;
        }

        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))

        if (field === 'title') {
            setTitleValue(value);
        } else {
            setSeverityValue(value);
        }
    }

    function onSubmitFilter(ev) {
        ev.preventDefault();
        onSetFilterBy(filterByToEdit);
    }

    function clearFilter() {
        setFilterByToEdit({
            title: '',
            severity: ''
        });
        setTitleValue('');
        setSeverityValue('');
    }

    return (
        <section className="bug-filter">
            <h2>Filter Bugs</h2>
            <form onSubmit={onSubmitFilter}>
                <label htmlFor="title">Title: </label>
                <input value={titleValue} onChange={handleChange} type="text" placeholder="By title" id="title" name="title" />

                <label htmlFor="severity">Severity: </label>
                <input value={severityValue} onChange={handleChange} type="number" placeholder="By severity" id="severity" name="severity" />

                {/* <button>Set Filter</button> */}
                <button type="button" onClick={clearFilter}>Clear Filter</button>
            </form>
        </section>
    );
}
