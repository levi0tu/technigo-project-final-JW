import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"


export const Login = () => {
    const { setIsLoggedIn } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleLogin = () => {
        setIsLoggedIn(true)
        navigate("/dashboard")
    }

    return (
        <div>
            <h2>Login</h2>
            <button onClick={handleLogin}>Login</button>
        </div>
    )
}