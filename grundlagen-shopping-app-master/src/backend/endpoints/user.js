import { users } from '../db/users'
import { User } from '../entities'

// /api/users/:id
/**
 * @returns {User}
 */
export function getUserById(id) {
  return users.find((user) => user.id === id)
}

export function createNewUser({ username }) {
  const id = users[users.length - 1].id + 1

  if (!username) {
    throw new Error('Users should always have a username.')
  }

  // create a new user class and just add it to your users array
  const user = new User({ id, username })

  users.push(user)

  // return the user created
  return user
}
