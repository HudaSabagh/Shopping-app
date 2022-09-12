import { baskets, PRODUCTS } from '@db'
import { getUserById } from './backend/endpoints'
import { addItemToBasket, getUserBasket, getUserBasketItems } from './backend/endpoints/basket'
import { initDB } from './backend/utils'
import { frontend } from './frontend'

/**
 * we had our backend part of the application
 */

/**
 * our whole application in a sense,
 */
async function bootstrap() {
  // this is to like mock our data first
  // so that we have some kind of backend going on before frontend calls anything
  await initDB()

  const user0 = getUserById(0)

  addItemToBasket({ userId: user0.id, itemId: 20, qty: 50 })
  addItemToBasket({ userId: user0.id, itemId: 2 })
  addItemToBasket({ userId: user0.id, itemId: 3 })

  console.log(getUserBasketItems({ userId: user0.id }))

  // mocking how a user interacts with our functions
  // frontend()
}

bootstrap()
