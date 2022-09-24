import '../Home/home.scss'
import './dashboard.scss';
import { logoPlus } from '../../assets';

import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import useAuth from '../../hooks/useAuth';

import { useState, useEffect } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

import Navbar from '../../components/Navbar/Navbar';
import Card from '../../components/Card/Card';
import { Bookmarks } from '../../components/Dashboard';


const Dashboard = () => {

  const axiosPrivate = useAxiosPrivate()

  const { auth } = useAuth()
  const username = auth.username
  const userID = auth.id

  const [content, setContent] = useState('myBooks')
  const [myBooks, setMyBooks] = useState([])
  const [myRecipes, setMyRecipes] = useState([])
  const [bookmarks, setBookmarks] = useState([])

  useEffect( () => {
    let isMounted = true
    const controller = new AbortController()

    const getMyCollection = async () => {
      try {
        const response = await axiosPrivate.get(
          '/dashboard/',
          {signal: controller.signal,
            params: {
              id: userID
            }
          }
        )
        const books = response.data.collection?.books
        const recipes = response.data.collection?.recipes
        if(isMounted) {
          setMyBooks(books)
          setMyRecipes(recipes)
        }
      } catch (err) {
        console.log(err)
      }
      return () => {
        isMounted = false
        controller.abort()
      };
    };
    getMyCollection()
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
                <div className="booksContainer">

                  <div className="bookWrapper create">
                    <div className="picture">
                      <img src={logoPlus} alt="" />
                    </div>
                    <p>Créer un nouveau livre</p>
                  </div>

                  {myBooks.map((book, index) => (
                    <Card item={book} index={index} key={index} />
                  ))}

                </div>
              </article>
            }
            {content === "bookmarks" &&
              <Bookmarks />
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