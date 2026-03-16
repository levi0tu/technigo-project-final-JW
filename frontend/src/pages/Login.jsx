import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { Layout } from "../components/Layout"
import { AuthContext } from "../context/AuthContext"


export const Login = () => {
    const { setIsLoggedIn } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleLogin = () => {
        setIsLoggedIn(true)
        navigate("/dashboard")
    }

    return (
        <Layout>
            <h2>Login</h2>
            <button onClick={handleLogin}>Login</button>
        </Layout>
    )
}