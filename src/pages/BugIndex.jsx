import { bugService } from '../services/bug.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { BugList } from '../cmps/BugList.jsx'
import { useState, useCallback, useEffect } from 'react'
import { BugFilter } from '../cmps/BugFilter.jsx'
import {utilService} from '../services/util.service.js'

export function BugIndex() {
  const [bugs, setBugs] = useState([])
  const [filterBy, setFilterBy] = useState(bugService.getDefaultFilter())
  const [pageIdx, setPageIdx] = useState(0);

  const debouncedSetFilterBy = 
        useCallback(utilService.debounce(onSetFilterBy, 1000), [])
        
  useEffect(() => {
    loadBugs()
  }, [filterBy,pageIdx])

  async function loadBugs() {
    try {
      const filteredBugs = await bugService.query({ ...filterBy, pageIdx });
      setBugs(filteredBugs);
    } catch (err) {
      console.log('Error from loadBugs ->', err);
      showErrorMsg('Cannot load bugs');
    }
  }
  

  async function onRemoveBug(bugId) {
    try {
      await bugService.remove(bugId)
      console.log('Deleted Succesfully!')
      setBugs(prevBugs => prevBugs.filter((bug) => bug._id !== bugId))
      showSuccessMsg('Bug removed')
    } catch (err) {
      console.log('Error from onRemoveBug ->', err)
      showErrorMsg('Cannot remove bug')
    }
  }

  async function onAddBug() {
    const bug = {
      title: prompt('Bug title?'),
      description: prompt('Bug description?')
    }
    while (isNaN(bug.severity)) {
      const severityInput = prompt('Bug severity?') || '';
      if (severityInput.trim() === '' || isNaN(+severityInput) ) {
          alert('Please enter a number for bug severity.');
      } else {
          bug.severity = +severityInput;
      }
  }
    try {
      const savedBug = await bugService.save(bug)
      console.log('Added Bug', savedBug)
      setBugs(prevBugs => [...prevBugs, savedBug])
      showSuccessMsg('Bug added')
    } catch (err) {
      console.log('Error from onAddBug ->', err)
      showErrorMsg('Cannot add bug')
    }
  }

  async function onEditBug(bug) {
    const severity = +prompt('New severity?')
    let description = prompt('New description?')
    if(!description){
      description = bug.description
    }
    const bugToSave = { ...bug, severity, description }
    try {

      const savedBug = await bugService.save(bugToSave)
      console.log('Updated Bug:', savedBug)
      setBugs(prevBugs => prevBugs.map((currBug) =>
        currBug._id === savedBug._id ? savedBug : currBug
      ))
      showSuccessMsg('Bug updated')
    } catch (err) {
      console.log('Error from onEditBug ->', err)
      showErrorMsg('Cannot update bug')
    }
  }

  function onSetFilterBy(filterBy) {
    setPageIdx(0)
    setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
  }

  function nextPage() {
    setPageIdx(prevPageIdx => prevPageIdx + 1);
  }

  function prevPage() {
    setPageIdx(prevPageIdx => Math.max(prevPageIdx - 1, 0));
  }
  return (
    <main className="bug-index">
      <h3>Bugs App</h3>
      <main>
        <BugFilter filterBy={filterBy} onSetFilterBy={debouncedSetFilterBy} />
        <button className='add-btn' onClick={onAddBug}>Add Bug ⛐</button>
        <BugList bugs={bugs} onRemoveBug={onRemoveBug} onEditBug={onEditBug} />
        <div>
          <button disabled={pageIdx === 0} onClick={prevPage}>Previous</button>
          <button onClick={nextPage}>Next</button>
        </div>
      </main>
    </main>
  )
}
