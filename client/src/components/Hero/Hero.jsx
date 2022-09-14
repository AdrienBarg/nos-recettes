import './hero.scss';
import { logo, heroPic1, heroPic2 } from '../../assets';
import Navbar from '../Navbar/Navbar';

const Hero = () => {
    return (
        <div className="mainHero">
            <Navbar />
            <div className="contentWrapper">
                { /*
                <div className="imgWrapper">
                    <div className="imgContainer">
                        <img src={heroPic2} alt="" />
                    </div>
                    <div className="imgContainer">
                        <img src={heroPic1} alt="" />
                    </div>
                </div>
                */}
                {/*<div className="carte">
                    <div className="leftContainer">
                        <div>
                            <img src={logo} alt="" />
                            <h1>Nos-recettes.fr</h1>
                        </div>
                    </div>
                    <div className="rightContainer">
                        <div>
                            <h2>
                                Bon appetit !
                            </h2>
                            <div>
                                <p>Se connecter</p>
                                <p>Rechercher ...</p>
                                <p>Comment ça marche ?</p>
                            </div>
                        </div>
                    </div>
                </div>*/}
                <div className='logoContainer'>
                    <img src={logo} alt="" />
                    <h1>Nos-recettes.fr</h1>
                </div>
                <div className="cta">
                    <a href="">
                        Rechercher
                    </a>
                    <a href="">
                        Comment ça marche ?
                    </a>
                    <a href="">
                        Se connecter
                    </a>
                    <a href="">
                        S'inscrire
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Hero