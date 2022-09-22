import './home.scss';

import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { logo } from '../../assets';
import { Register, Login }  from '../../features/Auth';
import Navbar from '../../components/Navbar/Navbar';
import Unauthorized from '../../components/Unauthorized/Unauthorized';
import useRefreshToken from '../../hooks/useRefreshToken';

const Home = () => {
  const refresh = useRefreshToken()
  const [context, setContext] = useState('');

    let {modale} = useParams();
   
    useEffect( () => {
        if ( modale === 'login') {
            setContext('login');
        } else if ( modale === 'register' ) {
            setContext('register')
        } else if ( modale === 'unauthorized' ) {
            setContext('unauthorized')
        } else {
            setContext('')
        }
    }, [modale])

  return (
    <>
      <Navbar />
      <section className="homeMain">
        <div className="contentWrapper">
          <div>
            {context === 'login' ? (
              <Login />
            ) : context === 'register' ? (
              <Register />
            ) : context === 'unauthorized' ? (
              <Unauthorized />
            ) : (
              <div className='logoContainer'>
                <img src={logo} alt="" />
                <h1>Nos-recettes.fr</h1>
                <button onClick={() => refresh()} >
                  Refresh
                </button>
              </div>
            )}
          </div>
          <div className="cta">
            <Link to="/search" >
              Rechercher
            </Link>
            <Link to="/ccm" >
              Comment ça marche ?
            </Link>
            <Link to="/home/login" className='auth'>
              Se connecter
            </Link>
            <Link to="/home/register" className='auth'>
              S'inscrire
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home