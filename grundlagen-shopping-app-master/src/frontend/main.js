import Alpine from 'alpinejs/dist/module.esm'
import './main.css'
import axios from 'axios'

window.Alpine = Alpine

const headers = { Authorization: '0' }

document.addEventListener('alpine:init', () => {
  window.products = {
    products: [],
    async init() {
      console.log('initating the products.')

      const result = await axios.get('http://localhost:3000/products')

      this.products = result.data
    }
  }

  window.user = {
    user: {},
    async init() {
      console.log('fetching our current user')
      const result = await axios.get('http://localhost:3000/user', { headers })

      this.user = result.data
    }
  }

  window.basket = Alpine.reactive({
    basket: [],
    async init() {
      try {
        const result = await axios.get('http://localhost:3000/basket/items', { headers })

        console.log('Fetching user basket items...')

        this.basket = result.data
      } catch (e) {
        console.error('Can not fetch user basket: ', e)
      }
    },
    async addToBasket({ itemId, qty }) {
      try {
        const result = await axios.post('http://localhost:3000/basket/add', { qty, itemId }, { headers })

        this.basket = result.data
      } catch (e) {
        console.error('Can not add items to the basket: ', e)
      }
    }
  })
})

Alpine.start()
