import './hero.scss';
import { logo, heroPic1, heroPic2 } from '../../assets';
import Navbar from '../Navbar/Navbar';
import { useState } from 'react';

const Hero = () => {
    const [content, setContent] = useState('');
    const manageContent = (target) => {
        setContent(target);
    }

    return (
        <div className="mainHero">
            <Navbar />
            <div className="contentWrapper">
                <div className='logoContainer'>
                    <img src={logo} alt="" />
                    <h1>Nos-recettes.fr</h1>
                </div>
                {content === '' && (
                    <div className="cta">
                        <a href="">
                            Rechercher
                        </a>
                        <a href="">
                            Comment ça marche ?
                        </a>
                        <a onClick={() => setContent('login')} href="#">
                            Se connecter
                        </a>
                        <a onClick={() => setContent('register')} href="#">
                            S'inscrire
                        </a>
                    </div>
                )}
                {content === 'login' && (
                    <div className="auth login">
                        <h2>Se connecter</h2>
                        <form action="">
                            <input type="email" placeholder='Adresse email' />
                            <input type="password" placeholder='Mot de passe' />
                            <div>
                                <input className='submit' type="submit" value="Se connecter" />
                            </div>
                        </form>
                    </div>
                )}
                {content === 'register' && (
                    <div className="auth login">
                        <h2>S'inscrire</h2>
                        <form action="">
                            <input type="email" placeholder='Adresse email' />
                            <input type="password" placeholder='Mot de passe' />
                            <input type="password" placeholder='Confirmer le mot de passe' />
                            <div>
                                <input className='submit' type="submit" value="S'inscrire" />
                            </div>
                        </form>
                    </div>
                )}

            </div>
        </div>
    )
}

export default Hero