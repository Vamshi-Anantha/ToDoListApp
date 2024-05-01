import React, { useState } from "react";
import axios from 'axios'

function Login({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        axios.post('http://localhost:3001/login', { username, password })
            .then(response => {
                onLogin(response.data.user);
            })
            .catch(error => {
                console.log(error);
                alert("Invalid credentials");
            });
    };

    return (
        <div className='login-container'>
            <h1>Login</h1>
            <div className='login-form'>
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button onClick={handleLogin}>Login</button>
            </div>
        </div>
    );
}

export default Login;
