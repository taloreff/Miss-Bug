import React, { useEffect, useState } from "react";

export function BugFilter({ filterBy, onSetFilterBy }) {
  const [filterByToEdit, setFilterByToEdit] = useState(filterBy);
  const [titleValue, setTitleValue] = useState('');
  const [severityValue, setSeverityValue] = useState('');
  const [labelsValue, setLabelsValue] = useState([]);

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

    if (field === 'labels') {
      // Convert selected options to an array
      const selectedOptions = Array.from(target.selectedOptions, option => option.value);
      value = selectedOptions;
    }

    setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }));

    if (field === 'title') {
      setTitleValue(value);
    } else if (field === 'severity') {
      setSeverityValue(value);
    } else {
      setLabelsValue(value);
    }
  }

  function onSubmitFilter(ev) {
    ev.preventDefault();
    onSetFilterBy(filterByToEdit);
  }

  function clearFilter() {
    setFilterByToEdit({ title: '', severity: '', labels: [] });
    setTitleValue('');
    setSeverityValue('');
    setLabelsValue([]);
  }

  const labelOptions = [
    'Bug',
    'High Priority',
    'need-CR',
    'dev-branch',
    'Medium Priority',
    'critical',
    'Low Priority',
    'prod-branch'
  ];

  return (
    <section className="bug-filter">
      <h2>Filter Bugs</h2>
      <form onSubmit={onSubmitFilter}>
        <label htmlFor="title">Title: </label>
        <input
          value={titleValue}
          type="text"
          placeholder="By title"
          id="title"
          name="title"
          onChange={handleChange}
        />
        <label htmlFor="severity">Severity: </label>
        <input
          value={severityValue}
          type="number"
          placeholder="By severity"
          id="severity"
          name="severity"
          onChange={handleChange}
        />
        <label htmlFor="labels">Labels: </label>
          <select
            id="labels"
            name="labels"
            onChange={handleChange}
            multiple  // Allow multiple selections
          >
            {labelOptions.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        <button type="submit">Set Filter</button>
        <button type="button" onClick={clearFilter}>Clear Filter</button>
      </form>
    </section>
  );
}
