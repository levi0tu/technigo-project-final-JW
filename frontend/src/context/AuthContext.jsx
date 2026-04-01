import { createContext, useEffect, useState } from "react"
import { getMe } from "../services/auth"
import { set } from "mongoose"

export const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {


    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useState(null)

    // When the app loads, check if a token is stored
    // and fetch the logged-in user from backend
    useEffect(() => {
        const checkLoggedInUser = async () => {
            const token = localStorage.getItem("token")

            if (!token) return

            const data = await getMe()

            if (data?.id) {
                // If the token is valid, store the user in context and localstorage
                // if it fails the user is cleared from localstorage.
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
