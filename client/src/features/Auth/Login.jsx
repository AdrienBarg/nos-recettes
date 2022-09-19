import { useState, useRef, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/AuthProvider';
import axios from '../../api/axios';
const LOGIN_URL ='/auth';

import { faLock, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Login = () => {
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();
  
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [success, setSuccess] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({email, password: pwd}),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );
      console.log(JSON.stringify(respose?.data));
      console.log(JSON.stringify(respose));
      const accessToken = response?.data?.accessToken;
      const user = response?.data?.user;
      //const roles = response?.data?.roles;
      //setAuth({ user, email, pwd, roles, accessToken })
      setAuth({ user, email, pwd, accessToken });
      setEmail('');
      setPwd('');
      setSuccess(true);

    } catch (err) {
      if(!err?.response) {
        setErrMsg('Le serveur ne répond pas.');
      } else if (err.response?.status === 400) {
        setErrMsg('Adresse email ou mot de passe invalide.')
      } else if (err.response?.status === 401) {
        setErrMsg('Non autorisé.');
      } else {
        setErrMsg('Login Failed');
      }
      errRef.current.focus();
    }

  };


  useEffect(() => {
    userRef.current.focus();
  }, []);

  return (
    <section className="authWrapper login">
      <h2>Se connecter</h2>
      <form onSubmit={handleLogin}>
        <div>
          <FontAwesomeIcon icon={faEnvelope} className="icon"/>
          <input
              value={email}
              ref={userRef}
              onChange={(e) => setEmail(e.target.value)} 
              type="email" 
              placeholder='Adresse email' 
              required 
          />
        </div>
        <div>
          <FontAwesomeIcon icon={faLock} className="icon"/>
          <input 
              value={pwd}
              onChange={(e) => setPwd(e.target.value)} 
              type="password" 
              placeholder='Mot de passe' 
              required 
          />
        </div>
        <div>
          <input className='submit' type="submit" value="Se connecter" />
        </div>
      </form>
      <span>Vous n'avez pas encore de compte ?</span>
      <Link to="/home/register">Inscrivez vous ici</Link>
    </section>
  )
}

export default Login