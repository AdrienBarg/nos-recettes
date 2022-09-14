import './navbar.scss';
import { mainMenu } from "../../constants"
import logoChef from '../../assets/logoChef.svg'


const Navbar = () => (
    <nav className="mainNav">
        <div className="logoWrapper">
            <img src={logoChef} alt="logo" />
            <h1>Nos-recettes.fr</h1>
        </div>
        <div className="mainMenu">
            <ul className="">
                {
                    mainMenu.map((nav, index) => (
                        <li key={nav.id} className="">
                            <a href="">{nav.title}</a>
                        </li>
                    ))
                }
                <li className='login'>
                    <a href="">Se connecter</a>
                </li>
            </ul>
        </div>
    </nav>
  )


export default Navbar