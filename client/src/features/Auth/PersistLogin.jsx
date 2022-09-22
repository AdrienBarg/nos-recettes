import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../../hooks/useRefreshToken";
import useAuth from "../../hooks/useAuth";

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true)
    const refresh = useRefreshToken()
    const { auth } = useAuth()

    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                await refresh()
            } catch (err) {
                console.log(err)
            } finally {
                setIsLoading(false)
            }
        }

        !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false)

    }, [])

    // -----------
    useEffect(() => {
        console.log(`isloading: ${isLoading}`)
        console.log(`aTok: ${JSON.stringify(auth?.accessToken)}`)
    }, [isLoading])

    return (
        <>
            {isLoading
                ? <p>Loading ...</p>
                : <Outlet />
            }
        </>
    )
};

export default PersistLogin;