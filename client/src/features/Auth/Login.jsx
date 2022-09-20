import './auth.scss';
import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import axios from '../../api/axios';

const LOGIN_URL ='/auth';

import { faLock, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Login = () => {
  const { setAuth } = useAuth()

  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'

  const userRef = useRef()
  const errRef = useRef()
  
  const [email, setEmail] = useState('')
  const [pwd, setPwd] = useState('')
  const [errMsg, setErrMsg] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    setErrMsg('')

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({email, password: pwd}),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );
      const accessToken = response?.data?.accessToken;
      const username = response?.data?.username;
      console.log(response.data)
      //const roles = response?.data?.roles;
      //setAuth({ user, email, pwd, roles, accessToken })
      setAuth({ username, email, pwd, accessToken });
      setEmail('');
      setPwd('');
      console.log(from)
      navigate(from, {replace: true})

    } catch (err) {
      if(err && !err?.response) {
        setErrMsg('Le serveur ne répond pas.');
      } else if (err.response?.status === 400) {
        setErrMsg('Adresse email ou mot de passe invalide.')
      } else if (err.response?.status === 401) {
        setErrMsg(err.response.data.message);
        console.log(err.response.data.message)
      } else {
        setErrMsg('Login Failed');
      }
    }

  };

  // set focus to email  field
  useEffect(() => {
    userRef.current.focus();
  }, []);

  return (
    <section className="authWrapper login">
        <h2>Se connecter</h2>
        <form onSubmit={handleLogin}>
          <label htmlFor="email" className={email !== '' ? "visible" : "hidden" }>
            Adresse email :
          </label>
          <div>
            <FontAwesomeIcon icon={faEnvelope} className="icon"/>
            <input
                type="email"
                id="email" 
                placeholder='Adresse email'
                value={email}
                ref={userRef}
                onChange={(e) => setEmail(e.target.value)} 
                autoComplete='on' 
                required 
            />
          </div>
          <label htmlFor="password" className={pwd !== '' ? "visible" : "hidden" }>
            Mot de passe :
          </label>
          <div>
            <FontAwesomeIcon icon={faLock} className="icon"/>
            <input 
                id="password"
                type="password" 
                placeholder='Mot de passe' 
                required 
                value={pwd}
                onChange={(e) => setPwd(e.target.value)} 
            />
          </div>
          <div>
            <input className='submit' type="submit" value="Se connecter" />
          </div>
          <span className='errMsg'>{errMsg}</span>
        </form>
        <span>Vous n'avez pas encore de compte ?</span>
        <Link to="/home/register">Inscrivez vous ici</Link> 
    </section>
  )
}

export default Login