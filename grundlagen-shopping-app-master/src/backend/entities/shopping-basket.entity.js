import { PRODUCTS } from '../db'

export class ShoppingBasket {
  // we can say we attach some kind of user by its id to every shopping basket
  userId
  // we will have some items in our shopping basket
  // { itemId: id, qty: if it is defined and positive thats okay, elsewise it will just be 1 }
  #items = []

  constructor({ userId }) {
    this.userId = userId
  }

  // should return the private items in this basket
  get items() {
    return this.#items
  }

  // add item to shopping basket
  addItemToShoppingBasket(itemId, qty = 1) {
    // * if we have already the itemId inside our basket
    // * #items.find -> if we have it, just increase the qty by the given amount
    // * if it does not exist yet in our array the item with the given itemId we will just push new item to our array
    // * if it is not defined at all -> we will just assume the qty = 1
    // * quick hint, we can define defaults for the arguments in our function initialization
    // if qty is not positive we can just throw out an error of some sort warning the user
    // * qty -> defined and positive we will add the given qty
    // * items = [ {itemId: 1, qty: 123}, 1 ]
    if (qty <= 0) {
      throw new Error('ARG_ERROR: quantity should be something positive.')
    }

    if (!PRODUCTS.find((product) => product.id === itemId)) {
      throw new Error('This item does not exists in our database.')
    }

    const item = this.#items.find((item) => item.itemId === itemId)

    if (!item) {
      this.#items.push({ itemId, qty })
    } else {
      item.qty += qty
    }
  }

  removeItemFromShoppingBasket(itemId, qty) {
    // * if we have the item in the basket remove that specific one
    // but taking in hand the qty given
    // { itemId: 1, qty: 5} -> removeItemFromShoppingBasket(1, 3) -> { itemId: 1, qty: 2 }
    // { itemId: 1, qty: 5 } -> removeItemFromShoppingBasket(1) -> {}
    // * in this case if user gives us quantity we will remove the quantity from the basket
    // * elsewise we will just remove the item as a whole
    // { itemId: 1, qty: 5 } -> removeItemFromShoppingBasket(1, 100) -> { itemId: 1, qty: -95 } -> if the qty also goes negative afterwards removing it or even 0
    //  just again remove the item completely

    // it returns minus one if the item is not found
    const itemIndex = this.#items.findIndex((item) => item.itemId === itemId)

    if (itemIndex < 0) {
      throw new Error(`Given item with id ${itemId} is not already in your basket.`)
    }

    if (typeof qty === 'undefined') {
      this.#items.splice(itemIndex, 1)
    } else {
      if (qty <= 0) {
        throw new Error('quantity should be a positive integer.')
      }

      const item = this.#items[itemIndex]

      const newqty = item.qty - qty

      if (newqty <= 0) {
        this.#items.splice(itemIndex, 1)
      } else {
        item.qty = newqty
      }
    }
  }
}
