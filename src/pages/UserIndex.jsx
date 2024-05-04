import { userService } from '../services/user.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { UserList } from '../cmps/UserList.jsx'
import { useState, useCallback, useEffect } from 'react'
import {utilService} from '../services/util.service.js'

export function UserIndex() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const usersData = await userService.query()
      setUsers(usersData);
      setIsLoading(false);
    } catch (error) {
        console.log('Error from loadUsers ->', error);
        showErrorMsg('Cannot load users');
    }
  };

  async function onRemoveUser(userId) {
    try {
      await userService.remove(userId)
      console.log('Deleted Succesfully!')
      setUsers(prevUsers => prevUsers.filter((user) => user._id !== userId))
      showSuccessMsg('User removed')
    } catch (err) {
      console.log('Error from onRemoveUser ->', err)
      showErrorMsg('Cannot remove user')
    }
  }

  async function onAddUser() {
    const user = {
      fullname: prompt('Full name?'),
    }
    while (isNaN(user.score)) {
      const score = prompt('Score?') || '';
      if (score.trim() === '' || isNaN(+score) ) {
          alert('Please enter a number for score.');
      } else {
          user.score = +score;
      }
  }
    try {
      const savedUser = await userService.save(user)
      console.log('Added User', savedUser)
      setUsers(prevUsers => [...prevUsers, savedUser])
      showSuccessMsg('User added')
    } catch (err) {
      console.log('Error from onAddUser ->', err)
      showErrorMsg('Cannot add user')
    }
  }

  async function onEditUser(user) {
    let fullname = prompt('New full name?')
    const score = +prompt('New score?')
    if(!fullname){
        fullname = user.fullname
    }
    const userToSave = { ...user, score, fullname }
    try {

      const savedUser = await userService.save(userToSave)
      console.log('Updated user:', savedUser)
      setUsers(prevUsers => prevUsers.map((currUser) =>
      currUser._id === savedUser._id ? savedUser : currUser
      ))
      showSuccessMsg('user updated')
    } catch (err) {
      console.log('Error from onEdituser ->', err)
      showErrorMsg('Cannot update user')
    }
  }

  return (
    <main className="bug-index">
      <h3>Users</h3>
      <main>
        <button className='add-btn' onClick={onAddUser}>Add user 👤</button>
        <UserList users={users} onRemoveUser={onRemoveUser} onEditUser={onEditUser} />
      </main>
    </main>
  )
}