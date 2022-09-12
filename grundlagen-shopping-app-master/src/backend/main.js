import { fetchProducts, PRODUCTS } from '@db'
import fastify from 'fastify'
import { User } from './entities/user.entitity'
import { users } from './db/users'
import { getCategories, getUserById, filter, createNewUser } from './endpoints'
import { addItemToBasket, getUserBasketItems, removeItemFromBasket } from './endpoints/basket'

export const server = fastify({ logger: true })

// request body, contains request stuff that the user passes us as mostly json
// request.params contains regular expression path matching /something/:qwe -> request.params.qwe
// request.query containers url extensions ?test=123&something=321 -> request.query.test = 123
// request.headers contains header properties -> you can access header data

server.register(require('fastify-cors'), {
  origin: '*'
  // put your options here
})

// Declare a route
server.get('/', async (request, reply) => {
  return { hello: 'world' }
})

server.get('/categories', async () => {
  return getCategories()
})

server.get('/products', async () => {
  return PRODUCTS
})

server.post('/filter', async (request) => {
  return filter(request.body)
})

server.get('/users/:id', async (request) => {
  return getUserById(parseInt(request.params?.id, 10))
})

server.get('/user', async (request) => {
  return getUserById(parseInt(request.headers.authorization, 10))
})

server.post('/user/create', async (request) => {
  return createNewUser({ username: request.body?.username })
})

server.get('/basket/items', async (request) => {
  // lets imagine that in headers there is Authorization header,
  // and in this header it provides us with the user id
  // just we dont have an authentication mechanism in place
  // but we are like pretending that it is there
  // header.authenorization should be our user id, but in real life it is usually the encrypted token that the backend can decrypt
  // but it does not make any sense to us ewt721832187ezdhasjnkdahsnkdsajdopqwuedqwoidcyscyxdaqws.8763112673esanjdas -> json web token
  return getUserBasketItems({ ...request.body, userId: request.headers.authorization })
})

server.post('/basket/add', async (request) => {
  return addItemToBasket({ ...request.body, userId: request.headers.authorization })
})

server.post('/basket/remove', async (request) => {
  return removeItemFromBasket({ ...request.body, userId: request.headers.authorization })
})

// server.post -> /user/create -> which will get function arguments as its body
// and create user by calling the function

async function bootstrap() {
  await fetchProducts()

  for (let index = 0; index < 5; index++) {
    users.push(new User({ id: index, username: 'user' + index }))
  }

  const user0 = getUserById(0)
  user0.addStoreCredits(1500)

  const user1 = getUserById(1)
  user1.addStoreCredits(2500)

  console.log('initated some mock user data', users)

  try {
    await server.listen(3000)
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}

bootstrap()
