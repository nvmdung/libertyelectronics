
import { Link, Navigate } from 'react-router-dom';
import '../css/Login.css';
import { useState } from "react";

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();

        const storedUser = JSON.parse(localStorage.getItem('registeredUser'));
        if (storedUser && username === storedUser.username && password === storedUser.password) {
            setError(<Navigate to="/"/>);          
        } else {
            setError('Wrong UserName or Password');
        }
    };

    return (
        <div className='logindev'>
            <div className="login-container">
                <form onSubmit={handleLogin}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit">Login</button>
                    {error && <p>{error}</p>}
                </form>
                <div>Dont have account? <Link to="/register">Register</Link></div>
            </div>
        </div>
    );
}

export default Login;