import { createContext, useEffect, useState } from "react"
import { getMe } from "../services/auth"
import { set } from "mongoose"

export const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {


    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useState(null)

    useEffect(() => {
        const checkLoggedInUser = async () => {
            const token = localStorage.getItem("token")
            //Om token finns, fråga /me - om den lyckas sätt användaren, om den misslyckas remove användaren(rensa localstorage)
            if (!token) return

            const data = await getMe()

            if (data?.id) {
                setIsLoggedIn(true)
                setUser(data)
                localStorage.setItem("user", JSON.stringify(data))
            } else {
                localStorage.removeItem("token")
                localStorage.removeItem("user")
                setIsLoggedIn(false)
                setUser(null)
            }
        }

        checkLoggedInUser()
    }, [])

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}
