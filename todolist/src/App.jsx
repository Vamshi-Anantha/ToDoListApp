import { useState } from 'react'
import './App.css'
import Home from './Home'
import Login from './Login'

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (user) => {
    setUser(user);
  }

  const handleLogout = () => {
    setUser(null);
  }

  return (
    <div className="app-container">
      {user ? (
        <Home user={user} onLogout={handleLogout} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  )
}

export default App
