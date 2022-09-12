// our users will be an array of User class, that we will define
// sql based databases -> table-row kind of architecture
// user table -> id | email               | activated
//                1 |  user1@something.com | true
//                2 |  user2@something.com | true
// db.getAllUsers -> mock function
// [
//   { id: 1, email: 'user1@something.com', activated: true }
//   { id: 2, email: 'user2@something.com', activated: true }
// ]

// whenever we import users, with the require or import statements, it will just run all the code inside that file
export const users = []
