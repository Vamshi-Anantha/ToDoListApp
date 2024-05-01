import React, { useState } from "react";
import axios from 'axios';

function Create({ onAdd, user }) {
    const [task, setTask] = useState("");

    const handleAdd = () => {
        if (!task.trim()) {
            alert("Please enter a valid task.");
            return;
        }

        // Check if the task already exists for the current user
        axios.get(`http://localhost:3001/get/${user._id}`)
            .then(result => {
                const existingTasks = result.data;
                const taskExists = existingTasks.some(existingTask => existingTask.task === task.trim());

                if (taskExists) {
                    alert("Task already exists.");
                } else {
                    axios.post(`http://localhost:3001/add/${user._id}`, { task: task.trim() })
                        .then(result => {
                            onAdd({ task: result.data.task, done: result.data.done });
                            setTask("");
                        })
                        .catch(err => console.log(err));
                }
            })
            .catch(err => console.log(err));
    }

    return (
        <div className='create_form'>
            <input type="text" placeholder='Enter Task' value={task} onChange={(e) => setTask(e.target.value)} />
            <button type="button" onClick={handleAdd}>Add</button>
        </div>
    )
}

export default Create;
