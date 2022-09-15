import { useState } from "react";
import { Link } from "react-router-dom"


const Register = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = async (event) => {
        event.preventDefault();
        const response = await fetch('http://localhost:1337/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            email, 
            password
          }),
        });
    
        const data = await response.json();
        console.log(data);
      }

    return (
        <div className="authWrapper">
            <h2>S'inscrire</h2>
            <form onSubmit={handleRegister}>
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    placeholder='Pseudo'
                    required
                />
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder='Adresse email'
                    required
                />
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder='Mot de passe'
                    required
                />
                <input
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    type="password"
                    placeholder='Confirmer le mot de passe'
                    required
                />
                <div>
                    <input className='submit' type="submit" value="S'inscrire" />
                </div>
            </form>
            <p>Vous avez déjà un compte ?</p>
            <Link to="/home/login">Connectez-vous ici</Link>
        </div>
    )
}

export default Register