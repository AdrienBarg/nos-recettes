import { useState, useRef, useEffect } from 'react'
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom';

const Register = () => {

    const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/
    const PWD_REGEX = /^(?=.*[a-z])(?=.*\d)[A-Za-z\d$@$!%*?&_#]{6,24}$/
    const EMAIL_REGEX = /[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/

    const userRef = useRef()
    const errRef = useRef()

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
    const [succes, setSuccess] = useState(false)

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        // setValidName(USER_REGEX.test(user))
        const result = USER_REGEX.test(username)
        console.log(result)
        console.log(username)
        setValidUsername(result)
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
        checkDuplicateUsername() // TODO
    }

  return (
    <div className='authWrapper'>
        <h2>S'inscrire</h2>
        <p ref={errMsg} >{errMsg}</p>
        <form>
            <label htmlFor="username" className={username !== '' ? "visible" : "hidden" }>
                <span className={validUsername ? "valid" : "hidden"}>
                    <FontAwesomeIcon icon={faCheck} />
                </span>
                <span className={validUsername || !username ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
                </span>
                Pseudo : 
            </label>
            <input 
                type="text" 
                id="username"
                
                autoComplete="off"
                onChange={(e) => setUsername(e.target.value)}
                required
                onFocus={() => setUsernameFocus(true)}
                onBlur={() => checkUsername()}
            />
            <p className={usernameFocus && username && !validUsername ? "visible" : "hidden" } >
                Minimum 4 caractères.
                Lettres et chiffres uniquement.
            </p>

    {/* Email field */}
            <label htmlFor="email" className={email !== '' ? "visible" : "hidden" }>
                <span className={validEmail ? "valid" : "hidden"}>
                    <FontAwesomeIcon icon={faCheck} />
                </span>
                <span className={validEmail || !email ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
                </span>
                Adresse email : 
            </label>
            <input 
                type="text" 
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                required
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
            />
            <p className={emailFocus && email && !validEmail ? "visible" : "hidden" } >
                Minimum 6 caractères.
            </p>

    {/* Password field */}
            <label htmlFor="pwd" className={pwd !== '' ? "visible" : "hidden" }>
                <span className={validPwd ? "valid" : "hidden"}>
                    <FontAwesomeIcon icon={faCheck} />
                </span>
                <span className={validPwd || !pwd ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
                </span>
                Mot de passe : 
            </label>
            <input 
                type="text" 
                id="pwd"
                onChange={(e) => setPwd(e.target.value)}
                required
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
            />
            <p className={pwdFocus && pwd && !validPwd ? "visible" : "hidden" } >
                Minimum 6 caractères.
            </p>

    {/* Confirm Password field */}
            <label htmlFor="matchPwd" className={matchPwd !== '' ? "visible" : "hidden" }>
                <span className={validMatchPwd ? "valid" : "hidden"}>
                    <FontAwesomeIcon icon={faCheck} />
                </span>
                <span className={validMatchPwd || !matchPwd ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
                </span>
                Confirmer le mot de passe : 
            </label>
            <input 
                type="text" 
                id="matchPwd"
                onChange={(e) => setMatchPwd(e.target.value)}
                required
                onFocus={() => setMatchPwdFocus(true)}
                onBlur={() => setMatchPwdFocus(false)}
            />
            <p className={matchPwdFocus && matchPwd && !validMatchPwd ? "visible" : "hidden" } >
                Les mots de passe ne correspondent pas.
            </p>            
            
            <div>
                <input className={ validUsername && validEmail && validPwd && validMatchPwd ? 'submit' : 'submit notallowed' } type="submit" value="S'inscrire" />
            </div>
        </form>
        <p>Vous avez déjà un compte ?</p>
        <Link to="/home/login">Connectez-vous ici</Link>
    </div>
  )
}

export default Register