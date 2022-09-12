import { PRODUCTS } from '../db'

// itirate over the array, which is products in this case
// and filter all the unique categories
export function getCategories() {
  return PRODUCTS.map((product) => {
    return product.category
  }).filter((category, index, array) => {
    // filter out categories, that they have no duplicates
    return array.indexOf(category) === index
  })
}
