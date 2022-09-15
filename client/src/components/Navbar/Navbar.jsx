import './navbar.scss';
import {Link} from "react-router-dom"
import { mainMenu } from "../../constants"
import logoChef from '../../assets/logoChef.svg'


const Navbar = () => (
    <nav className="mainNav">
        <div className="logoWrapper">
            <Link to = "/" >
                <img src={logoChef} alt="logo" />
                <h1>Nos-recettes.fr</h1>
            </Link>
        </div>
        <div className="mainMenu">
            <ul className="">
                <Link to = "/search" >
                    <li>
                        Rechercher
                    </li>
                </Link>
                <Link to = "/ccm" >
                    <li>
                        Comment ça marche ?
                    </li>
                </Link>
                <Link to = "/home/login">
                    <li className='auth'>
                        Se connecter
                    </li>
                </Link>
                <Link to = "/home/register">
                    <li className='auth'>
                        S'inscrire
                    </li>
                </Link>
            </ul>
        </div>
    </nav>
  )


export default Navbar