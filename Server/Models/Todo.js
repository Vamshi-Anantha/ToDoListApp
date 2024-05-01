const mongoose = require('mongoose')

const TodoSchema = new mongoose.Schema({
    task: String,
    done: {
        type: Boolean,
        default: false
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' }
})

const TodoModel = mongoose.model("todos", TodoSchema)
module.exports = TodoModel








