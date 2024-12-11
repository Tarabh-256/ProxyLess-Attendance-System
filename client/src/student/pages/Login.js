import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';
import '../../styles/styles.css'

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // const login=()=>{
  //   localStorage.setItem('login', true)
  //   navigate('/dashboard')

  // }
  // useEffect(()=>{
  //   let login = localStorage.getItem('login');
  //   if(login){
  //     navigate('/dashboard')
  //   }
  // })

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/login', { email, password });
      localStorage.setItem('SECRET_KEY', res.data.token);
      alert('Login successful');
      navigate('/dashboard');
      
    } catch (error) {
      if (error.response && error.response.data.error) {
        setError(error.response.data.error);
      } else {
        setError('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <form className='login_form' onSubmit={handleSubmit}>
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
}
export default Login;

