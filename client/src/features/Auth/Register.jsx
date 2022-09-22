import './auth.scss'
import { useState, useRef, useEffect, createRef } from 'react'
import { faCheck, faTimes, faInfoCircle, faUser, faLock, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom';
import axios from '../../api/axios';

const Register = () => {
    const REGISTER_URL = '/users'
    const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9]{3,23}$/
    const PWD_REGEX = /^(?=.*[a-z])(?=.*\d)[A-Za-z\d$@$!%*?&_#]{6,24}$/
    const EMAIL_REGEX = /[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/igm

    const [username, setUsername] = useState('')
    const [validUsername, setValidUsername] = useState(false)
    const [usernameFocus, setUsernameFocus] = useState(false)

    const [email, setEmail] = useState('')
    const [validEmail, setValidEmail] = useState(false)
    const [emailFocus, setEmailFocus] = useState(false)

    const [pwd, setPwd] = useState('')
    const [validPwd, setValidPwd] = useState(false)
    const [pwdFocus, setPwdFocus] = useState(false)

    const [matchPwd, setMatchPwd] = useState('')
    const [validMatchPwd, setValidMatchPwd] = useState(false)
    const [matchPwdFocus, setMatchPwdFocus] = useState(false)

    const [errMsg, setErrMsg] = useState('')
    const [success, setSuccess] = useState(false)


    useEffect(() => {
        setValidUsername(USER_REGEX.test(username))
    }, [username])

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email))
    }, [email])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd))
        const match = pwd === matchPwd
        setValidMatchPwd(match)
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('')
    }, [username, pwd, matchPwd])

    const checkUsername = () => {
        setUsernameFocus(false)
        //checkDuplicateUsername() // TODO
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Double check that all fields are valid
        const verifyUsername = USER_REGEX.test(username);
        const verifyEmail = EMAIL_REGEX.test(email);
        const verifyPwd = PWD_REGEX.test(pwd);
        if ( !verifyUsername || !verifyEmail || !verifyPwd ) { 
            setErrMsg('Veuillez valider tous les champs.');
            return;
        }

        try {
            const response = await axios.post(
                REGISTER_URL,
                JSON.stringify({ username, email, password: pwd }),
                {
                    headers: { 'Content-Type' : 'application/json' },
                    withCredentials: true  
                }
            );
            console.log(response.data);
            setSuccess(true);
            // Clear input fields ?
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg(err.response.data.message || 'Ce compte existe déjà.')
                err?.response?.data?.message.includes('pseudo')
                    ? setValidUsername(false)
                    : setValidEmail(false)
            } else {
                setErrMsg('Une erreur est survenue lors de l\'inscription')
            }
        }
    };

    
    
  return (
    <section className='authWrapper'>
        {success ? (
            <div className='welcome'>
                <h2>Bienvenue <span>{username || 'Jean'}</span> !</h2>
                <p>Votre compte a bien été créé !</p>
                <Link to="/home/login">Se connecter</Link>
            </div>
        ) : (
            <>
            <h2>S'inscrire</h2>
            {/*<p>{errMsg}</p>*/}
            <form onSubmit={handleSubmit}>
                {/* Username field */}
                <label htmlFor="username" >
                    
                    {username && validUsername 
                        ? <>
                            <span className="success">
                                <br/>
                                <FontAwesomeIcon icon={faCheck} />
                            </span>
                            Pseudo : 
                          </>
                        : <p className={username && !validUsername ? "visible" : "hidden" } >
                            Minimum 4 caractères.<br/>
                            Lettres et chiffres uniquement.
                          </p>
                    }
                    
                </label>
                <div>
                    <FontAwesomeIcon icon={faUser} className="icon"/>
                    <input className={username ? (validUsername ? 'success' : 'danger') : ''}
                        type="text" 
                        id="username"
                        placeholder="Pseudo"
                        autoComplete="off"
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        onFocus={() => setUsernameFocus(true)}
                        onBlur={() => checkUsername()}
                    />
                </div>
    
                {/* Email field */}
                <label htmlFor="email" className={email !== '' ? "visible" : "hidden" }>
                    {email && validEmail
                        ? <>
                            <span className="success">
                                <FontAwesomeIcon icon={faCheck} />
                            </span>
                            Adresse email :
                          </>
                        : <p className={email && !validEmail ? "visible" : "hidden" } >
                        Veuillez saisir une adresse email valide.
                        </p>
                    }
                    
                </label>
                <div>
                    <FontAwesomeIcon icon={faEnvelope} className="icon"/>
                    <input 
                        className={email ? (validEmail ? 'success' : 'danger') : ''}
                        type="email" 
                        id="email"
                        placeholder="Adresse email"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        onFocus={() => setEmailFocus(true)}
                        onBlur={() => setEmailFocus(false)}
                    />
                </div>
    
                {/* Password field */}
                <label htmlFor="pwd" className={pwd !== '' ? "visible" : "hidden" }>
                    {pwd && validPwd
                        ? <>
                            <br/>
                            <span className="success">
                                <FontAwesomeIcon icon={faCheck} />
                            </span>
                            Mot de passe :
                          </>
                        : <><p className={pwd && !validPwd ? "visible" : "hidden" } >
                            Minimum 6 caractères.
                          </p>
                          <p>Au moins une lettre et un chiffre.</p></>
                    }
                    
                </label>
                <div>
                    <FontAwesomeIcon icon={faLock} className="icon"/>
                    <input 
                        className={pwd ? (validPwd ? 'success' : 'danger') : ''}
                        type="password" 
                        id="pwd"
                        placeholder="Mot de passe"
                        onChange={(e) => setPwd(e.target.value)}
                        required
                        onFocus={() => setPwdFocus(true)}
                        onBlur={() => setPwdFocus(false)}
                    />
                </div>
    
                {/* Confirm Password field */}
                <label htmlFor="matchPwd" className={matchPwd !== '' ? "visible" : "hidden" }>
                    {matchPwd && validMatchPwd
                        ? <>
                            <span className="success">
                                <FontAwesomeIcon icon={faCheck} />
                            </span>
                            Confirmer le mot de passe :
                          </>
                        : <p className={matchPwd && !validMatchPwd ? "visible" : "hidden" } >
                            Les mots de passe ne correspondent pas.
                          </p>  
                    }
                    
                </label>
                <div>
                    <FontAwesomeIcon icon={faLock} className="icon" />
                    <input
                        className={matchPwd ? (validMatchPwd ? 'success' : 'danger') : ''} 
                        type="password" 
                        id="matchPwd"
                        placeholder="Confirmer le mot de passe"
                        onChange={(e) => setMatchPwd(e.target.value)}
                        required
                        onFocus={() => setMatchPwdFocus(true)}
                        onBlur={() => setMatchPwdFocus(false)}
                    />
                </div>
            
                {/* Submit button */}
                <div>
                    <input 
                        disabled={!validUsername || !validEmail || !validPwd || !validMatchPwd ? 'disabled' : ''} 
                        className='submit' 
                        type="submit" 
                        value="S'inscrire" />
                </div>
                {errMsg !== '' &&
                    <span className="danger">
                        {errMsg}
                    </span>
                }
            </form>
            <span>Vous avez déjà un compte ?</span>
            <Link to="/home/login">Connectez-vous ici</Link>
            </>
        )}
    </section>
  )
}

export default Register