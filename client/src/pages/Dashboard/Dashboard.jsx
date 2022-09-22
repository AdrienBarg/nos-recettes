import '../Home/home.scss'
import './dashboard.scss';
import { logoPlus } from '../../assets';

import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import useAuth from '../../hooks/useAuth';

import { useState, useEffect } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

import Navbar from '../../components/Navbar/Navbar';


const Dashboard = () => {

  const axiosPrivate = useAxiosPrivate()

  const auth = useAuth()
  const username = auth.auth.username
  const author = auth.auth.id

  const [content, setContent] = useState('myBooks')
  const [myBooks, setMyBooks] = useState([])
  const [myRecipes, setMyRecipes] = useState([])


  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()

    const getMyBooks = async () => {
      try {
        const response = await axiosPrivate.get(
          '/books/myBooks',
           {signal: controller.signal,
            params: { 
              id: author
            }
          }
        )
        isMounted && setMyBooks(response.data)
      } catch (err) {
        console.log(err)
        // navigate back to here after login - TODO
      }
      /*const books = await axiosPrivate.get(
        '/books/myBooks',
        {
          params: {
            id: author
          }
        }
      )
      setMyBooks(books.data)*/
    }
    getMyBooks()
    return () => {
      isMounted = false
      controller.abort()
    };
    
    /*const getMyRecipes = async () => {
      const recipes = await axios.get(
        '/recipes/myRecipes',
        {
          params: {
            id: author
          }
        }
      )
      setMyRecipes(recipes.data)
    }
    getMyRecipes()

    const getBookmarks = async () => {
      
    }*/
  }, [])


  const dashNavClick = (e, active) => {
    const divAnimation = document.getElementById('animation')
    divAnimation.className = 'start-' + active
    setContent(active)
  }

  return (
    <>
      <Navbar />
      <section className="dashMain">
        <div className="contentWrapper">
          <div className="dashHeader">
            <div>
              <h2>Bonjour, {username}  </h2>
              <p>Vous trouverez ici vos livres et recettes, vos favoris, et les paramètres de votre compte</p>
            </div>

            <div className="nav">
              <a onClick={(e) => dashNavClick(e, 'myBooks')}>Mes livres</a>
              <a onClick={(e) => dashNavClick(e, 'myRecipes')}>Mes recettes</a>
              <a onClick={(e) => dashNavClick(e, 'bookmarks')}>Mes favoris</a>
              <a onClick={(e) => dashNavClick(e, 'settings')}>Mes paramètres</a>
              <div id="animation" className="start-myBooks"></div>
            </div>

          </div>
          <div className="dashBody">
            {content === 'myBooks' &&
              <article>
                <div>
                  <h2> Mes livres</h2>
                </div>
                <div className="booksContainer">

                  <div className="bookWrapper">
                    <div className="picture">
                      <img src={logoPlus} alt="" />
                    </div>
                    <p>Créer un nouveau livre</p>
                  </div>
                  {myBooks.map((book, index) => (
                    <div className="bookWrapper" key={index}>
                      <div className='picture'>

                      </div>
                      <p>{book.title} </p>
                    </div>
                  ))}
                </div>
              </article>
            }
            {content === "bookmarks" &&
              <article>
                <h2> Mes favoris</h2>
                <div className='bookWrapper'>
                  hello
                </div>
              </article>
            }
            {content === 'settings' &&
              <>
                <div>
                  Settings
                </div>
              </>
            }
          </div>
        </div>
      </section>
    </>
  )
}

export default Dashboard