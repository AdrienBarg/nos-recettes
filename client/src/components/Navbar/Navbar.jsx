import './navbar.scss';
import { mainMenu } from "../../constants"


const Navbar = () => (
    <nav className="mainNav">
        <div className="">
            <img src="" alt="logo" />
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
            </ul>
        </div>
    </nav>
  )


export default Navbar