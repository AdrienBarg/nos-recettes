import './unauthorized.scss';

import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Unauthorized = () => {

    const navigate = useNavigate()
    const goBack = () => navigate(-1)

    const auth = useAuth()
    console.log('auth :')
    console.log(auth)

  return (
    <section className='authWrapper unauthorized'>
        <h2>Accès non autorisé.</h2>
        <br />
        <p>Vous n'avez pas l'autorisation d'accéder à cette page.</p>
        <div className="">
            <button onClick={goBack} >Retour</button>
        </div>
    </section>
  )
};

export default Unauthorized;