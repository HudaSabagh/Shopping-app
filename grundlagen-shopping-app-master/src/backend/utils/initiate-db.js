import { users } from '../db'
import { getUserById } from '../endpoints'
import { User, ShoppingBasket } from '../entities'
import { fetchProducts } from '../db'

/** we have our implementations to due stuff */

/** initiation functions for our small little mock database */
// we will implement something here so that we have some set of users
export async function initDB() {
  await fetchProducts()

  console.log('i have fetched the products from the api and contuning')

  for (let index = 0; index < 5; index++) {
    users.push(new User({ id: index, username: 'user' + index }))
  }

  const user0 = getUserById(0)
  user0.addStoreCredits(1500)

  const user1 = getUserById(1)
  user1.addStoreCredits(2500)

  console.log('Our current initiated database of the users:', users)
}
