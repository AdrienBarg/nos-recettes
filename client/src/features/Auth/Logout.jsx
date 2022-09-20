import { useEffect } from "react";
import axios from "../../api/axios";
import useAuth from '../../hooks/useAuth';
import { useNavigate } from "react-router-dom";

const Logout = () => {

    const { setAuth } = useAuth()
    const navigate = useNavigate()
    const LOGOUT_URL = '/auth/logout'

    const logout = async () => {
        try {
            const response = await axios.post(
                LOGOUT_URL
            )
            setAuth(null)
            console.log('logged out ??')
            navigate('/')
        } catch (err) {
            console.log(err)
        }
    }

    useEffect( () => {
        logout();
    }, [])

    return (
        <div>Logout</div>
    )
}

export default Logout