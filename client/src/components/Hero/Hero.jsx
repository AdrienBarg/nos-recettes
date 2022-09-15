import './hero.scss';
import { logo, heroPic1, heroPic2 } from '../../assets';
import Navbar from '../Navbar/Navbar';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';


const Hero = () => {
    
    const [context, setContext] = useState('');

    let {modale} = useParams();
   
    useEffect( () => {
        if ( modale === 'login') {
            setContext('login');
        } else if ( modale === 'register' ) {
            setContext('register')
        } else {
            setContext('')
        }
    }, [modale])

    return (
        <div className="mainHero">
            <Navbar />
            <div className="contentWrapper">
                <div className='logoContainer'>
                    <img src={logo} alt="" />
                    <h1>Nos-recettes.fr</h1>
                </div>
                <div>
                    {context === 'login' ? (
                        <div className="auth">
                            <h2>Se connecter</h2>
                            <form action="">
                                <input type="email" placeholder='Adresse email' required />
                                <input type="password" placeholder='Mot de passe' required />
                                <div>
                                    <input className='submit' type="submit" value="Se connecter" />
                                </div>
                            </form>
                            <p>Vous n'avez pas encore de compte ?</p>
                            <Link to="/home/register">Inscrivez vous ici</Link>

                        </div>
                    ) : context === 'register' ? (
                        <div className="auth">
                            <h2>S'inscrire</h2>
                            <form action="">
                                <input type="email" placeholder='Adresse email' required />
                                <input type="password" placeholder='Mot de passe' required />
                                <input type="password" placeholder='Confirmer le mot de passe' required />
                                <div>
                                    <input className='submit' type="submit" value="S'inscrire" />
                                </div>
                            </form>
                            <p>Vous avez déjà un compte ?</p>
                            <Link to="/home/login">Connectez-vous ici</Link>
                        </div>
                    ) : (
                        <div className="cta">
                            <a href="">
                                Rechercher
                            </a>
                            <a href="">
                                Comment ça marche ?
                            </a>
                            <Link to="/home/login" >
                                Se connecter
                            </Link>
                            <Link to="/home/register" >
                                S'inscrire
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Hero