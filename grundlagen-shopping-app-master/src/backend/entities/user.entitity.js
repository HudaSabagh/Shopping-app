// i will not complicate it to much,
// so we wont have a separate method of payment
// we will just have a balance in user
// think of it as store credits
export class User {
  // unique idintifier field -> numbers
  id
  // username -> string
  username
  // private field which is balance -> does not have direct access to balance -> number
  #balance

  constructor({ id, username }) {
    this.id = id
    this.username = username

    this.#balance = 0
    // our arguments should be a object
    // if we destructure it as an argument, it will have some autocompletion when we say new User
  }

  set balance(val) {
    console.log('The user tried to change the balance with:', val)
    throw new Error('You can not do that!')
  }

  get balance() {
    return this.#balance
  }

  // just will add some balance to our user
  addStoreCredits(credits) {
    this.#balance += credits
  }

  // which should detuct from our balance,
  // and throw out an error if the user balance is not sufficient
  useStoreCredits(credits) {
    if (this.#balance < credits) {
      throw new Error(`User balance is not sufficient. Current balance is only ${this.#balance} while user is trying to spend ${credits}.`)
    }

    this.#balance -= credits
  }
}
