const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: String,
    password: String
})

const UserModel = mongoose.model("users", UserSchema)

// Seed the initial users
const initialUsers = [
  {
    username: 'Vamshi',
    password: 'Vamshi@123'
  },
  {
    username: 'Anantha',
    password: 'Anantha@123'
  }
];

initialUsers.forEach(user => {
    UserModel.findOne({ username: user.username })
        .then(existingUser => {
            if (!existingUser) {
                UserModel.create(user)
                    .then(createdUser => console.log(`Created user: ${createdUser.username}`))
                    .catch(err => console.error(`Error creating user: ${err}`));
            }
        })
        .catch(err => console.error(`Error finding user: ${err}`));
});

module.exports = UserModel
