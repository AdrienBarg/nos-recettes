import './unauthorized.scss';

import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {

    const navigate = useNavigate()
    const goBack = () => navigate(-1)

  return (
    <section>
        <h1>Accès non autorisé.</h1>
        <br />
        <p>Vous n'avez pas l'autorisation d'accéder à cette page.</p>
        <div className="">
            <button onClick={goBack} >Retour</button>
        </div>
    </section>
  )
};

export default Unauthorized;