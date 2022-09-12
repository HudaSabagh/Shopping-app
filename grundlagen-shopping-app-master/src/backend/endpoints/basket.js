import { ShoppingBasket } from '../entities'
import { baskets } from '../db/basket'
import { getUserById } from './user'

/**
 * @returns {ShoppingBasket}
 */
export function getUserBasket({ userId }) {
  return baskets.find((b) => b.userId === userId)
}

export function getUserBasketItems({ userId }) {
  const items = getUserBasket({ userId })?.items

  return items ?? []
}

// add some entries to our users shopping basket
export function addItemToBasket({ userId, itemId, qty }) {
  // if the user has a basket inside our baskets
  // just fetch that basket
  // and use the class functions that we have defined
  // addItemToShoppingBasket -> to pass in a item to our shopping basket
  // we will not pass in any kind of userid to shoppingbasket
  // but we will use it for ourselves
  // where we want to go through the basket and find the basket of the user
  // and if it does not exist create new ShoppingBasket
  let basket = getUserBasket({ userId })

  if (!basket) {
    baskets.push(new ShoppingBasket({ userId }))

    basket = getUserBasket({ userId })
  }

  basket.addItemToShoppingBasket(itemId, qty)

  return basket.items
}

// remove item from the basket
export function removeItemFromBasket({ userId, itemId, qty }) {
  // if user has a basket
  // we call our class function selecting that basket finding our array which is our mock database
  // removeItemFromBasket
  // but again we will use userId oursevles to find the users basket
  // if the user does not have a basket yet,
  // then we can throw out an error
  const basket = getUserBasket({ userId })

  if (!basket) {
    throw new Error(`User with ${userId} does not have a basket yet.`)
  }

  basket.removeItemFromShoppingBasket(itemId, qty)

  return basket.items
}
