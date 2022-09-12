// api/filter -> people do some kind of http request
import { PRODUCTS } from '@db'

// filter them by ratings
// args = { ratings: { $gt: number, $lt: number }, categories: string[], price: { $gt: number, $lt: number } }
// the idea is we can have as many filters as the users wants
export function filter(args) {
  console.log('the user passes us a filter query', args)

  let filteredValue = PRODUCTS

  if (args?.categories && args.categories.length > 0) {
    filteredValue = filteredValue.filter((product) => {
      return args.categories.includes(product.category)
    })
  }

  if (args?.ratings?.$gt) {
    // if (!(args.ratings.$gt >= 0 && args.ratings.$gt <= 5)) {
    if (typeof args.ratings.$gt !== 'number' || args.ratings.$gt < 0 || args.ratings.$gt > 5) {
      // throw is another keyword to stop the execution and tell the user there is an error
      throw new Error('the parameter defined for ratings.$gt is not valid')

      // catch -> because its throwing us something
      // try {} catch {}
    }

    filteredValue = filteredValue.filter((product) => {
      return product.rating.rate >= args.ratings.$gt
    })
  }

  // ratings should be from 0-5, what if the user gives us something irrelevant so 100, -100
  if (args?.ratings?.$lt) {
    if (typeof args.ratings.$lt !== 'number' || args.ratings.$lt < 0 || args.ratings.$lt > 5) {
      // throw is another keyword to stop the execution and tell the user there is an error
      throw new Error('the parameter defined for ratings.$gt is not valid')

      // catch -> because its throwing us something
      // try {} catch {}
    }

    filteredValue = filteredValue.filter((product) => {
      return product.rating.rate <= args.ratings.$lt
    })
  }

  // negative logic, that we want to check for the conditions, that we want to make it fail
  // if it does not fail in the conditions that we try it with, then it should be true
  // if (args?.ratings) {
  //   filteredValue = filteredValue.filter((product) => {
  //     if (args.ratings?.$gt && args.ratings.$gt > product.rating.rate) {
  //       return false
  //     }

  //     if (args.ratings?.$lt && args.ratings.$lt < product.rating.rate) {
  //       return false
  //     }

  //     return true
  //   })
  // }

  if (args?.price?.$gt) {
    filteredValue = filteredValue.filter((product) => {
      return product.price >= args.price.$gt
    })
  }

  if (args?.price?.$lt) {
    filteredValue = filteredValue.filter((product) => {
      return product.price <= args.price.$lt
    })
  }

  return filteredValue
}
