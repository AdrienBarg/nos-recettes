import { useState, useRef, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
  }


  useEffect(() => {
    userRef.current.focus();
  }, [])

  return (
    <section className="authWrapper">
      <h2>Se connecter</h2>
      <form onSubmit={handleLogin}>
        <input
            value={email}
            ref={userRef}
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
    </section>
  )
}

export default Login