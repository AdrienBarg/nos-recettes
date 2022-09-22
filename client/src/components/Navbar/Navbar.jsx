import './navbar.scss';
import {Link} from "react-router-dom"
import logoChef from '../../assets/logoChef.svg'
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import useAuth from "../../hooks/useAuth";
import useLogout from '../../hooks/useLogout';

const Navbar = () =>  {

    const { auth } = useAuth()
    let user = auth
    console.log(user)
    const logout = useLogout()
    
    const signOut = async () => {
        await logout()
    }

    return (
        <nav className="navMain">
            <div className="navWrapper">

            
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
                    {user?.id 
                    ? <>
                        <Link to = "/dashboard">
                            <li className="auth">
                                Ma cuisine
                            </li>
                        </Link>
                        <Link to ="/">
                            <li className="logout" onClick={signOut}>
                                <FontAwesomeIcon icon={faRightFromBracket} />
                            </li>
                        </Link>
                      </>
                    : <>
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
                      </>
                    }
                </ul>
            </div>
            </div>
        </nav>
    )
}

export default Navbar