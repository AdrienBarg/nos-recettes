import '../Home/home.scss'
import './dashboard.scss';

import useAuth from '../../hooks/useAuth';

import Navbar from '../../components/Navbar/Navbar';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const Dashboard = () => {

  const auth = useAuth()
  const username = auth.auth.username
  
  const [ content, setContent ] = useState('main')

  useEffect( () => {
    
  }, [])

  return (
    <>
      <Navbar />
      <section className="dashMain">
        <div className="contentWrapper">
          <div className="">
            <h2>Bonjour, {username}  </h2>
            <div>
              <ul>
                <li onClick={() => setContent('main')}>Mes livres</li>
                <li onClick={() => setContent('main')}>Mes favoris</li>
                <li onClick={() => setContent('settings')}>Mon compte</li>
              </ul>
            </div>
          </div>
          {content === 'settings' 
            ?
            <>
              <div>
                Settings
              </div>
            </>
            : 
            <>
              <div>
                <h2> Mes livres</h2>
                <div className="booksWrapper">
                  {}
                </div>
              </div>
              <div>
                <h2> Mes favoris</h2>

              </div>
            </>
          }
        </div>
      </section>
    </>
  )
}

export default Dashboard