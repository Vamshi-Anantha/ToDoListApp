const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TodoModel = require('./Models/Todo');
const UserModel = require('./Models/User');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/todo-list', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Login route
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    UserModel.findOne({ username, password })
        .then(user => {
            if (user) {
                res.json({ message: 'Login successful', user: user });
            } else {
                res.status(401).json({ message: 'Invalid credentials' });
            }
        })
        .catch(err => res.status(500).json({ message: 'Error logging in', error: err }));
});

// Logout route
app.post('/logout', (req, res) => {
    // Clear any session or cookie data here
    res.json({ message: 'Logout successful' });
});

// Todo routes
app.get('/get/:userId', (req, res) => {
    const { userId } = req.params;
    TodoModel.find({ user: userId })
        .then(result => res.json(result))
        .catch(err => res.json(err));
});

app.put('/update/:id', (req, res) => {
    const { id } = req.params;
    const { done } = req.body;
    TodoModel.findByIdAndUpdate({ _id: id }, { done })
        .then(result => res.json(result))
        .catch(err => res.json(err));
});

app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    TodoModel.findByIdAndDelete({ _id: id })
        .then(result => res.json(result))
        .catch(err => res.json(err));
});

app.post('/add/:userId', (req, res) => {
    const { userId } = req.params;
    const { task } = req.body;
    TodoModel.create({
        task: task,
        user: userId
    })
        .then(result => res.json(result))
        .catch(err => res.json(err));
});

app.listen(3001, () => {
    console.log("Server is running");
});