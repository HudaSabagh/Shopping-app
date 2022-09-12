import { filter, getCategories } from '../backend/endpoints'
import { frontendTableOfProducts } from './utils'

/**
 * our applications client, mobile/web based
 */
export function frontend() {
  // browser, frontend -> /api/categories GET request?
  // frontend will return all the available categories from the products in a unique manner having no duplicates
  const categories = getCategories()

  console.log('| Categories |')
  categories.forEach((category) => console.log('[ ]', category))

  // the user goes ahead and puts selection like X on to the boxes of men's clothing and electronics

  // browser, frontend -> /api/filter -> {}
  // then frontend decides how to show that filtered products that return from that endpoint
  let userFilter = {}

  userFilter = { ...userFilter, categories: [categories[0], categories[2]] }
  const productsFilteredByCategories = filter(userFilter)

  frontendTableOfProducts(productsFilteredByCategories)

  console.log('| Ratings |')
  console.log('[     o-o ]')
  console.log('0 1 2 3 4 5')

  try {
    userFilter = { ...userFilter, ratings: { $gt: 3, $lt: 5 } }
    const productsFilteredByRating = filter(userFilter)

    frontendTableOfProducts(productsFilteredByRating)
  } catch (e) {
    console.error('i could not filter products by rating', e.message)
  }

  console.log('| Price |')
  console.log('[     o--------------------------------o ]')
  console.log('0 100 200 300 400 500 600 700 800 900 1000')

  try {
    userFilter = { ...userFilter, price: { $gt: 100, $lt: 500 } }
    const productsFilteredByPrice = filter(userFilter)

    frontendTableOfProducts(productsFilteredByPrice)
  } catch (e) {
    console.error('i could not filter products by price', e.message)
  }
}
