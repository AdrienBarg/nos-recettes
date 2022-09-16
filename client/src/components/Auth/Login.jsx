import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    const response = await fetch('http://localhost:1337/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email, 
        password
      }),
    });

    const data = await response.json();

    if (data.user) {
      alert('Login successful');
      window.location.href = '/dashboard';
    } else {
      alert('Please check your username and password');
    }
    
    console.log(data);
  }



  return (
    <div className="authWrapper">
      <h2>Se connecter</h2>
      <form onSubmit={handleLogin}>
        <input
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
            type="email" 
            placeholder='Adresse email' 
            required 
        />
        <input 
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
            type="password" 
            placeholder='Mot de passe' 
            required 
        />
        <div>
          <input className='submit' type="submit" value="Se connecter" />
        </div>
      </form>
      <p>Vous n'avez pas encore de compte ?</p>
      <Link to="/home/register">Inscrivez vous ici</Link>
    </div>
  )
}

export default Login