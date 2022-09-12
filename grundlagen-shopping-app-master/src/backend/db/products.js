import axios from 'axios'

export let PRODUCTS

export async function fetchProducts() {
  const products = await axios.get('https://fakestoreapi.com/products')

  PRODUCTS = products.data

  console.log('i have fetched the products from the api and writing them to our product db')
}
