import './hero.scss';
import { logo, heroPic1, heroPic2 } from '../../assets';
import Navbar from '../Navbar/Navbar';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
//import { Login } from '../Auth';
import { Register, Login }  from '../../features/Auth'
import Unauthorized from '../Unauthorized/Unauthorized';



const Hero = () => {
    
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
        <div className="mainHero">
            <Navbar />
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
        </div>
    )
}

export default Hero