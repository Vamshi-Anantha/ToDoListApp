import React, { useEffect, useState } from 'react';
import Create from './Create';
import axios from 'axios';
import { BsCircleFill } from 'react-icons/bs';
import { BsFillTrashFill } from 'react-icons/bs';
import { BsFillCheckCircleFill } from 'react-icons/bs';

function Home({ user, onLogout }) {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        fetchTodos();
    }, [user]);

    const fetchTodos = () => {
        axios.get(`http://localhost:3001/get/${user._id}`)
            .then(result => setTodos(result.data))
            .catch(err => console.log(err));
    };

    const handleEdit = (todo) => {
        axios.put(`http://localhost:3001/update/${todo._id}`, { done: !todo.done })
            .then(result => {
                setTodos(todos.map(t => t._id === todo._id ? result.data : t));
            })
            .catch(err => console.log(err));
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3001/delete/${id}`)
            .then(result => {
                setTodos(todos.filter(t => t._id !== id));
            })
            .catch(err => console.log(err));
    };

    const handleAdd = (newTask) => {
        axios.post(`http://localhost:3001/add/${user._id}`, { task: newTask.task })
            .then(result => {
                setTodos([...todos, result.data]);
            })
            .catch(err => console.log(err));
    };

    const handleLogout = () => {
        onLogout(); // Clear the user state
    };

    return (
        <div className='home-container'>
            <div className='home-header'>
                <h1>Welcome, {user.username}!</h1>
                <button className='logout-btn' onClick={handleLogout}>
                    Logout
                </button>
            </div>
            <div className='todo-container'>
                <Create onAdd={handleAdd} user={user} />
                <br />
                {
                    todos.length === 0
                        ?
                        <div><h2>No Record</h2></div>
                        :
                        todos.map(todo => (
                            <div className='task' key={todo._id}>
                                <div className='checkbox' onClick={() => handleEdit(todo)}>
                                    {todo.done ?
                                        <BsFillCheckCircleFill className='icon'></BsFillCheckCircleFill>
                                        : <BsCircleFill className='icon' />
                                    }
                                    <p className={todo.done ? "line_through" : ""}>{todo.task}</p>
                                </div>
                                <div>
                                    <span><BsFillTrashFill className='icon'
                                        onClick={() => handleDelete(todo._id)} /></span>
                                </div>
                            </div>
                        ))
                }
            </div>
        </div>
    );
}

export default Home;




